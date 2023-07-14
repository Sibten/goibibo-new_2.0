import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Title from "../../Components/Utility/Title";
import FlightData from "../../Components/SeatSelection/FlightData.component";
import {
  Spinner,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { JouernyType, SeatLayout, BookedSeat, Flighclass } from "../../Types";
import { date } from "../../Helper/Method";
import SeatMap from "../../Components/SeatSelection/SeatLayout.component";

export default function SeatSelectionPage() {
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

  let sendBooked: Array<string> = [];

  switch (travellingParams.class) {
    case Flighclass.Business:
      sendBooked = bookedSeat?.BC ?? [];
      break;
    case Flighclass.Economy:
      sendBooked = bookedSeat?.EC ?? [];
      break;
    case Flighclass.FirstClass:
      sendBooked = bookedSeat?.FC ?? [];
      break;
    case Flighclass.PremiumEconomy:
      sendBooked = bookedSeat?.PE ?? [];
      break;
  }

  return flight.dep ? (
    <div>
      <div className="">
        <Title text="Seat Selection" />
      </div>
      <div>
        <Tabs value={activeTab}>
          <TabsHeader>
            <Tab
              key={JouernyType.Departure}
              value="departure"
              onClick={() => setActiveTab("departure")}
              className={
                activeTab === "departure" ? "text-blue-800 font-bold " : ""
              }
            >
              Departure Flight Seat
            </Tab>
            {flight.rtn ? (
              <Tab
                key={JouernyType.Return}
                value="return"
                onClick={() => setActiveTab("return")}
                className={
                  activeTab === "return" ? "text-blue-800 font-bold" : ""
                }
              >
                Return Flight Seat
              </Tab>
            ) : (
              ""
            )}
          </TabsHeader>
          <TabsBody>
            <TabPanel
              key={JouernyType.Departure}
              value="departure"
              className="p-0"
            >
              <div className="grid grid-cols-4">
                <div>
                  <FlightData
                    data={flight.dep}
                    date={travellingParams.dept_date}
                  />
                  <div>Legend</div>
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
                    />
                  ) : (
                    "NO Seat Map Avaliable"
                  )}
                </div>
              </div>
            </TabPanel>
            <TabPanel key={JouernyType.Return} value="return">
              This is Return
            </TabPanel>
          </TabsBody>
        </Tabs>
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
