import React from "react";
import Title from "../../Components/Utility/Title";
import AdminManagementSpeedDial from "../../Components/Admin/SpeedDial";
import Flightscomponent from "../../Components/Admin/Flights/Flights.component";

export default function Admindashpage() {
  return (
    <div>
      <Title text="Dashboard" />
      <div className="flex m-2 border-b p-2">
        <div className="bg-indigo-700 rounded-md mx-2  p-2">
          <p className="text-white text-4xl font-qs"> 12 </p>
          <h1 className="text-gray-300"> Total Flight Schedule</h1>
        </div>
        <div className="bg-indigo-700 rounded-md mx-2 p-2">
          <p className="text-white text-4xl font-qs"> 3 </p>
          <h1 className="text-gray-300"> Today's Flights</h1>
        </div>
        <div className="bg-indigo-700 rounded-md mx-2 p-2">
          <p className="text-white text-4xl font-qs"> 5 </p>
          <h1 className="text-gray-300"> Total Routes</h1>
        </div>
        <div className="bg-indigo-700 rounded-md mx-2 p-2">
          <p className="text-white text-4xl font-qs"> 450 </p>
          <h1 className="text-gray-300"> Today's Booking </h1>
        </div>
      </div>
      <div>
        <Flightscomponent />
      </div>
      <AdminManagementSpeedDial />
    </div>
  );
}
