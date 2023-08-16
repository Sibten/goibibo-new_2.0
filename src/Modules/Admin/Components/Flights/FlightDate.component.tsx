import { Button, Tooltip } from "@material-tailwind/react";
import React from "react";
import { FaEye } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { LuSettings } from "react-icons/lu";
import { date, time } from "../../../../Helper/Method";
import { Link } from "react-router-dom";

export default function FlightDatecomponent({
  source,
  destn,
  jouDate,
}: {
  source: string;
  destn: string;
  jouDate: string;
}) {
  return (
    <div className="border border-gray-300 w-48 p-2 rounded-md m-2">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg">{date(jouDate)}</h1>
      </div>
      <ul className="text-sm">
        <li className="flex justify-between">
          {" "}
          <span> Source </span> <span> {time(source)}</span>{" "}
        </li>
        <li className="flex justify-between">
          {" "}
          <span> Destination </span> <span> {time(destn)}</span>{" "}
        </li>
      </ul>
      <div className="flex border-t border-gray-300 my-1 p-1 justify-around text-lg">
        <Tooltip content="Reschedule">
          <Link to={`${source}/manage`}>
            {" "}
            <button>
              {" "}
              <LuSettings />
            </button>{" "}
          </Link>
        </Tooltip>
      </div>
    </div>
  );
}
