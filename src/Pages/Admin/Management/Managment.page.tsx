import React, { useEffect } from "react";
import Title from "../../../Components/Utility/Title";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch, RootState } from "../../../store";
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
    Link: "",
  },
  {
    Name: "Reschedule Flight",
    Img: "https://res.cloudinary.com/dgsqarold/image/upload/v1690264551/Goibibo/6485220_vjoill.png",
    Alter: "reschedule",
    Link: "",
  },
  {
    Name: "Create Airbus",
    Img: "https://res.cloudinary.com/dgsqarold/image/upload/v1690264849/Goibibo/1085493_sdkcpr.png",
    Alter: "Airbus",
    Link: "",
  },
  {
    Name: "Luggage Rule",
    Img: "https://res.cloudinary.com/dgsqarold/image/upload/v1690266615/Goibibo/2995991_meij2m.png",
    Alter: "Luggage",
    Link: "",
  },
  {
    Name: "Add Route",
    Img: "https://res.cloudinary.com/dgsqarold/image/upload/v1690271640/Goibibo/3061732_nktdzo.png",
    Alter: "Route",
    Link: "",
  },
];

export default function Managementpage() {
  const selector = useSelector((state: RootState) => state.User);

  const menuClass =
    "w-40 border p-4 m-4 rounded-md h-40 hover:bg-gray-50 hover:cursor-pointer";

  return (
    <div className="relative font-arial">
      <Title text="Management" />
      <div className="w-max rounded-md border mx-auto my-4 p-4">
        <Link to="/admin">
          <div className="flex text-sm m-4 border rounded-full p-1 w-max hover:bg-gray-100">
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
                <div className="border rounded-full p-4 h-max w-max mx-auto bg-gray-100">
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
