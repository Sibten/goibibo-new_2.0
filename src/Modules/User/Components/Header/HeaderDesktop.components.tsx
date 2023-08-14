import React from "react";
import { GiCommercialAirplane } from "react-icons/gi";
import DefaultLoginButton from "./Subcomponents/DefaultLoginButton";
import { FaBus, FaHotel, FaSuitcase, FaTrain } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import UserLoginButton from "./Subcomponents/UserLoginButton";

export default function HeaderDesktop() {
  const User = useSelector((state: RootState) => state.User);
  const location = useLocation();

  return (
    <div className="z-20 shadow-md sticky top-0  bg-white bg-gray-white p-2 w-full flex justify-between">
      <div className="mx-4 w-max flex">
        <Link to="/">
          {" "}
          <img
            src="https://res.cloudinary.com/dgsqarold/image/upload/v1691484041/Goibibo/GoibiboClone_bvxwj4.png"
            alt="goibibo logo"
            className="mx-auto w-28 my-4 h-max "
          />{" "}
        </Link>
        <div className="h-max my-3 mx-16">
          <ul className="flex">
            <Link to="/flight">
              {" "}
              <li
                className={`first-letter:border mx-2 p-1 px-4 rounded-full font-qs font-bold  hover:bg-blue-600 hover:text-white flex cursor-pointer ${
                  location.pathname.includes("/flight") ||
                  location.pathname == "/"
                    ? "text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 "
                    : "text-gray-600 bg-white border"
                }`}
              >
                <GiCommercialAirplane className="mx-2 my-1" /> Flights{" "}
              </li>{" "}
            </Link>
            <Link to="/hotels">
              <li
                className={`first-letter:border mx-2 p-1 px-4 rounded-full font-qs font-bold  hover:bg-blue-600 hover:text-white flex cursor-pointer ${
                  location.pathname.includes("/hotels")
                    ? "text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 "
                    : "text-gray-600 bg-white border"
                }`}
              >
                <FaHotel className="mx-2 my-1" /> Hotels{" "}
              </li>{" "}
            </Link>
            <Link to="/trains">
              {" "}
              <li
                className={`first-letter:border mx-2 p-1 px-4 rounded-full font-qs font-bold  hover:bg-blue-600 hover:text-white flex cursor-pointer ${
                  location.pathname.includes("/trains")
                    ? "text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 "
                    : "text-gray-600 bg-white border"
                }`}
              >
                <FaTrain className="mx-2 my-1" /> Trains{" "}
              </li>{" "}
            </Link>
            <Link to="/bus">
              <li
                className={`first-letter:border mx-2 p-1 px-4 rounded-full font-qs font-bold  hover:bg-blue-600 hover:text-white flex cursor-pointer ${
                  location.pathname.includes("/bus")
                    ? "text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 "
                    : "text-gray-600 bg-white border"
                }`}
              >
                <FaBus className="mx-2 my-1" /> Bus{" "}
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <div className="mx-2 flex items-center">
        <Link to="/mytrips">
          {" "}
          <span className="flex items-center text-gray-800 font-arial mx-4">
            {" "}
            <FaSuitcase className="text-2xl mx-2 text-gray-600" />{" "}
            <span className="text-sm">
              {" "}
              <p className="text-xs"> My Trips</p>{" "}
              <p className="font-bold"> View Booking</p>
            </span>
          </span>{" "}
        </Link>
        {User.email ? <UserLoginButton /> : <DefaultLoginButton />}
      </div>
    </div>
  );
}
