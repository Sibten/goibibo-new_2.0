import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import UserLoginHover from "./UserLoginHover";

export default function UserLoginButton() {
  const [loginShow, setLoginShow] = useState(false);
  const loginPopupShow = () => {
    setLoginShow(true);
  };

  const loginPopupClose = () => {
    setLoginShow(false);
  };
  const handleClick = () => {
    setLoginShow(!loginShow);
  };
  const User = useSelector((state: RootState) => state.User);
  return (
    <>
      <div
        className="border border-blue-600 rounded-lg flex p-2 font-qs font-bold text-gray-800 tracking-wider text-xs"
        onClick={handleClick}
        onMouseEnter={loginPopupShow}
        onMouseLeave={loginPopupClose}
      >
        <div>
          <img src={User.profile_photo} className="w-8 h-8" />{" "}
        </div>
        <h1 className="my-2 ml-2 flex">
          Hey {User.first_name}{" "}
          <MdOutlineKeyboardArrowDown className="text-lg" />
        </h1>
        {loginShow ? <UserLoginHover /> : ""}
      </div>
    </>
  );
}
