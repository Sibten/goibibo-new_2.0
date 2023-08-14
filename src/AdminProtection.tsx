import { useSelector } from "react-redux";
import { RootState } from "./store";
import { Roles } from "./Types";
import { Outlet } from "react-router-dom";
import AdminLoginpage from "./Modules/Admin/Pages/Login/Login.page";
import SideNavigationcomponent from "./Modules/Admin/Components/Navigation/SideNavigation.component";
import { useEffect } from "react";
export default function AdminProtection() {
  const admin = useSelector((state: RootState) => state.Admin);

  return admin.email && admin.role?.role_id == Roles.Admin ? (
    <div className="grid grid-cols-8">
      <div>
        <SideNavigationcomponent />
      </div>
      <div className="col-span-7">
        <Outlet />
      </div>
    </div>
  ) : (
    <AdminLoginpage />
  );
}
