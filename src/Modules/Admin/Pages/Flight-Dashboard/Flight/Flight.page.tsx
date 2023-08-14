import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../../../../../store";
import FlightDatecomponent from "../../../Components/Flights/FlightDate.component";
import { MdArrowRightAlt } from "react-icons/md";

export default function Flightpage() {
  const params = useParams();

  const selector = useSelector((state: RootState) => state.AirlineFlight);

  const selectedFlight = selector.find((s) => s.flight_no == params.flightno);

  return (
    <div className="font-arial p-2">
      <div>
        <Link to="/admin/flights">
          {" "}
          <span className="text-sm flex items-center  w-max">
            {" "}
            <FaArrowLeft className="mx-2" /> Back to Dashboard{" "}
          </span>{" "}
        </Link>
      </div>
      <div className="my-4">
        <div className="my-2 mx-2 flex justify-between bg-gray-50 p-2">
          <div>
            <h1 className="font-qs font-bold text-xl">
              {" "}
              {selectedFlight?.flight_no}
            </h1>
            <h2 className="font-qs"> Schedule & Management </h2>
          </div>
          <div className="flex font-qs font-bold text-lg items-center">
            <span> {selectedFlight?.route_id.source_city.city_name} </span>{" "}
            <MdArrowRightAlt className="mx-2" />{" "}
            {selectedFlight?.route_id.destination_city.city_name}
          </div>
        </div>
        <div className="mx-2">
          {selectedFlight?.timing.map((s) => (
            <FlightDatecomponent
              key={s.source_time}
              jouDate={s.destination_time}
              destn={s.destination_time}
              source={s.source_time}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
