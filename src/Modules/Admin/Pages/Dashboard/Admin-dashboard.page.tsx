import React, { useEffect } from "react";
import Title from "../../../User/Components/Utility/Title";
import AdminManagementSpeedDial from "../../Components/SpeedDial";
import Flightscomponent from "../../Components/Flights/Flights.component";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch, RootState } from "../../../../store";

import { fetchAirlineDetails } from "../../../../Actions/Admin/Airline.action";
import { fetchAirlineFlights } from "../../../../Actions/Admin/AirlineFlights.action";

import "../Style.css";
import Greeting from "../../../User/Components/Greeting/Greeting";
import { Link } from "react-router-dom";
import TodaysFlightcomponent from "../../Components/Flights/TodaysFlight.component";

export default function Admindashpage() {
  const selector = useSelector((state: RootState) => state.AirlineFlight);

  let totalFlightSchedule = 0;

  const routeSet = new Set();
  selector.forEach((s) => {
    routeSet.add(s.route_id.route_id);
    totalFlightSchedule += s.timing.length;
  });
  const todayFlight = selector.filter((s) =>
    s.timing.find(
      (s) => new Date(s.source_time).toDateString() == new Date().toDateString()
    )
  );
  let todayBooking = 0;
  todayFlight.forEach((s) => {
    let b = s.booked_seats.find(
      (s) => new Date(s.date).toDateString() == new Date().toDateString()
    );
    if (b) {
      todayBooking += b.BC.length + b.EC.length + b.FC.length + b.PE.length;
    }
  });

  return (
    <div className="h-max font-arial">
      <Title text="Dashboard" />
      <Greeting />
      <div className="flex m-2 border-b p-2 w-max">
        <div className="infoblock block rounded-md mx-2  p-2">
          <p className=" text-white text-4xl font-qs">
            {" "}
            {totalFlightSchedule}{" "}
          </p>
          <h1 className="text-gray-300"> Total Flight Schedule</h1>
        </div>
        <div className="infoblock rounded-md mx-2 p-2">
          <TodaysFlightcomponent data={todayFlight} />
        </div>
        <Link to="/admin/management/route">
          {" "}
          <div className="infoblock rounded-md mx-2 p-2">
            <p className="text-white text-4xl font-qs">{routeSet.size} </p>
            <h1 className="text-gray-300"> Total Routes</h1>
          </div>{" "}
        </Link>
        <div className="infoblock rounded-md mx-2 p-2">
          <p className="text-white text-4xl font-qs"> {todayBooking} </p>
          <h1 className="text-gray-300"> Today's Booking </h1>
        </div>
      </div>
      <div className="mx-4">
        <Flightscomponent data={selector} />
      </div>
      <AdminManagementSpeedDial />
    </div>
  );
}
