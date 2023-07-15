import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { AvaliableSeat, ResultBase } from "../../Types";
import { getFlightClass, getLongFormClass } from "../../Helper/Method";
import { Alert } from "@material-tailwind/react";

const getSeatData = (class_name: string, seatData: AvaliableSeat) => {
  switch (class_name) {
    case "BC":
      return seatData.BC > 0 ? (
        <li className="flex justify-between border-b my-1 p-1" key="BC">
          {" "}
          <span>Bussiness</span>
          <span>{seatData.BC}</span>{" "}
        </li>
      ) : (
        ""
      );
    case "EC":
      return seatData.EC > 0 ? (
        <li className="flex justify-between border-b my-1 p-1" key="EC">
          {" "}
          <span>Economy</span>
          <span>{seatData.EC}</span>{" "}
        </li>
      ) : (
        ""
      );
    case "FC":
      return seatData.FC > 0 ? (
        <li className="flex justify-between border-b my-1 p-1" key="FC">
          {" "}
          <span>First Class</span>
          <span>{seatData.FC}</span>{" "}
        </li>
      ) : (
        ""
      );
    case "PE":
      return seatData.PE > 0 ? (
        <li className="flex justify-between border-b my-1 p-1" key="PE">
          {" "}
          <span>Premium Economy</span>
          <span>{seatData.PE}</span>{" "}
        </li>
      ) : (
        ""
      );
  }
};
export default function FlightData({
  data,
  date,
}: {
  data: ResultBase;
  date: string;
}) {
  console.log(date);
  const Seats = data.available_seats.find(
    (s) => new Date(s.date).toDateString() == new Date(date).toDateString()
  ) ?? { BC: 0, EC: 0, PE: 0, date: new Date(), FC: 0 };
  console.log(Seats);
  return (
    <div className="rounded-md border p-2 border-gray-200 m-4 font-arial shadow-sm">
      <h1 className="font-bold font-qs text-black border-b">
        Flight Information
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
        <div className="text-sm text-center">
          <p className="font-bold">
            {data.route_id.source_city.city_name} -&nbsp;
            {data.route_id.destination_city.city_name} |{" "}
            {new Date(date).toDateString()}
          </p>
        </div>
        <div className="mt-4">
          <h1 className="font-bold"> Seat Avaliblity </h1>
          <div>
            <ul className="text-sm ">
              {Object.keys(Seats).map((s) => {
                return getSeatData(s, Seats);
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
