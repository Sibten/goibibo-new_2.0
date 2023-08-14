import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../../store";

export default function AdminHeadercomponent() {
  const selector = useSelector((state: RootState) => state.Admin);
  return (
    <div className="p-4 bg-white shadow-md flex justify-between sticky top-0 h-max z-10">
      <div>
        <Link to="/admin">
          {" "}
          <img
            src="https://res.cloudinary.com/dgsqarold/image/upload/v1691833129/Goibibo/goAdmin_zcqzkh.png"
            alt="goAdmin"
            className="w-36"
          />{" "}
        </Link>
      </div>
      {selector.email ? (
        <Link to="/admin/profile">
          {" "}
          <div className="border border-blue-500 p-2 rounded-md flex items-center font-qs text-blue-700 ">
            <img src={selector.profile_photo} alt="" className="w-8" />
            <h1 className="text-sm mx-2">Hey, {selector.user_name}</h1>
          </div>{" "}
        </Link>
      ) : (
        ""
      )}
    </div>
  );
}
