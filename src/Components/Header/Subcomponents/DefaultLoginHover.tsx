import React from "react";
import { FaSuitcase } from "react-icons/fa";
import { TbDiscount2 } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function DefaultLoginHover() {
  return (
    <div className="bg-white rounded-md shadow-md absolute mt-10 p-4 px-6 -ml-28 w-[18rem]">
      <h1 className="font-qs font-bold tracking-wide text-gray-800 text-lg">
        {" "}
        Hey Traveller{" "}
      </h1>
      <small className="font-arial text-xs text-gray-700">
        Get exclusive deals & Manage your trips
      </small>
      <Link to="/login">
        {" "}
        <button className="bg-orange-700 font-qs w-full my-4 rounded-md p-2 text-white font-bold">
          Login / Signup
        </button>{" "}
      </Link>
      <div>
        <ul>
          <li className="text-gray-700 flex my-2 border-b p-2">
            <FaSuitcase className="text-xl" />{" "}
            <p className="mx-4 text-md font-qs font-bold">My Trips </p>{" "}
          </li>
          <li className="text-gray-700 flex my-2 p-2">
            <TbDiscount2 className="text-xl" />{" "}
            <p className="mx-4 text-md font-qs font-bold"> Offers </p>{" "}
          </li>
        </ul>
      </div>
    </div>
  );
}
