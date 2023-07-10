import React, { useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { ResultBase, SearchParamsType, SearchType } from "../../../Types";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import ExtraInfo from "./ExtraInfo";
import {
  calDuration,
  calFare,
  time,
  date,
  getStops,
} from "../../Helper/Method";
import { defFilter } from "./FliterCard";
import { Radio } from "@material-tailwind/react";

export default function SearchCard({
  value,
  type,
  callBack,
}: {
  value: ResultBase;
  type: number;
  callBack: Function;
}) {
  const [openDetails, setOpenDetails] = useState(false);
  const SearchParams = useSelector((state: RootState) => state.SearchParms);
  const Result = useSelector((state: RootState) => state.Result);

  if (value) {
    const Flightfare = calFare(
      value.route_id.distance,
      value.fare.fare,
      value.fare.tax,
      SearchParams.class,
      value.route_id.stops.length
    );
    return (
      <div className="">
        <div className="bg-white my-4 p-2 mx-4 rounded-md shadow-md transition-all duration-200 relative overflow-hidden z-0">
          <div className="absolute right-0">
            {(type == SearchType.From &&
              defFilter.dep.min == Flightfare.basic + Flightfare.tax) ||
            (type == SearchType.To &&
              defFilter.rtn.min == Flightfare.basic + Flightfare.tax) ? (
              <div className="bg-green-700 text-sm rounded-bl-lg font-bold text-white p-1 -mt-2">
                Cheapest
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flex">
            {" "}
            <img
              src={value.airline_id.airline_icon}
              alt="airline"
              className="w-16 h-10"
            />
            <span className="mt-2 mx-2">{value.airline_id.airline_name}</span>
          </div>
          <div className="flex justify-between mx-8 my-4">
            <div>
              <p className="text-gray-600 font-bold text-xs">
                {value.route_id.source_city.airport_code}{" "}
                <span className="text-gray-500 font-normal">
                  {value.route_id.source_city.city_name}
                </span>
              </p>
              <h3 className="font-bold text-xl mx-2 mt-2">
                {" "}
                {time(value.timing[0].source_time)}
              </h3>
              <span className="text-xs text-gray-500 mx-1">
                {date(value.timing[0].source_time)}
              </span>
            </div>
            <div>
              <p className="text-gray-500 text-xs">
                {" "}
                {value.route_id.stops.length > 0
                  ? getStops(value.route_id.stops)
                  : "- Non Stop -"}{" "}
              </p>
              <h3 className="font-bold text-xl mt-2">
                {" "}
                {calDuration(
                  value.timing[0].source_time,
                  value.timing[0].destination_time
                )}{" "}
              </h3>
            </div>
            <div>
              <p className="text-gray-600 font-bold text-xs">
                {value.route_id.destination_city.airport_code}{" "}
                <span className="text-gray-500 font-normal">
                  {value.route_id.destination_city.city_name}
                </span>
              </p>
              <h3 className="font-bold text-xl mx-2 mt-2">
                {" "}
                {time(value.timing[0].destination_time)}{" "}
              </h3>
              <span className="text-xs text-gray-500 mx-1">
                {date(value.timing[0].destination_time)}
              </span>
            </div>
            <div>
              <p className="text-gray-500 text-xs"> Fare </p>
              <h1 className="text-xl font-bold mt-2">
                {" "}
                &#8377; {Flightfare.basic + Flightfare.tax}{" "}
              </h1>
            </div>

            <div>
              {Result.data.rtn?.length ? (
                <Radio
                  name={type.toString()}
                  onChange={(e) => {
                    if (e.target.checked) callBack(value, type);
                  }}
                />
              ) : (
                <button className="font-bold uppercase bg-blue-700 rounded-md text-white px-6 p-2 text-xs shadow-md">
                  Book
                </button>
              )}
            </div>
          </div>
          <div className="w-max ml-auto">
            <button onClick={() => setOpenDetails(!openDetails)}>
              {" "}
              <small className="flex capitalize text-blue-700 font-bold">
                {" "}
                Flight details{" "}
                {openDetails ? (
                  <BiChevronUp className="mt-1 mx-1" />
                ) : (
                  <BiChevronDown className="mt-1 mx-1" />
                )}
              </small>{" "}
            </button>
          </div>
          {openDetails ? (
            <ExtraInfo value={value} fclass={SearchParams.class} />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>No Flight Found!</h1>
      </div>
    );
  }
}
