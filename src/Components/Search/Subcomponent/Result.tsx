import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import SearchCard from "./SearchCard";
import {
  Filter,
  ResultBase,
  ResultData,
  SearchParamsType,
  SearchType,
} from "../../../Types";
import { calFare } from "../../../Helper/Method";
import NotFound from "./NotFound";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import SelectionCard from "./SelectionCard";

export default function Result({ filter }: { filter: Filter }) {
  const [result, setResult] = useState<Array<ResultBase>>([]);
  const [returnResult, setReturnResult] = useState<Array<ResultBase>>([]);
  const selector = useSelector((state: RootState) => state.Result.data);
  const SearchParms = useSelector((state: RootState) => state.SearchParms);

  useEffect(() => {
    setResult(
      selector.dep.filter((s) => {
        let fare = calFare(
          s.route_id.distance,
          { basicfare: s.fare.fare, tax: s.fare.tax },
          SearchParms.class,
          s.route_id.stops.length,
          s.available_seats,
          SearchParms.dept_date
        );
        let total = fare.basic + fare.tax;
        if (
          new Date(s.timing[0].source_time) >=
            new Date(
              new Date(s.timing[0].destination_time).setHours(filter.dep.time1)
            ) &&
          new Date(s.timing[0].source_time) <
            new Date(
              new Date(s.timing[0].destination_time).setHours(filter.dep.time2)
            ) &&
          (filter.dep.stops == 3 ? s.route_id.stops.length > 3 : true) &&
          (filter.dep.stops == -1
            ? true
            : s.route_id.stops.length == filter.dep.stops) &&
          (filter.dep.airline.length == 0
            ? true
            : filter.dep.airline.includes(s.airline_id.airline_code)) &&
          total <= filter.dep.max &&
          total >= filter.dep.min
        ) {
          return true;
        } else return false;
      })
    );

    setReturnResult(
      selector.rtn?.filter((s) => {
        let fare = calFare(
          s.route_id.distance,
          { basicfare: s.fare.fare, tax: s.fare.tax },
          SearchParms.class,
          s.route_id.stops.length,
          s.available_seats,
          SearchParms.return_date!
        );
        let total = fare.basic + fare.tax;
        if (
          new Date(s.timing[0].source_time) >=
            new Date(
              new Date(s.timing[0].destination_time).setHours(filter.rtn.time1)
            ) &&
          new Date(s.timing[0].source_time) <
            new Date(
              new Date(s.timing[0].destination_time).setHours(filter.rtn.time2)
            ) &&
          (filter.rtn.stops == 3 ? s.route_id.stops.length > 3 : true) &&
          (filter.rtn.stops == -1
            ? true
            : s.route_id.stops.length == filter.rtn.stops) &&
          (filter.rtn.airline.length == 0
            ? true
            : filter.rtn.airline.includes(s.airline_id.airline_code)) &&
          total <= filter.rtn.max &&
          total >= filter.rtn.min
        ) {
          return true;
        } else return false;
      }) ?? []
    );
  }, [filter]);

  const [selectedFlight, setSelectedFlight] = useState<{
    from?: ResultBase;
    to?: ResultBase;
  }>();

  const handleCallBack = (flight: ResultBase, type: number) => {
    if (type == SearchType.From) {
      setSelectedFlight({ ...selectedFlight, from: flight });
    } else {
      setSelectedFlight({ ...selectedFlight, to: flight });
    }
  };

  useEffect(() => {
    console.log(selectedFlight);
  }, [selectedFlight]);

  const rtnRslt = selector.rtn && SearchParms.return_date ? <NotFound /> : "";

  return (
    <div className="mx-auto">
      {selectedFlight ? <SelectionCard data={selectedFlight} /> : ""}
      <div className="flex flex-wrap">
        <div className="lg:w-1/2 w-full lg:h-max">
          <div className="mx-4">
            <h1 className="flex font-bold text-sm font-qs">
              {SearchParms.from.city_name}{" "}
              <HiOutlineArrowNarrowRight className="my-1 mx-2" />
              {SearchParms.to.city_name}
            </h1>
            <p className="text-xs">Showing {result.length} Flights</p>
          </div>
          {result.length > 0 ? (
            <>
              {result.map((res) => {
                return (
                  <SearchCard
                    seat={res.available_seats}
                    type={SearchType.From}
                    value={res}
                    callBack={handleCallBack}
                    key={`${res.flight_no}-${res.timing[0].source_time}`}
                  />
                );
              })}{" "}
            </>
          ) : (
            <NotFound />
          )}
        </div>
        <div className="w-max">
          {selector.rtn && SearchParms.return_date ? (
            <div className="mx-4">
              <h1 className="flex font-bold text-sm font-qs">
                {SearchParms.to.city_name}{" "}
                <HiOutlineArrowNarrowRight className="my-1 mx-2" />
                {SearchParms.from.city_name}
              </h1>
              <p className="text-xs">Showing {returnResult.length} Flights</p>
            </div>
          ) : (
            ""
          )}
          {returnResult.length > 0 && SearchParms.return_date ? (
            <>
              {returnResult.map((res) => (
                <SearchCard
                  value={res}
                  callBack={handleCallBack}
                  type={SearchType.To}
                  key={`${res.flight_no}-${res.timing[0].source_time}`}
                />
              ))}
            </>
          ) : (
            rtnRslt
          )}
        </div>
      </div>
    </div>
  );
}
