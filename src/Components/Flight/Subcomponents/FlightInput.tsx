import React, { useState } from "react";
import {
  MyProps,
  AirportType,
  SearchType,
  SearchParamsType,
} from "../../../Types";
import { RootState } from "../../../store";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "@material-tailwind/react";
import { FaPlane } from "react-icons/fa";
import "./FlightInput.css";
import { searchActions } from "../../../Actions/Search.action";

export default function FlightInput({ label, type }: MyProps) {
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
        Airports.filter((s) =>
          s.city_name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
  };

  const clickSearchParams: SearchParamsType = {
    from: SearchParams.from,
    from_airport: SearchParams.from_airport,
    to: SearchParams.to,
    to_airport: SearchParams.to_airport,
    dept_date: SearchParams.dept_date,
  };

  const handleclick = (airport: AirportType) => {
    if (type == SearchType.To) {
      clickSearchParams.to = airport.city_name;
      clickSearchParams.to_airport = airport.airport_name;
    } else if (type == SearchType.From) {
      clickSearchParams.from = airport.city_name;
      clickSearchParams.from_airport = airport.airport_name;
    }
    console.log(clickSearchParams);
    dispatch(searchActions.setParams(clickSearchParams));
  };

  return (
    <div className="w-96 overflow-hidden px-2 pt-2">
      <Input
        label={label}
        className="text-xl font-qs w-full p-2 border-blue-500 border-2 focus:outline-blue-600 rounded-lg"
        onChange={(e) => handleSearch(e)}
      />
      <div className="h-96 overflow-y-auto inputPred">
        <ul className="mt-2">
          {airportData.map((a, i) => (
            <li
              key={`${a.airport_code}-${a.city_id}`}
              className="p-2 flex"
              onClick={() => handleclick(a)}
            >
              <FaPlane className="text-xl mr-4 my-2" />
              <div>
                <h3 className="font-qs font-bold text-lg text-gray-800">
                  {" "}
                  {a.city_name}{" "}
                  <span className="font-light"> ({a.airport_code})</span>
                </h3>
                <p>{a.airport_name}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
