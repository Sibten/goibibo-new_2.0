import React, { useEffect, useState } from "react";
import Title from "../../../User/Components/Utility/Title";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch, RootState } from "../../../../store";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { FaPlus, FaSearch } from "react-icons/fa";
import FlightCardcomponent from "../../Components/Flights/Card.component";
import { Link } from "react-router-dom";
import { ResultBase } from "../../../../Types";
import { RxReset } from "react-icons/rx";
import { BiPlus } from "react-icons/bi";

export default function FlightDashboardPage() {
  const flights = useSelector((state: RootState) => state.AirlineFlight);
  const airline = useSelector((state: RootState) => state.Airline);

  const [filterFlight, setFliterFlight] = useState<Array<ResultBase>>([]);

  useEffect(() => {
    setFliterFlight([...flights]);
  }, [flights]);

  return (
    <div>
      <Title text="Flights  Management" />
      <div className="font-arial p-2">
        <div className="flex border-b border-gray-300 py-2">
          <div className="mx-2">
            <label className="text-sm flex items-center">
              <FaSearch className="text-sm mx-2" /> Quick Search{" "}
            </label>
            <div className="my-1 flex items-center">
              <Select
                label="Select Flight"
                onChange={(e) => {
                  const data = flights.find((s) => s.flight_no == e);
                  filterFlight.splice(0, filterFlight.length);
                  filterFlight.push(data!);
                  setFliterFlight([...filterFlight]);
                }}
              >
                {flights.map((d) => (
                  <Option value={d.flight_no} key={d.flight_no}>
                    {d.flight_no}
                  </Option>
                ))}
              </Select>
              <button
                className="border border-gray-400 rounded-full h-max p-1 mx-2"
                onClick={() => setFliterFlight([...flights])}
              >
                <RxReset />
              </button>
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
              <Input
                type="search"
                label="Flight No"
                onChange={(e) => {
                  if (e.target.value == "") {
                    setFliterFlight([...flights]);
                  } else {
                    const data = flights.filter((d) =>
                      d.flight_no.includes(e.target.value)
                    );
                    setFliterFlight([...data]);
                  }
                }}
              />
            </div>
          </div>
          <div className="mx-2">
            <label className="text-sm flex items-center">
              {" "}
              <FaSearch className="text-sm mx-2" />
              Search By Source{" "}
            </label>
            <div className="my-1">
              <Input
                type="text"
                label="Source City"
                onChange={(e) => {
                  if (e.target.value == "") {
                    setFliterFlight([...flights]);
                  } else {
                    const data = filterFlight.filter((d) =>
                      d.route_id.source_city.city_name
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    );
                    setFliterFlight([...data]);
                  }
                }}
              />
            </div>
          </div>
          <div className="mx-2">
            <label className="text-sm flex items-center">
              {" "}
              <FaSearch className="text-sm mx-2" />
              Search By Destination{" "}
            </label>
            <div className="my-1">
              <Input
                type="text"
                label="Destination City"
                onChange={(e) => {
                  if (e.target.value == "") {
                    setFliterFlight([...flights]);
                  } else {
                    const data = filterFlight.filter((d) =>
                      d.route_id.destination_city.city_name
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    );
                    setFliterFlight([...data]);
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="my-2  w-full h-[38rem] overflow-auto">
          <h1 className="font-bold text-lg"> Schedulded Flights </h1>
          <div className="flex flex-wrap">
            {filterFlight.map((d) => (
              <div key={d.flight_no} className="w-max">
                <Link to={`${d.flight_no}`}>
                  <FlightCardcomponent
                    flightNo={d.flight_no}
                    source={d.route_id.source_city.city_name}
                    destination={d.route_id.destination_city.city_name}
                  />{" "}
                </Link>
              </div>
            ))}
              {" "}
              <div className="m-2 border bg-gray-50 border-gray-200 p-2 rounded-md w-60 text-center">
            <Link to={"/admin/management/scheduleflight"}>
                <div className="border rounded-full h-max p-2 w-max  mx-auto mt-12 my-2">
                  <FaPlus />{" "}
                </div>{" "}
                <h1 className="text-gray-700"> Add New Flight</h1>
            </Link>
              </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
