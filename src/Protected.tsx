import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch, RootState } from "./store";
import { Outlet, useNavigate } from "react-router-dom";
import LoginPage from "./Pages/Login/Login.page";
import Tracking from "./Components/Tracking/Tracking";
import Cookies from "js-cookie";
import { fetchUser } from "./Actions/User.action";
import { fetchTrips } from "./Actions/Trip.action";
import { useEffect } from "react";
import { getAPI } from "./Services/API.services";
import { Roles } from "./Types";

export default function Protected({ head }: { head: boolean }) {
  const user = useSelector((state: RootState) => state.User);

  const header = head ? <Tracking /> : "";

  return user.email ? (
    <>
      {" "}
      {header} <Outlet />{" "}
    </>
  ) : (
    <LoginPage />
  );
}
