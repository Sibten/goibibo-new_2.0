import { useSelector } from "react-redux";
import { RootState } from "./store";
import { Roles } from "./Types";
import { Outlet } from "react-router-dom";
import AdminLoginpage from "./Admin/Pages/Login.page";
export default function AdminProtection() {
  const admin = useSelector((state: RootState) => state.Admin);

  return admin.email && admin.role?.role_id == Roles.Admin ? (
    <>
      <Outlet />
    </>
  ) : (
    <AdminLoginpage />
  );
}
