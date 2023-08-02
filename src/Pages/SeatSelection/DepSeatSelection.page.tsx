import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import Title from "../../Components/Utility/Title";
import FlightData from "../../Components/SeatSelection/FlightData.component";
import { Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { BookedSeat, Flighclass, SearchType, Traveller } from "../../Types";

import SeatMap from "../../Components/SeatSelection/SeatLayout.component";
import Legend from "../../Components/SeatSelection/Legend";
import { trackingActions } from "../../Actions/Tracking.actions";
import { BookingActions } from "../../Actions/ConfirmBookingDetails.action";
import LostData from "../../Components/Errors/LostData";
const getBookedSeat = (bclass: number, bookedSeat: BookedSeat | undefined) => {
  switch (bclass) {
    case Flighclass.Business:
      return bookedSeat?.BC ?? [];

    case Flighclass.Economy:
      return bookedSeat?.EC ?? [];

    case Flighclass.FirstClass:
      return bookedSeat?.FC ?? [];

    case Flighclass.PremiumEconomy:
      return bookedSeat?.PE ?? [];
  }
};

export default function DepSeatSelectionPage() {
  const flight = useSelector((state: RootState) => state.BookingFlight);
  const bookingParams = useSelector((state: RootState) => state.BookingDetails);
  const travellingParams = useSelector((state: RootState) => state.SearchParms);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!flight.dep) {
      setTimeout(() => {
        navigate("/flight");
      }, 1000);
    }
  }, []);

  const seatMap = flight.dep?.airbus_id.seat_map.find(
    (s) => s.class_type == travellingParams.class
  );

  const bookedSeat = flight.dep?.booked_seats.find(
    (s) =>
      new Date(s.date).toDateString() ==
      new Date(travellingParams.dept_date).toDateString()
  );

  let sendBooked: Array<string> =
    getBookedSeat(travellingParams.class, bookedSeat) ?? [];

  const handleCallBack = (value: Array<Traveller>) => {
    if (flight.rtn) {
      dispatch(trackingActions.activeRtnSeat());
      dispatch(BookingActions.updatePeople(value));
      navigate(
        `/flight/rtn_seat_selection/?rtn_flight_no=${flight.rtn?.flight_no}`
      );
    } else {
      dispatch(BookingActions.updatePeople(value));
      dispatch(trackingActions.activePayment());
      navigate("/flight/payment");
      console.log("done");
    }
  };

  return flight.dep ? (
    <div>
      <div className="">
        <Title text="Seat Selection" />
      </div>
      <div className="p-8">
        <div className="flex flex-wrap justify-center font-arial text-gray-800">
          <div>
            <FlightData data={flight.dep} date={travellingParams.dept_date} />
            <Legend />
          </div>
          <div className="col-span-3">
            {seatMap && bookedSeat ? (
              <SeatMap
                seatMap={seatMap}
                bookedSeat={sendBooked}
                selectionCount={
                  travellingParams.pepoles.adults +
                  (travellingParams.pepoles.children ?? 0)
                }
                callback={handleCallBack}
                mapType={SearchType.From}
              />
            ) : (
              "NO Seat Map Avaliable"
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <LostData />
  );
}
