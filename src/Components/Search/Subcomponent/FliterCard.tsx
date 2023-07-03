import React from "react";

export default function FliterCard() {
  return (
    <div className="py-2 pl-2">
      <div className="bg-white rounded-md p-2 shadow-md font-arial">
        <div className="border-b">
          <h1 className="font-bold text-xl">Filters </h1>
          <small className="text-gray-500">Showing 10 Flights</small>
        </div>
        <div className="my-2 border-b">
          <h1 className="font-bold"> Departure </h1>
          <div className="text-sm my-4">
            <span className="mx-2">
              {" "}
              <input type="checkbox" name="dep_b_6am" id="dep_b_6am" />{" "}
              <label> Before 6 AM </label>
            </span>
            <span className="mx-2">
              {" "}
              <input type="checkbox" name="6am_12pm" id="6am_12pm" />{" "}
              <label> 6AM - 12PM </label>
            </span>
            <span className="mx-2">
              {" "}
              <input type="checkbox" name="12pm_6pm" id="12pm_6pm" />{" "}
              <label> 12PM - 6PM </label>
            </span>
            <span className="mx-2">
              {" "}
              <input type="checkbox" name="12pm_6pm" id="12pm_6pm" />{" "}
              <label> 12PM - 6PM </label>
            </span>
          </div>
        </div>
        <div className="my-2 border-b">
          <h1 className="font-bold"> Stops </h1>
          <div className="text-sm my-4">
            <span className="mx-2">
              {" "}
              <input type="checkbox" name="non_stop" id="non_stop" />{" "}
              <label> Non Stop</label>
            </span>
            <span className="mx-2">
              {" "}
              <input type="checkbox" name="one_stop" id="one_stop" />{" "}
              <label> 1 Stop </label>
            </span>
            <span className="mx-2">
              {" "}
              <input type="checkbox" name="two_stop" id="two_stop" />{" "}
              <label> 2 Stops</label>
            </span>
            <span className="mx-2">
              {" "}
              <input type="checkbox" name="multi_stop" id="multi_Stop" />{" "}
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
            <span className="mx-2">
              {" "}
              <input type="checkbox" name="dep_b_6am" id="dep_b_6am" />{" "}
              <label> AirIndia</label>
            </span>
            <span className="mx-2">
              {" "}
              <input type="checkbox" name="dep_b_6am" id="dep_b_6am" />{" "}
              <label> Indigo</label>
            </span>
            <span className="mx-2">
              {" "}
              <input type="checkbox" name="dep_b_6am" id="dep_b_6am" />{" "}
              <label> Lufthasna</label>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
