import React, { useEffect, useState } from "react";
import Header from "./Components/Header/Header.components";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import AdminHeadercomponent from "./Admin/Components/Header/AdminHeader.component";
import AdminFootercomponent from "./Admin/Components/Footer/AdminFooter.component";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrips } from "./Actions/Trip.action";
import { fetchUser } from "./Actions/User.action";
import { getAPI } from "./Services/API.services";
import { Roles } from "./Types";
import { AppThunkDispatch, RootState } from "./store";
import { fetchAdmin } from "./Actions/Admin/AdminDetails.action";
import Loaderdialog from "./Components/Dialog/Loader.dialog";
import { error } from "console";
import BadError from "./Components/Errors/Bad";
export default function Skeleton({ isAdmin }: { isAdmin: boolean }) {
  const email = Cookies.get("email");
  const dispatch = useDispatch<AppThunkDispatch>();

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
          dispatch(fetchAdmin(email ?? ""));

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

  const response = err ? <BadError /> : <Outlet />;

  return (
    <div>
      {isAdmin ? <AdminHeadercomponent /> : <Header />}
      {loading ? (
        <>
          {" "}
          <Loaderdialog />{" "}
        </>
      ) : (
        response
      )}
      {isAdmin ? <AdminFootercomponent /> : <Footer />}
    </div>
  );
}
