import React, { useEffect } from "react";
import { RiSuitcaseLine } from "react-icons/ri";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { TbDiscount2 } from "react-icons/tb";
import { Link } from "react-router-dom";
export default function HeaderSmall() {
  return (
    <div>
      <div className="h-max fixed bottom-0 bg-[#201f23] z-50  w-full text-white font-arial text-sm rounded-t-xl print:hidden">
        <ul className="flex my-2 w-max mx-auto">
          <Link to="/">
            {" "}
            <li className="mx-4">
              {" "}
              <AiOutlineHome className="w-max mx-auto text-2xl" /> Home{" "}
            </li>
          </Link>
          <Link to="/mytrips">
            {" "}
            <li className="mx-4">
              {" "}
              <RiSuitcaseLine className="w-max mx-auto text-2xl" /> My Trips{" "}
            </li>{" "}
          </Link>
          <li className="mx-4">
            {" "}
            <TbDiscount2 className="w-max mx-auto text-2xl" /> Offers{" "}
          </li>
          <Link to="/profile">
            {" "}
            <li className="mx-4">
              {" "}
              <AiOutlineUser className="w-max mx-auto text-2xl" /> Account{" "}
            </li>{" "}
          </Link>
        </ul>
      </div>
    </div>
  );
}
