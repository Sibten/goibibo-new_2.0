import React, { useEffect } from "react";
import Title from "../../../../Components/Utility/Title";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch, RootState } from "../../../../store";
import { fetchFare } from "../../../../Actions/Admin/Utility.action";
import { getFlightClass } from "../../../../Helper/Method";
import { Button } from "@material-tailwind/react";
import BackToMenu from "../../../Components/Menus/BackToMenu";
import { FaPen } from "react-icons/fa";
import EditFarecomponents from "../../../Components/Management/EditFare.component";
import AirlineData from "../../../Components/Airline/AirlineData";

export default function Farepage() {
  const fareSelector = useSelector((state: RootState) => state.Utility.fare);
  const dispatch = useDispatch<AppThunkDispatch>();
  useEffect(() => {
    if (fareSelector == null) {
      dispatch(fetchFare());
    }
  }, []);
  return (
    <div className="bg-white pb-8">
      <Title text="Fare Management" />
      <div className="font-arial">
        <div className="border rounded-md  p-4 w-[36rem] mx-auto m-2">
          <BackToMenu />
          <div className="flex justify-between items-center">
            <AirlineData />
            <div className="mx-4">
              <EditFarecomponents
                fare={fareSelector?.fare}
                tax={fareSelector?.tax ?? parseInt(process.env.GST ?? "18")}
              />
            </div>
          </div>
          <div className="my-2 text-center">
            <h1 className="font-bold text-lg"> Current Fare Chart </h1>
          </div>
          <div>
            <ul>
              <li className="flex justify-between my-2 border-b border-bottom font-bold">
                <span>Class Name</span>
                <span>Price</span>
              </li>

              {fareSelector?.fare
                ? fareSelector.fare.map((s) => (
                    <li
                      key={s.class_type}
                      className="flex justify-between my-2 border-b border-bottom"
                    >
                      <span>{getFlightClass(s.class_type)}</span>
                      <span>
                        <span className="text-xl font-bold">
                          &#8377; {s.basic_fare}{" "}
                        </span>
                        <small>&nbsp; per km</small>
                      </span>
                    </li>
                  ))
                : "N/A"}
              <li className="flex justify-between my-2 border-b border-bottom">
                {" "}
                <span> Taxes (Inc. 18% GST + Surcharge )</span>
                <span>
                  <span className="text-xl font-bold">
                    {Math.ceil(fareSelector?.tax! * 100 ?? 0)}%
                  </span>
                  <small>&nbsp; on total amt</small>
                </span>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm text-blue-600">
              {" "}
              Note : This all fare are applicable by airline only. Goibibo is
              not interfare with this fare.{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
