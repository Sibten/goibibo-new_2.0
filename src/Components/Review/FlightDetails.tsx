import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useLocation } from "react-router-dom";
import { Flighclass, ResultBase, SearchType } from "../../Types";
import { LuBaggageClaim } from "react-icons/lu";
import {
  getFlightClass,
  time,
  calDuration,
  getStops,
} from "../../Helper/Method";

import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { BookingActions } from "../../Actions/ConfirmBookingDetails.action";

export default function FlightDetails({
  data,
  jouernyDate,
  isReturn,
}: {
  data: ResultBase;
  jouernyDate: string;
  isReturn: boolean;
}) {
  const bookingParams = useSelector((state: RootState) => state.SearchParms);



  const flightTimingData = data?.timing.find(
    (s) =>
      new Date(s.source_time).toDateString() ==
      new Date(jouernyDate).toDateString()
  );

  const source_time = new Date(flightTimingData?.source_time!);
  const destn_time = new Date(flightTimingData?.destination_time!);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isReturn) {
      dispatch(
        BookingActions.addTiming({
          type: SearchType.To,
          data: {
            source_time: source_time.toISOString(),
            destination_time: destn_time.toISOString(),
          },
          class: bookingParams.class,
        })
      );
    } else {
      dispatch(
        BookingActions.addTiming({
          type: SearchType.From,
          data: {
            source_time: source_time.toISOString(),
            destination_time: destn_time.toISOString(),
          },
          class: bookingParams.class,
        })
      );
    }
  }, []);

  return (
    <div className="my-4">
      <div>
        <div className="border-l-4 border-black px-4 font-bold flex">
          {isReturn ? (
            <span className="bg-blue-700 text-white font-bold text-sm p-1 h-max rounded-md">
              Return{" "}
            </span>
          ) : (
            <span className="bg-blue-700 text-white font-bold text-sm p-1 h-max rounded-md">
              Departure{" "}
            </span>
          )}
          <h1 className="mx-2 text-base mt-1">
            {data?.route_id.source_city.city_name}&nbsp;- &nbsp;
            {data?.route_id.destination_city.city_name}{" "}
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
              src={data?.airline_id.airline_icon}
              alt="airline"
              className="w-12 h-12 -mt-2"
            />
            <h1 className="my-2 mx-2">
              {data?.airline_id.airline_name} | {data?.flight_no}
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
            <p>{data?.route_id.source_city.airport_code}</p>
            <p className="text-sm">{data?.route_id.source_city.city_name}</p>
            <p className="text-gray-700 font-normal text-sm">
              {data?.route_id.source_city.airport_name}
            </p>
          </div>

          <div className="text-center my-2 bg-white">
            <h1>
              {calDuration(source_time.toString(), destn_time.toString())}
            </h1>
            <p className="text-xs text-gray-700 font-normal">
              {getStops(data?.route_id.stops ?? [])}
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
            <p>{data?.route_id.destination_city.airport_code}</p>
            <p className="text-sm">
              {data?.route_id.destination_city.city_name}
            </p>
            <p className="text-gray-700 font-normal text-sm">
              {data?.route_id.destination_city.airport_name}
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
                data?.rule.luggage.find((s) => s.type == bookingParams.class)
                  ?.limit
              }{" "}
              Kgs (1 piece only){" "}
              <span className="text-gray-700 mx-1">Check-In</span>
            </>
            <>
              <span>
                <MdOutlineAirlineSeatReclineNormal className="mt-1 mx-2 font-bold" />{" "}
              </span>{" "}
              {Math.ceil(
                data?.rule.luggage.find((s) => s.type == bookingParams.class)
                  ?.limit! / 2
              )}{" "}
              Kgs (1 piece only){" "}
              <span className="text-gray-700 mx-1">Cabin</span>
            </>
          </p>
        </div>
      </div>
    </div>
  );
}
