import React from "react";
import DefaultLoginButton from "../../Components/Header/Subcomponents/DefaultLoginButton";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import UserLoginButton from "../../Components/Header/Subcomponents/UserLoginButton";
import { FaPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  BsAirplane,
  BsBuilding,
  BsBusFront,
  BsTrainFront,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import Flightsearchsmall from "../../Components/Flight/Flightsearch.small.component";
import Advt from "../../Components/Home/Advt";
import FAQs from "../../Components/Home/FAQs";

export default function HomeSmall() {
  const selector = useSelector((state: RootState) => state.User);

  return (
    <div className="font-arial pb-16 bg-gray-50">
      <div className="p-2">
        {selector.email ? <UserLoginButton /> : <DefaultLoginButton />}
      </div>
      <div className="grid grid-cols-4 p-2 z-10 sticky top-0 h-[58px] bg-gray-50">
        <Link to="/flight">
          {" "}
          <div className="bg-white mx-2 p-2 rounded-md shadow-md text-center">
            <BsAirplane className="mx-auto w-max text-xl " />
            Flights
          </div>{" "}
        </Link>
        <div className="bg-white mx-2 p-2 rounded-md shadow-md text-center">
          <BsBuilding className="mx-auto w-max text-xl" />
          Hotels
        </div>
        <div className="bg-white mx-2 p-2 rounded-md shadow-md text-center">
          <BsTrainFront className="mx-auto w-max text-xl" />
          Trains
        </div>
        <div className="bg-white mx-2 p-2 rounded-md shadow-md text-center">
          <BsBusFront className="mx-auto w-max text-xl" />
          Bus
        </div>
      </div>
      <div className="">
        <Flightsearchsmall />
      </div>
      <Advt />
      <FAQs />
    </div>
  );
}
