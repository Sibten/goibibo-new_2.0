import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ResultBase } from "../../Types";

export default function FlightData({
  data,
  date,
}: {
  data: ResultBase;
  date: string;
}) {
  const Seats = data.available_seats.find(
    (s) => new Date(s.date).toDateString == new Date(date).toDateString
  );
  return (
    <div className="rounded-md border p-2 border-gray-200 m-4 font-arial shadow-sm">
      <h1 className="font-bold font-qs text-black border-b">
        {" "}
        Flight Information{" "}
      </h1>
      <div className="p-1 text-black">
        <div className="flex items-center text-sm p-4">
          <div>
            <img
              src={data.airline_id.airline_icon}
              alt="airline"
              className="w-16 h-10"
            />{" "}
          </div>
          <p className="mx-4">{data.flight_no}</p>
        </div>
        <div className="my-2">
          <ul className="text-base">
            <li>
              <span className="font-bold"> Available Class & Seats </span>{" "}
              <ul className="mx-2">
                <li>
                  {Seats?.BC && Seats.BC > 0
                    ? `Business Class - ${Seats.BC}`
                    : ""}
                </li>
                <li>
                  {Seats?.EC && Seats.EC > 0
                    ? `Economy Class - ${Seats.EC}`
                    : ""}
                </li>
                <li>
                  {Seats?.FC && Seats.FC > 0 ? `First Class - ${Seats.FC}` : ""}{" "}
                </li>
                <li>
                  {Seats?.PE && Seats.PE > 0
                    ? `Premium Economy Class - ${Seats.PE}`
                    : ""}
                </li>
              </ul>
            </li>
            <li>
              <span className="font-bold"> Airbus </span>{" "}
              <p className="mx-2"> {data.airbus_id.airbus_code} </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
