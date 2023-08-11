import React, { useEffect } from "react";
import Title from "../../../../Components/Utility/Title";
import BackToMenu from "../../../Components/Menus/BackToMenu";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch, RootState } from "../../../../store";
import { fetchLuggage } from "../../../../Actions/Admin/Utility.action";
import AirlineData from "../../../Components/Airline/AirlineData";
import EditLuggageComponent from "../../../Components/Management/EditLuggage.component";
import { getFlightClass } from "../../../../Helper/Method";
import { Alert } from "@material-tailwind/react";
export default function LuggagePage() {
  const lugSelector = useSelector((state: RootState) => state.Utility.luggage);
  const dispatch = useDispatch<AppThunkDispatch>();
  useEffect(() => {
    if (lugSelector == null) {
      dispatch(fetchLuggage());
    }
  }, []);
  return (
    <div className="font-arial bg-white pb-8">
      <Title text="Luggage Management" />
      <div className="border rounded-md  p-4 w-[36rem] mx-auto m-2">
        <BackToMenu />
        <div className="flex items-center justify-between">
          <AirlineData />
          <EditLuggageComponent data={lugSelector?.luggage} />
        </div>
        <div className="text-center my-2">
          <h1 className="font-bold text-lg">Current Luggage Chart</h1>
        </div>
        <div>
          <ul>
            {lugSelector?.luggage
              ? lugSelector.luggage?.map((s) => {
                  return (
                    <li
                      key={s.type}
                      className="flex justify-between border-b my-2"
                    >
                      <span>{getFlightClass(s.type)}</span>{" "}
                      <span>
                        <span className="text-xl font-bold"> {s.limit} </span>{" "}
                        <span>kg</span>
                      </span>
                    </li>
                  );
                })
              : ""}
          </ul>
          <Alert className="bg-blue-50 text-blue-600 p-1 text-sm">
            Note : This all are showing total capacity at time of Check In.
          </Alert>
        </div>
      </div>
    </div>
  );
}
