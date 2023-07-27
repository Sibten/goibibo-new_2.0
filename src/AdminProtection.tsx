import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppThunkDispatch } from "./store";
import { Roles } from "./Types";
import Homepage from "./Pages/Home/Home.page";
import { Outlet } from "react-router-dom";
import { fetchAirlineDetails } from "./Actions/Admin/Airline.action";
import { fetchAirlineFlights } from "./Actions/Admin/AirlineFlights.action";
import { fetchAirbus } from "./Actions/Admin/Airbuses.action";
import { fetchRoutes } from "./Actions/Admin/Route.action";

export default function AdminProtection() {
  const user = useSelector((state: RootState) => state.User);

  return user.email && user.role?.role_id == Roles.Admin ? (
    <>
      <Outlet />
    </>
  ) : (
    <Homepage />
  );
}
