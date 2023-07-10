import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Airline, AirportType, Filter } from "../../../Types";
import { GrPowerReset } from "react-icons/gr";
import { calFare } from "../../Helper/Method";


export const defFilter: Filter = {
  dep: {
    time1: 0,
    time2: 24,
    stops: -1,
    airline: [],
    min: 0,
    max: 0,
  },
  rtn: {
    time1: 0,
    time2: 24,
    stops: -1,
    airline: [],
    min: 0,
    max: 0,
  },
};
export default function FliterCard({ callback }: { callback: Function }) {
  const selector = useSelector((state: RootState) => state.Result.data);
  const SearchParams = useSelector((state: RootState) => state.SearchParms);

  const [filter, setFilter] = useState<Filter>(defFilter);
  const [airlines, setAirlines] = useState<Array<Airline>>([]);
  const [rtnAirlines, setRtnAirlines] = useState<Array<Airline>>([]);

  let max = Number.MIN_SAFE_INTEGER;
  let rtnmax = Number.MIN_SAFE_INTEGER;
  let min = Number.MAX_SAFE_INTEGER;
  let rtnmin = Number.MAX_SAFE_INTEGER;

  useEffect(() => {
    selector.dep.forEach((s) => {
      let fare = calFare(
        s.route_id.distance,
        s.fare.fare,
        s.fare.tax,
        SearchParams.class,
        s.route_id.stops.length
      );
      max = Math.max(max, fare.basic + fare.tax);
      min = Math.min(min, fare.basic + fare.tax);
      if (!airlines.some((i) => i.airline_code == s.airline_id.airline_code)) {
        airlines.push(s.airline_id);
      }
    });

    selector.rtn?.map((s) => {
      let fare = calFare(
        s.route_id.distance,
        s.fare.fare,
        s.fare.tax,
        SearchParams.class,
        s.route_id.stops.length
      );
      rtnmax = Math.max(rtnmax, fare.basic + fare.tax);
      rtnmin = Math.min(rtnmin, fare.basic + fare.tax);
      if (
        !rtnAirlines.some((i) => i.airline_code == s.airline_id.airline_code)
      ) {
        rtnAirlines.push(s.airline_id);
      }
    });

    min = min == Number.MAX_SAFE_INTEGER ? 0 : min;
    rtnmin = rtnmin == Number.MAX_SAFE_INTEGER ? 0 : rtnmin;
    max = max == Number.MIN_SAFE_INTEGER ? 0 : max;
    rtnmax = rtnmax == Number.MIN_SAFE_INTEGER ? 0 : rtnmax;
    setFilter({ ...filter, dep: { ...filter.dep, min: min, max: max } });
    setFilter({ ...filter, rtn: { ...filter.rtn, min: rtnmin, max: rtnmax } });
    setAirlines([...airlines]);
    defFilter.dep.min = min;
    defFilter.dep.max = max;
    defFilter.rtn.min = rtnmin;
    defFilter.rtn.max = rtnmax;
  }, [selector, SearchParams]);

  useEffect(() => {
    callback(filter);
  }, [filter]);

  return (
    <div className="py-2 pl-2">
      <div className="bg-white rounded-md p-2 shadow-md font-arial">
        <form>
          <div className="border-b">
            <div className="flex justify-between mx-2">
              <h1 className="font-bold text-xl ">Filters </h1>
              <div className="mt-2">
                {" "}
                <button
                  type="reset"
                  onClick={(e) => setFilter({ ...defFilter })}
                >
                  {" "}
                  <GrPowerReset type="reset" />{" "}
                </button>
              </div>
            </div>
            <small className="text-gray-500 mx-2 -mt-2">
              Showing {selector.dep.length + selector.rtn?.length!} flights
            </small>
          </div>

          <div className="my-2 border-b">
            <h1 className="font-bold"> Departure </h1>
            <div className="text-sm my-4">
              <span className="mx-2">
                {" "}
                <input
                  type="radio"
                  name="time"
                  id="dep_b_6am"
                  onChange={() =>
                    setFilter({
                      ...filter,
                      dep: { ...filter.dep, time1: 0, time2: 6 },
                    })
                  }
                />{" "}
                <label> Before 6 AM </label>
              </span>
              <span className="mx-2">
                {" "}
                <input
                  type="radio"
                  name="time"
                  id="6am_12pm"
                  onChange={() =>
                    setFilter({
                      ...filter,
                      dep: { ...filter.dep, time1: 6, time2: 12 },
                    })
                  }
                />{" "}
                <label> 6AM - 12PM </label>
              </span>
              <span className="mx-2">
                {" "}
                <input
                  type="radio"
                  name="time"
                  id="12pm_6pm"
                  onChange={() =>
                    setFilter({
                      ...filter,
                      dep: { ...filter.dep, time1: 12, time2: 18 },
                    })
                  }
                />{" "}
                <label> 12PM - 6PM </label>
              </span>
              <span className="mx-2">
                {" "}
                <input
                  type="radio"
                  name="time"
                  id="12pm_6pm"
                  onChange={() =>
                    setFilter({
                      ...filter,
                      dep: { ...filter.dep, time1: 18, time2: 24 },
                    })
                  }
                />{" "}
                <label> After 6 PM </label>
              </span>
            </div>
          </div>
          {selector.rtn ? (
            <div className="my-2 border-b">
              <h1 className="font-bold"> Return </h1>
              <div className="text-sm my-4">
                <span className="mx-2">
                  {" "}
                  <input
                    type="radio"
                    name="rtn_time"
                    id="rtn_dep_b_6am"
                    onChange={() =>
                      setFilter({
                        ...filter,
                        rtn: { ...filter.rtn, time1: 0, time2: 6 },
                      })
                    }
                  />{" "}
                  <label> Before 6 AM </label>
                </span>
                <span className="mx-2">
                  {" "}
                  <input
                    type="radio"
                    name="rtn_time"
                    id="rtn_6am_12pm"
                    onChange={() =>
                      setFilter({
                        ...filter,
                        rtn: { ...filter.rtn, time1: 6, time2: 12 },
                      })
                    }
                  />{" "}
                  <label> 6AM - 12PM </label>
                </span>
                <span className="mx-2">
                  {" "}
                  <input
                    type="radio"
                    name="rtn_time"
                    id="rtn_12pm_6pm"
                    onChange={() =>
                      setFilter({
                        ...filter,
                        rtn: { ...filter.rtn, time1: 12, time2: 18 },
                      })
                    }
                  />{" "}
                  <label> 12PM - 6PM </label>
                </span>
                <span className="mx-2">
                  {" "}
                  <input
                    type="radio"
                    name="rtn_time"
                    id="rtn_12pm_6pm"
                    onChange={() =>
                      setFilter({
                        ...filter,
                        rtn: { ...filter.rtn, time1: 18, time2: 24 },
                      })
                    }
                  />{" "}
                  <label> After 6 PM </label>
                </span>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="my-2 border-b">
            <h1 className="font-bold"> Departure Stops </h1>
            <div className="text-sm my-4">
              <span className="mx-2">
                {" "}
                <input
                  type="radio"
                  name="stop"
                  id="non_stop"
                  onChange={() =>
                    setFilter({ ...filter, dep: { ...filter.dep, stops: 0 } })
                  }
                />{" "}
                <label> Non Stop</label>
              </span>
              <span className="mx-2">
                {" "}
                <input
                  type="radio"
                  name="stop"
                  id="one_stop"
                  onChange={() =>
                    setFilter({ ...filter, dep: { ...filter.dep, stops: 1 } })
                  }
                />{" "}
                <label> 1 Stop </label>
              </span>
              <span className="mx-2">
                {" "}
                <input
                  type="radio"
                  name="stop"
                  id="two_stop"
                  onChange={() =>
                    setFilter({ ...filter, dep: { ...filter.dep, stops: 2 } })
                  }
                />{" "}
                <label> 2 Stops</label>
              </span>
              <span className="mx-2">
                {" "}
                <input
                  type="radio"
                  name="stop"
                  id="multi_Stop"
                  onChange={() =>
                    setFilter({ ...filter, dep: { ...filter.dep, stops: 3 } })
                  }
                />{" "}
                <label> 2+ Stops </label>
              </span>
            </div>
          </div>
          {selector.rtn ? (
            <>
              {" "}
              <div className="my-2 border-b">
                <h1 className="font-bold"> Return Stops </h1>
                <div className="text-sm my-4">
                  <span className="mx-2">
                    {" "}
                    <input
                      type="radio"
                      name="rtn_stop"
                      id="rtn_non_stop"
                      onChange={() =>
                        setFilter({
                          ...filter,
                          rtn: { ...filter.rtn, stops: 0 },
                        })
                      }
                    />{" "}
                    <label> Non Stop</label>
                  </span>
                  <span className="mx-2">
                    {" "}
                    <input
                      type="radio"
                      name="rtn_stop"
                      id="rtn_one_stop"
                      onChange={() =>
                        setFilter({
                          ...filter,
                          rtn: { ...filter.rtn, stops: 1 },
                        })
                      }
                    />{" "}
                    <label> 1 Stop </label>
                  </span>
                  <span className="mx-2">
                    {" "}
                    <input
                      type="radio"
                      name="rtn_stop"
                      id="rtn_two_stop"
                      onChange={() =>
                        setFilter({
                          ...filter,
                          rtn: { ...filter.rtn, stops: 2 },
                        })
                      }
                    />{" "}
                    <label> 2 Stops</label>
                  </span>
                  <span className="mx-2">
                    {" "}
                    <input
                      type="radio"
                      name="rtn_stop"
                      id="rtn_multi_Stop"
                      onChange={() =>
                        setFilter({
                          ...filter,
                          rtn: { ...filter.rtn, stops: 3 },
                        })
                      }
                    />{" "}
                    <label> 2+ Stops </label>
                  </span>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          <div className="my-2 border-b">
            <h1 className="font-bold">Departure Price </h1>
            <div className="w-full">
              <div>
                <label className="text-sm">
                  {" "}
                  Minimum (&#8377; {filter.dep.min}){" "}
                </label>
                <input
                  type="range"
                  className="w-full transparent  border-2 cursor-pointer rounded-lg border-transparent bg-neutral-200"
                  name="min_range"
                  id="minRange"
                  step={100}
                  min={defFilter.dep.min}
                  max={defFilter.dep.max}
                  value={filter.dep.min}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      dep: { ...filter.dep, min: parseInt(e.target.value) },
                    })
                  }
                />
              </div>
              <div>
                <label className="text-sm">
                  {" "}
                  Maximum (&#8377; {filter.dep.max})
                </label>
                <input
                  type="range"
                  className="w-full transparent  border-2 cursor-pointer rounded-lg border-transparent bg-neutral-200"
                  name="mx_range"
                  id="maxRange"
                  step={100}
                  value={filter.dep.max}
                  min={defFilter.dep.min}
                  max={defFilter.dep.max + 100}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      dep: { ...filter.dep, max: parseInt(e.target.value) },
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="my-2 border-b">
            <h1 className="font-bold"> Return Price </h1>
            <div className="w-full">
              <div>
                <label className="text-sm">
                  {" "}
                  Minimum (&#8377; {filter.rtn.min}){" "}
                </label>
                <input
                  type="range"
                  className="w-full transparent  border-2 cursor-pointer rounded-lg border-transparent bg-neutral-200"
                  name="rtn_min_range"
                  id="rtn_minRange"
                  step={100}
                  min={defFilter.rtn.min}
                  max={defFilter.rtn.max}
                  value={filter.rtn.min}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      rtn: { ...filter.rtn, min: parseInt(e.target.value) },
                    })
                  }
                />
              </div>
              <div>
                <label className="text-sm">
                  {" "}
                  Maximum (&#8377; {filter.rtn.max})
                </label>
                <input
                  type="range"
                  className="w-full transparent  border-2 cursor-pointer rounded-lg border-transparent bg-neutral-200"
                  name="rtn_mx_range"
                  id="rtn_maxRange"
                  step={100}
                  value={filter.rtn.max}
                  min={defFilter.rtn.min}
                  max={defFilter.rtn.max + 100}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      rtn: { ...filter.rtn, max: parseInt(e.target.value) },
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="my-2 ">
            <h1 className="font-bold"> Airlines </h1>
            <div className="my-2">
              {airlines.map((a) => (
                <span className="mx-2" key={a.airline_code}>
                  {" "}
                  <input
                    type="checkbox"
                    name="airlines"
                    id={a.airline_code}
                    onChange={(e) => {
                      if (e.target.checked) {
                        filter.dep.airline.push(e.target.id);
                        setFilter({ ...filter });
                      } else {
                        let find = filter.dep.airline.findIndex(
                          (s) => s == e.target.id
                        );
                        filter.dep.airline.splice(find, 1);
                        setFilter({ ...filter });
                      }
                    }}
                  />{" "}
                  <label> {a.airline_name}</label>
                </span>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
