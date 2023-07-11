import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { Outlet } from "react-router-dom";
import LoginPage from "./Pages/Login/Login.page";

export default function Protected() {
  const user = useSelector((state: RootState) => state.User);

  return user.email ? <Outlet /> : <LoginPage />;
}
