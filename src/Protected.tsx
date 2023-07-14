import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { Outlet } from "react-router-dom";
import LoginPage from "./Pages/Login/Login.page";
import Tracking from "./Components/Tracking/Tracking";

export default function Protected() {
  const user = useSelector((state: RootState) => state.User);

  return user.email ? (
    <>
      {" "}
      <Tracking /> <Outlet />{" "}
    </>
  ) : (
    <LoginPage />
  );
}
