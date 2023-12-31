import React, { useEffect, useState } from "react";
import Header from "./Modules/User/Components/Header/Header.components";
import { Outlet } from "react-router-dom";
import Footer from "./Modules/User/Components/Footer/Footer";
import AdminHeadercomponent from "./Modules/Admin/Components/Navigation/AdminHeader.component";
import AdminFootercomponent from "./Modules/Admin/Components/Footer/AdminFooter.component";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrips } from "./Actions/Trip.action";
import { fetchUser, userActions } from "./Actions/User.action";
import { getAPI } from "./Services/API.services";
import { Roles } from "./Types";
import { AppThunkDispatch, RootState } from "./store";
import { fetchAdmin } from "./Actions/Admin/AdminDetails.action";
import Loaderdialog from "./Modules/User/Components/Dialog/Loader.dialog";
import { error } from "console";
import BadError from "./Modules/User/Components/Errors/Bad";
import { fetchAirbus } from "./Actions/Admin/Airbuses.action";
import { fetchAirlineDetails } from "./Actions/Admin/Airline.action";
import { fetchAirlineFlights } from "./Actions/Admin/AirlineFlights.action";
import { fetchLuggage, fetchFare } from "./Actions/Admin/Utility.action";
import { fetchRoutes } from "./Actions/Admin/Route.action";
export default function Skeleton({ isAdmin }: { isAdmin: boolean }) {
  const email = Cookies.get("email");
  const dispatch = useDispatch<AppThunkDispatch>();
  const simpleDispatch = useDispatch();

  const Admin = useSelector((state: RootState) => state.Admin);
  const User = useSelector((state: RootState) => state.User);
  const [err, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      if (Admin.email || User.email) {
        return true;
      }
      try {
        const res = await getAPI(`/user/getrole?email=${email}`);
        console.log(res);
        if (res.data.role.role_id == Roles.User) {
          dispatch(fetchUser(email ?? ""));
          dispatch(fetchTrips());

          setTimeout(() => {
            setLoading(false);
          }, 1000);
        } else if (res.data.role.role_id == Roles.Admin) {
          simpleDispatch(userActions.remove());
          dispatch(fetchAdmin(email ?? ""));

          dispatch(fetchAirlineDetails());
          dispatch(fetchAirlineFlights());
          dispatch(fetchAirbus());
          dispatch(fetchLuggage());
          dispatch(fetchFare());
          dispatch(fetchRoutes());
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      {isAdmin ? <AdminHeadercomponent /> : <Header />}
      {loading ? (
        <>
          {" "}
          <Loaderdialog />{" "}
        </>
      ) : (
        <Outlet />
      )}
      {isAdmin ? <AdminFootercomponent /> : <Footer />}
    </div>
  );
}
