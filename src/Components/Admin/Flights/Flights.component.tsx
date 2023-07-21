import React from "react";
import { Button, Input } from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa";

export default function Flightscomponent() {
  return (
    <div className="m-2">
      <div className="w-24 flex">
        <Input type="search" label="Search" />{" "}
        <button className="mx-2 bg-indigo-500 rounded-full p-3 h-max">
          <FaSearch className="text-white" />
        </button>
      </div>
      <div className="my-4">
        <h1 className="font-bold"> Scheduled Flights</h1>
      </div>
    </div>
  );
}
