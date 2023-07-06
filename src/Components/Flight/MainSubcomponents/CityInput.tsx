import React, { useState } from "react";
import {
  MyProps,
  AirportType,
  SearchType,
  SearchParamsType,
  CallBackType,
  callTypes,
} from "../../../Types";
import { RootState } from "../../../store";
import { useSelector, useDispatch } from "react-redux";
import { MenuItem } from "@material-tailwind/react";
import { FaPlane } from "react-icons/fa";
import "./CityInput.css";
import { searchActions } from "../../../Actions/Search.action";

export default function FlightInput({
  label,
  type,
  callback,
  callType,
}: MyProps) {
  const Airports = useSelector((state: RootState) => state.Airports);
  const SearchParams = useSelector((state: RootState) => state.SearchParms);
  const dispatch = useDispatch();

  const [airportData, setAirportData] = useState<Array<AirportType>>([
    ...Airports,
  ]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) setAirportData([...Airports]);
    else
      setAirportData(
        Airports.filter(
          (s: any) =>
            s.city_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            s.airport_code.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
  };

  const clickSearchParams: SearchParamsType = {
    ...SearchParams,
    from: SearchParams.from,
    to: SearchParams.to,
  };

  const handleclick = (airport: AirportType) => {
    if (type == SearchType.To) {
      if (clickSearchParams.from.city_name == airport.city_name) {
        callback!(CallBackType.error);
      } else {
        clickSearchParams.to = airport;
      }
    } else if (type == SearchType.From) {
      if (clickSearchParams.to.city_name == airport.city_name) {
        callback!(CallBackType.error);
      } else {
        clickSearchParams.from = airport;
      }
    }
    if (callType == callTypes.JustReturn) {
      callback!(clickSearchParams);
    } else {
      dispatch(searchActions.setParams(clickSearchParams));
      callback!(CallBackType.success);
    }
  };

  return (
    <div className="w-96 overflow-hidden px-2 pt-2 bg-white rounded-lg">
      <div>
        <label className="absolute bg-white mx-4 -mt-2 px-2 text-blue-500 font-qs font-bold capitalize">
          {" "}
          {label}
        </label>
        <input
          className="text-xl font-qs w-full p-2 border-blue-500 border-2 text-black focus:outline-blue-600 rounded-lg"
          onChange={(e) => handleSearch(e)}
        />
        <div className="h-96 overflow-y-auto inputPred bg-white text-gray-600">
          <ul className="mt-2">
            {airportData.map((a, i) => (
              <MenuItem
                key={`${a.airport_code}-${a.city_id}`}
                onClick={() => handleclick(a)}
              >
                <li className="p-2 flex">
                  <FaPlane className="text-xl mr-4 my-2" />
                  <div>
                    <h3 className="font-qs font-bold text-lg text-gray-800">
                      {" "}
                      {a.city_name}{" "}
                      <span className="font-light"> ({a.airport_code})</span>
                    </h3>
                    <p className="font-arial text-xs">{a.airport_name}</p>
                  </div>
                </li>
              </MenuItem>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
