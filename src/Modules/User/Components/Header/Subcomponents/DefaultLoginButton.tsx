import React, { useState } from "react";

import { FaUserCircle } from "react-icons/fa";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import DefaultLoginHover from "./DefaultLoginHover";

export default function DefaultLoginButton() {
  const [loginShow, setLoginShow] = useState(0);
  const loginPopupShow = () => {
    setLoginShow(1);
  };

  const loginPopupClose = () => {
    setLoginShow(0);
  };
  const handleClick = () => {
    loginShow ? setLoginShow(0) : setLoginShow(1);
  };
  return (
    <>
      <div
        className="border py-1 px-1 h-max my-2 border-blue-500 rounded-lg flex cursor-pointer"
        onMouseEnter={loginPopupShow}
        onMouseLeave={loginPopupClose}
        onClick={handleClick}
      >
        <FaUserCircle className="text-2xl text-[#0074eb] my-1" />
        <h2 className="text-xs tracking-wide uppercase my-2 mx-2 font-qs font-bold text-[#0074eb]">
          Login / Signup
        </h2>
        {loginShow ? (
          <>
            {" "}
            <BsChevronUp className="my-2 text-[#0074eb]" />{" "}
            <DefaultLoginHover />
          </>
        ) : (
          <BsChevronDown className="my-2 text-[#0074eb]" />
        )}
      </div>
    </>
  );
}
