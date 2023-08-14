import React, { useEffect } from "react";
import Title from "../../../User/Components/Utility/Title";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch, RootState } from "../../../../store";
const MenusList = [
  {
    Name: "Schedule Flight",
    Img: "https://res.cloudinary.com/dgsqarold/image/upload/v1690263275/Goibibo/4343518_gluqau.png",
    Alter: "schedule",
    Link: "scheduleflight",
  },
  {
    Name: "Fare",
    Img: "https://res.cloudinary.com/dgsqarold/image/upload/v1690266508/Goibibo/8587881_vvb7mt.png",
    Alter: "Fare",
    Link: "fare",
  },
  {
    Name: "Luggage Rule",
    Img: "https://res.cloudinary.com/dgsqarold/image/upload/v1690266615/Goibibo/2995991_meij2m.png",
    Alter: "Luggage",
    Link: "luggage",
  },
  {
    Name: "Add Route",
    Img: "https://res.cloudinary.com/dgsqarold/image/upload/v1690271640/Goibibo/3061732_nktdzo.png",
    Alter: "Route",
    Link: "route",
  },
];

export default function Managementpage() {
  const selector = useSelector((state: RootState) => state.Admin);

  const menuClass =
    "w-40 border border-gray-300 hover:bg-indigo-50 p-4 m-4 rounded-md h-40 hover:cursor-pointer";

  return (
    <div className=" relative font-arial  pb-4">
      <Title text="Management" />
      <div className=" w-max rounded-md border border-gray-200 mx-auto my-4 p-4">
        <Link to="/admin">
          <div className="flex text-sm m-4 border rounded-full p-1 w-max ">
            <HiArrowLongLeft className="text-xl" />
            <span className="mx-2">Back to Dashboard</span>
          </div>
        </Link>
        <div className="mx-4 font-bold ">
          <p>Hi, {selector.first_name}! Here is your management panel. </p>
        </div>
        <div className="grid grid-cols-3">
          {MenusList.map((s) => (
            <Link to={s.Link} key={s.Name}>
              <div className={menuClass}>
                <div className="border rounded-full p-4 h-max w-max mx-auto ">
                  <img src={s.Img} alt={s.Alter} className="w-16 h-16" />
                </div>
                <p className="text-center my-2 text-sm">{s.Name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
