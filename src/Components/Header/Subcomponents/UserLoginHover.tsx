import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { FaSuitcase } from "react-icons/fa";
import { TbDiscount2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import { Roles } from "../../../Types";
import { RiAdminFill } from "react-icons/ri";
import { MdSupportAgent } from "react-icons/md";
export default function UserLoginHover() {
  const User = useSelector((state: RootState) => state.User);
  return (
    <div className="bg-gray-50 rounded-md shadow-lg absolute mt-10 p-4 px-6 lg:-ml-20  w-[14rem]">
      <div className="font-qs font-bold tracking-wide text-gray-800 text-base  flex">
        <img src={User.profile_photo} alt="user" className="w-8 h-8 mr-4" />
        <Link to="/profile">
          <div>
            <h1 className="text-gray-700">
              {User.first_name} {User.last_name}
            </h1>
            <p className="-mt-1 font-normal text-xs font-arial text-blue-500">
              View Your Profile
            </p>
          </div>
        </Link>
      </div>

      <div className="font-bold text-sm ">
        <ul>
          <Link to="/mytrips">
            <li className="text-gray-700 flex my-2 border-b p-2">
              <FaSuitcase className="text-xl" />
              <p className="mx-4 text-md font-qs font-bold">My Trips </p>
            </li>
          </Link>
          <Link to="/offers">
            <li className="text-gray-700 flex border-b my-2 p-2">
              <TbDiscount2 className="text-xl" />
              <p className="mx-4 text-md font-qs font-bold"> Offers </p>
            </li>{" "}
          </Link>
          <Link to="/support">
            {" "}
            <li className="text-gray-700 flex border-b my-2 p-2 w-max">
              <MdSupportAgent className="text-xl" />{" "}
              <p className="mx-4 text-md font-qs font-bold w-max">
                {" "}
                Help & Support{" "}
              </p>{" "}
            </li>
          </Link>
          {User.role?.role_id == Roles.Admin ? (
            <Link to="/admin">
              {" "}
              <li className="text-gray-700 flex border-b my-2 p-2">
                <RiAdminFill className="text-xl" />
                <p className="mx-4 text-md font-qs font-bold">Administration</p>
              </li>{" "}
            </Link>
          ) : (
            ""
          )}
        </ul>
      </div>
    </div>
  );
}
