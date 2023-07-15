import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Title from "../../Components/Utility/Title";
import FlightData from "../../Components/SeatSelection/FlightData.component";
import { Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { BookedSeat, Flighclass, Traveller } from "../../Types";

import SeatMap from "../../Components/SeatSelection/SeatLayout.component";
import Legend from "../../Components/SeatSelection/Legend";
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

  const navigate = useNavigate();

  useEffect(() => {
    if (!flight.dep) {
      setTimeout(() => {
        navigate("/flight");
      }, 1000);
    }
  }, []);

  const [activeTab, setActiveTab] = useState<string>("departure");

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
    console.log(value);
    if (flight.rtn) {
      setActiveTab("return");
    } else {
      console.log("done");
    }
  };

  return flight.dep ? (
    <div>
      <div className="">
        <Title text="Seat Selection" />
      </div>
      <div>
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
              />
            ) : (
              "NO Seat Map Avaliable"
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="font-qs font-bold p-2">
      <Title text="Seat Selection" />{" "}
      <p> oops! you have lost your booking data </p>{" "}
      <p className="flex">
        {" "}
        <Spinner className="mx-2" /> Redirecting...{" "}
      </p>
    </div>
  );
}
