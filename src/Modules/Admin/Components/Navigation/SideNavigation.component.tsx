import React from "react";
import { FaPlane } from "react-icons/fa";
import { MdAirplaneTicket, MdDashboard, MdSettings } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

export default function SideNavigationcomponent() {
  const url = useLocation();

  return (
    <div className="flex flex-col bg-white w-full text-lg font-qs h-[51.4rem]">
      <Link to="dashboard">
        {" "}
        <div
          className={`${
            url.pathname.includes("dashboard") || url.pathname == "/admin"
              ? "bg-indigo-600 text-white font-bold "
              : "bg-white text-black hover:bg-gray-100 "
          }   p-2 cursor-pointer `}
        >
          <p className="flex">
            {" "}
            <MdDashboard className="mx-2 my-1" /> Dashboard
          </p>
        </div>{" "}
      </Link>
      <Link to="airline">
        {" "}
        <div
          className={`${
            url.pathname.includes("airline")
              ? "bg-indigo-600 text-white font-bold"
              : "bg-white text-black hover:bg-gray-100"
          }    p-2  cursor-pointer `}
        >
          <p className="flex  ">
            {" "}
            <FaPlane className="mx-2 my-1" /> Airline Profile{" "}
          </p>
        </div>{" "}
      </Link>
      <Link to="management">
        {" "}
        <div
          className={`${
            url.pathname.includes("management")
              ? "bg-indigo-600 text-white font-bold"
              : "bg-white text-black hover:bg-gray-100"
          }    p-2  cursor-pointer `}
        >
          <p className="flex ">
            {" "}
            <MdSettings className="mx-2 my-1" /> Management
          </p>
        </div>{" "}
      </Link>
      <Link to="flights">
        {" "}
        <div
          className={`${
            url.pathname.includes("flights")
              ? "bg-indigo-600 text-white font-bold"
              : "bg-white text-black hover:bg-gray-100"
          }    p-2  cursor-pointer `}
        >
          <p className="flex ">
            {" "}
            <MdAirplaneTicket className="mx-2 my-1" /> Booking & Flights
          </p>
        </div>{" "}
      </Link>
    </div>
  );
}
