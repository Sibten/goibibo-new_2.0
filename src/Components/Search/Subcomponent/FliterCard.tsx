import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Airline, AirportType } from "../../../Types";

export default function FliterCard({ callback }: { callback: Function }) {
  const selector = useSelector((state: RootState) => state.Result);

  const [filter, setFilter] = useState({ time: 0, stop: -1 });

  const [airlines, setAirlines] = useState<Array<Airline>>([]);

  const set = new Set();

  useEffect(() => {
    if (selector.length > 0)
      selector.forEach((s) => {
        set.add(s.airline_id.airline_code);
      });
  }, [selector]);

  return (
    <div className="py-2 pl-2">
      <div className="bg-white rounded-md p-2 shadow-md font-arial">
        <div className="border-b">
          <h1 className="font-bold text-xl">Filters </h1>
          <small className="text-gray-500">
            Showing from {selector.length} flights
          </small>
        </div>
        <div className="my-2 border-b">
          <h1 className="font-bold"> Departure </h1>
          <div className="text-sm my-4">
            <span className="mx-2">
              {" "}
              <input type="radio" name="time" id="dep_b_6am" />{" "}
              <label> Before 6 AM </label>
            </span>
            <span className="mx-2">
              {" "}
              <input type="radio" name="time" id="6am_12pm" />{" "}
              <label> 6AM - 12PM </label>
            </span>
            <span className="mx-2">
              {" "}
              <input type="radio" name="time" id="12pm_6pm" />{" "}
              <label> 12PM - 6PM </label>
            </span>
            <span className="mx-2">
              {" "}
              <input type="radio" name="time" id="12pm_6pm" />{" "}
              <label> 12PM - 6PM </label>
            </span>
          </div>
        </div>
        <div className="my-2 border-b">
          <h1 className="font-bold"> Stops </h1>
          <div className="text-sm my-4">
            <span className="mx-2">
              {" "}
              <input type="radio" name="stop" id="non_stop" />{" "}
              <label> Non Stop</label>
            </span>
            <span className="mx-2">
              {" "}
              <input type="radio" name="stop" id="one_stop" />{" "}
              <label> 1 Stop </label>
            </span>
            <span className="mx-2">
              {" "}
              <input type="radio" name="stop" id="two_stop" />{" "}
              <label> 2 Stops</label>
            </span>
            <span className="mx-2">
              {" "}
              <input type="radio" name="stop" id="multi_Stop" />{" "}
              <label> 2+ Stops </label>
            </span>
          </div>
        </div>
        <div className="my-2 border-b">
          <h1 className="font-bold"> Price </h1>
          <div className="w-full">
            <input
              type="range"
              name="price"
              id="price"
              className="w-full text-orange-500 bg-orange-600"
            />
          </div>
        </div>
        <div className="my-2 ">
          <h1 className="font-bold"> Airlines </h1>
          <div className="my-2">
            {airlines.map((a) => (
              <span className="mx-2" key={a.airline_code}>
                {" "}
                <input type="radio" name="airlines" id={a.airline_code} />{" "}
                <label> {a.airline_name}</label>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
