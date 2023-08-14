import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch, RootState } from "../../../../store";
import { fetchAirlineDetails } from "../../../../Actions/Admin/Airline.action";

export default function AirlineData() {
  const airlineSelector = useSelector((state: RootState) => state.Airline);
  const dispatch = useDispatch<AppThunkDispatch>();
  useEffect(() => {
    if (airlineSelector.airline_code == "") {
      dispatch(fetchAirlineDetails());
    }
  }, []);
  return (
    <div className="font-arial">
      <div className="flex items-center">
        <img
          src={airlineSelector?.airline_icon}
          alt="airline"
          className="w-20 h-16"
        />
        <div>
          <h1 className="font-bold text-xl">{airlineSelector?.airline_name}</h1>
          <p>{airlineSelector?.airline_location}</p>
        </div>
      </div>
    </div>
  );
}
