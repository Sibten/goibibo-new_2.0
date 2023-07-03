import React from "react";
import { GiCommercialAirplane } from "react-icons/gi";
import DefaultLoginButton from "./Subcomponents/DefaultLoginButton";
import { FaBus, FaHotel, FaTrain } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import UserLoginButton from "./Subcomponents/UserLoginButton";

export default function HeaderDesktop() {
  const User = useSelector((state: RootState) => state.User);
  const location = useLocation();

  return (
    <div className="z-20 shadow-md sticky top-0 bg-white bg-gray-white p-2 w-full flex justify-between">
      <div className="mx-4 w-max flex">
        <Link to="/">
          {" "}
          <img
            src="https://res.cloudinary.com/dgsqarold/image/upload/v1685613732/Goibibo/OIP_l87euo.jpg"
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
                  location.pathname.includes("/flight") || location.pathname == "/"
                    ? "text-white bg-blue-800"
                    : "text-gray-600 bg-white border"
                }`}
              >
                <GiCommercialAirplane className="mx-2 my-1" /> Flights{" "}
              </li>{" "}
            </Link>
            <li className="border mx-2 p-1 px-4 rounded-full font-qs font-bold text-gray-600 hover:bg-blue-600 hover:text-white flex cursor-pointer">
              <FaHotel className="mx-2 my-1" /> Hotels{" "}
            </li>
            <li className="border mx-2 p-1 px-4 rounded-full font-qs font-bold text-gray-600 hover:bg-blue-600 hover:text-white flex cursor-pointer">
              <FaTrain className="mx-2 my-1" /> Trains{" "}
            </li>
            <li className="border mx-2 p-1 px-4 rounded-full font-qs font-bold text-gray-600 hover:bg-blue-600 hover:text-white flex cursor-pointer">
              <FaBus className="mx-2 my-1" /> Bus{" "}
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-2">
        {User.email ? <UserLoginButton /> : <DefaultLoginButton />}
      </div>
    </div>
  );
}
