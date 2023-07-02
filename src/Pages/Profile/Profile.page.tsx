import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { userActions } from "../../Actions/User.action";
import Cookies from "js-cookie";
import DefaultProfile from "../../Components/Profile/Default.componenet";
import UserProfile from "../../Components/Profile/UserProfile.component";

export default function Profilepage() {
  return (
    <div>
      <div>{Cookies.get("email") ? <UserProfile /> : <DefaultProfile />}</div>
    </div>
  );
}
