import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useLocation } from "react-router-dom";
import { Flighclass, ResultBase } from "../../Types";
import { LuBaggageClaim } from "react-icons/lu";
import {
  getFlightClass,
  time,
  calDuration,
  getStops,
} from "../../Helper/Method";
import { FaRegDotCircle } from "react-icons/fa";
import { VscTriangleRight } from "react-icons/vsc";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";

export default function FlightDetails() {
  const selector = useSelector((state: RootState) => state.BookingFlight);

  const bookingParams = useSelector((state: RootState) => state.SearchParms);

  const source_time = new Date(
    selector.dep?.timing.find(
      (s) =>
        new Date(s.source_time).toDateString() ==
        new Date(bookingParams.dept_date).toDateString()
    )?.source_time!
  );

  const destn_time = new Date(
    selector.dep?.timing.find(
      (s) =>
        new Date(s.destination_time).toDateString() ==
        new Date(bookingParams.dept_date).toDateString()
    )?.destination_time!
  );

  return (
    <div className="my-4">
      <div className="bg-white shadow-md w-[48rem] rounded-md py-4 mx-8 h-max font-arial">
        <div>
          <div className="border-l-4 border-black px-4 font-bold flex">
            <span className="bg-blue-700 text-white font-bold text-sm p-1 h-max rounded-md">
              Departure{" "}
            </span>
            <h1 className="mx-2 text-base mt-1">
              {selector.dep?.route_id.source_city.city_name}&nbsp;- &nbsp;
              {selector.dep?.route_id.destination_city.city_name}{" "}
            </h1>
          </div>
          <p className="mx-6 text-sm text-gray-800">
            {" "}
            All departure/arrival times are in local time
          </p>
        </div>
        <div className="m-4 border border-dashed border-gray-400 rounded-md p-4">
          <div className="text-sm text-gray-600 flex justify-between">
            <div className="flex">
              <img
                src={selector.dep?.airline_id.airline_icon}
                alt="airline"
                className="w-20 h-10"
              />
              <h1 className="my-2 mx-2">
                {selector.dep?.airline_id.airline_name} |{" "}
                {selector.dep?.flight_no}
              </h1>
            </div>

            <h1 className="font-bold text-black my-2 mr-4 uppercase">
              {" "}
              {getFlightClass(bookingParams.class)}{" "}
            </h1>
          </div>
          <div className="my-4 flex justify-between">
            <p className="bg-blue-50 w-max p-1 rounded-md">
              {" "}
              Start on -{" "}
              <span className="font-bold"> {source_time.toDateString()} </span>
            </p>
            <p className="bg-blue-50 w-max p-1 rounded-md">
              {" "}
              Arrive on -{" "}
              <span className="font-bold"> {destn_time.toDateString()} </span>
            </p>
          </div>
          <div className="flex justify-between font-bold relative">
            <div>
              <h1 className="text-2xl font-extrabold">
                {" "}
                {source_time.toLocaleTimeString(undefined, {
                  hour: "numeric",
                  minute: "numeric",
                  hourCycle: "h24",
                })}
              </h1>
              <p>{selector.dep?.route_id.source_city.airport_code}</p>
              <p className="text-sm">
                {selector.dep?.route_id.source_city.city_name}
              </p>
              <p className="text-gray-700 font-normal text-sm">
                {selector.dep?.route_id.source_city.airport_name}
              </p>
            </div>
            {/* <div className="absolute ml-24 my-4 flex">
              {" "}
              <FaRegDotCircle className="bg-white" />{" "}
              <p className="border-b border-dashed w-[30rem]  border-gray-500" />
              <VscTriangleRight />
            </div> */}
            <div className="text-center my-2 bg-white">
              <h1>
                {calDuration(source_time.toString(), destn_time.toString())}
              </h1>
              <p className="text-xs text-gray-700 font-normal">
                {getStops(selector.dep?.route_id.stops ?? [])}
              </p>
            </div>
            <div className="text-right">
              <h1 className="text-2xl font-extrabold">
                {" "}
                {destn_time.toLocaleTimeString(undefined, {
                  hour: "numeric",
                  minute: "numeric",
                  hourCycle: "h24",
                })}
              </h1>
              <p>{selector.dep?.route_id.destination_city.airport_code}</p>
              <p className="text-sm">
                {selector.dep?.route_id.destination_city.city_name}
              </p>
              <p className="text-gray-700 font-normal text-sm">
                {selector.dep?.route_id.destination_city.airport_name}
              </p>
            </div>
          </div>
          <div className="border-t mt-4 p-1 border-gray-300 text-sm">
            <p className="flex">
              <span className="text-gray-700"> Baggage - </span>
              <>
                <span>
                  <LuBaggageClaim className="mt-1 mx-2 font-bold" />{" "}
                </span>{" "}
                {
                  selector.dep?.rule.luggage.find(
                    (s) => s.type == bookingParams.class
                  )?.limit
                }{" "}
                Kgs (1 piece only){" "}
                <span className="text-gray-700 mx-1">Check-In</span>
              </>
              <>
                <span>
                  <MdOutlineAirlineSeatReclineNormal className="mt-1 mx-2 font-bold" />{" "}
                </span>{" "}
                {Math.ceil(
                  selector.dep?.rule.luggage.find(
                    (s) => s.type == bookingParams.class
                  )?.limit! / 2
                )}{" "}
                Kgs (1 piece only){" "}
                <span className="text-gray-700 mx-1">Cabin</span>
              </>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
