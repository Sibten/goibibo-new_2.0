import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import SearchCard from "./SearchCard";
import { Filter, ResultBase } from "../../../Types";
import { calFare } from "../../Helper/Method";

export default function Result({ filter }: { filter: Filter }) {
  const [result, setResult] = useState<Array<ResultBase>>([]);
  const selector = useSelector((state: RootState) => state.Result.data);
  const SearchParms = useSelector((state: RootState) => state.SearchParms);

  useEffect(() => {
    if (selector.length > 0) {
      setResult(
        selector.filter((s) => {
          let fare = calFare(
            s.route_id.distance,
            s.fare.fare,
            s.fare.tax,
            SearchParms.class,
            s.route_id.stops.length
          );
          let total = fare.basic + fare.tax;
          if (
            new Date(s.timing.source_time) >=
              new Date(
                new Date(s.timing.destination_time).setHours(filter.time1)
              ) &&
            new Date(s.timing.source_time) <
              new Date(
                new Date(s.timing.destination_time).setHours(filter.time2)
              ) &&
            (filter.stops == 3 ? s.route_id.stops.length > 3 : true) &&
            (filter.stops == -1
              ? true
              : s.route_id.stops.length == filter.stops) &&
            (filter.airline.length == 0
              ? true
              : filter.airline.includes(s.airline_id.airline_code)) &&
            total <= filter.max &&
            total >= filter.min
          ) {
            return true;
          } else return false;
        })
      );
    }
  }, [filter]);

  return (
    <div>
      {result.length != 0 ? (
        <>
          <p className="mx-4 text-xs">Showing {result.length} flights</p>
          {result.map((res) => (
            <SearchCard value={res} key={res.flight_no} />
          ))}{" "}
        </>
      ) : (
        <div className="w-max my-4 flex">
          <img
            src="https://res.cloudinary.com/dgsqarold/image/upload/v1688817720/Goibibo/42735_fhxgwb.png"
            alt="sad"
            className="w-8 h-8 mx-4 my-2 opacity-50"
          />
          <div>
            <p className="text-gray-700">
              Sorry! we couldn't find flights on this route!{" "}
            </p>
            <p className="text-xs text-gray-500">
              {" "}
              Try with new search params{" "}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
