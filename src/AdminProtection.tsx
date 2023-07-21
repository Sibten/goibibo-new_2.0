import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppThunkDispatch } from "./store";
import { Roles } from "./Types";
import Homepage from "./Pages/Home/Home.page";
import { Outlet } from "react-router-dom";
import { fetchAirlineDetails } from "./Actions/Airline.action";

export default function AdminProtection() {
  const user = useSelector((state: RootState) => state.User);
  const airline = useSelector((state: RootState) => state.Airline);

  const dispatch = useDispatch<AppThunkDispatch>();
  useEffect(() => {
    if (!airline.airline_code) {
      dispatch(fetchAirlineDetails());
    }
  }, []);

  return user.email && user.role?.role_id == Roles.Admin ? (
    <>
      {" "}
      <Outlet />{" "}
    </>
  ) : (
    <Homepage />
  );
}
