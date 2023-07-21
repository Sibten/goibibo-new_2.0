import { useSelector } from "react-redux";
import { RootState } from "./store";
import { Outlet, useNavigate } from "react-router-dom";
import LoginPage from "./Pages/Login/Login.page";
import Tracking from "./Components/Tracking/Tracking";

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
