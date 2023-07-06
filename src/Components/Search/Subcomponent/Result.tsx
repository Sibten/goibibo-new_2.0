import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import SearchCard from "./SearchCard";
import { Filter, ResultBase } from "../../../Types";
import { calFare } from "../../Helper/Method";

export default function Result({ filter }: { filter: Filter }) {
  const [result, setResult] = useState<Array<ResultBase>>([]);
  const selector = useSelector((state: RootState) => state.Result);
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
      <p className="mx-4 text-xs">Showing {result.length} flights</p>
      {result.map((result) => (
        <SearchCard value={result} key={result.timing.source_time} />
      ))}
    </div>
  );
}
