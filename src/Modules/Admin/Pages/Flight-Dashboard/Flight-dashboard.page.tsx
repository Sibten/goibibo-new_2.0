import React, { useEffect } from "react";
import Title from "../../../User/Components/Utility/Title";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch, RootState } from "../../../../store";
import { Input, Option, Select } from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa";
import FlightCardcomponent from "../../Components/Flights/Card.component";
import { Link } from "react-router-dom";

export default function FlightDashboardPage() {
  const flights = useSelector((state: RootState) => state.AirlineFlight);
  const airline = useSelector((state: RootState) => state.Airline);

  return (
    <div>
      <Title text="Flight & Booking Management" />
      <div className="font-arial p-2">
        <div className="flex border-b border-gray-300 py-2">
          <div className="mx-2">
            <label className="text-sm flex items-center">
              <FaSearch className="text-sm mx-2" /> Quick Search{" "}
            </label>
            <div className="my-1">
              <Select label="Select Flight">
                {flights.map((d) => (
                  <Option value={d.flight_no} key={d.flight_no}>
                    {d.flight_no}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="mx-2">
            {" "}
            <label className="text-sm flex items-center">
              {" "}
              <FaSearch className="text-sm mx-2" />
              Search Flight{" "}
            </label>{" "}
            <div className="my-1 flex items-center">
              <span className="mx-1 text-gray-800">{airline.airline_code}</span>{" "}
              <Input type="search" label="Flight No" />
            </div>
          </div>
        </div>
        <div className="my-2  w-full h-[38rem] overflow-auto">
          <h1 className="font-bold text-lg"> Schedulded Flights </h1>
          <div className="flex flex-wrap">
            {flights.map((d) => (
              <div key={d.flight_no}>
                <Link to={`${d.flight_no}`}>
                  <FlightCardcomponent
                    flightNo={d.flight_no}
                    source={d.route_id.source_city.city_name}
                    destination={d.route_id.destination_city.city_name}
                  />{" "}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
