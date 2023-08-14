import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import { FaInfo, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { ResultBase } from "../../../../Types";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import ScheduledFlightComponent from "./ScheduledFlight.component";
import SeatFlightComponent from "./Seat.component";
import {
  BsArrowUp,
  BsChevronBarUp,
  BsChevronDown,
  BsChevronUp,
  BsSortAlphaDown,
} from "react-icons/bs";

export default function Flightscomponent({
  data,
}: {
  data: Array<ResultBase>;
}) {
  const [active, setActive] = React.useState(0);
  let [mainData, setMainData] = useState<Array<ResultBase>>([]);
  let [pageData, setPageData] = useState<Array<Array<ResultBase>>>([[]]);
  let pageLength = 5;
  useEffect(() => {
    mainData.splice(0, mainData.length);
    mainData.push(...data);
    setMainData([...mainData]);
  }, [data]);

  useEffect(() => {
    if (mainData.length > 0) {
      pageData.splice(0, pageData.length);
      for (let i = 0; i < mainData.length; i += pageLength) {
        let pgData = mainData.slice(i, i + pageLength);
        pageData.push(pgData);
      }
      setPageData([...pageData]);
    }
    // //  console.log(
    //   active,
    //   pageData.length,
    //   pageLength
    //   // Math.floor(pageData.length / pageLength)
    // );
  }, [mainData]);
  const next = () => {
    if (active === Math.floor(pageData.length)) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 0) return;

    setActive(active - 1);
  };

  const [sortedUpDis, setSortedUpDis] = useState<boolean>(false);
  const [sortedDwnDis, setSortedDwnDis] = useState<boolean>(false);

  const setSortedUpByDis = () => {
    if (!sortedUpDis) {
      setSortedUpDis(true);
      setSortedDwnDis(false);
      const sortedData = mainData.sort(
        (d1: ResultBase, d2: ResultBase) =>
          d1.route_id.distance - d2.route_id.distance
      );
      setMainData([...sortedData]);
    } else {
      setSortedDwnDis(false);
      setSortedUpDis(false);
      setMainData([...data]);
    }
  };
  const setSortedDwnByDis = () => {
    if (!sortedDwnDis) {
      setSortedDwnDis(true);
      setSortedUpDis(false);
      const sortedData = mainData.sort(
        (d1: ResultBase, d2: ResultBase) =>
          d2.route_id.distance - d1.route_id.distance
      );
      setMainData([...sortedData]);
    } else {
      setSortedDwnDis(false);
      setSortedUpDis(false);
      setMainData([...data]);
    }
  };

  return (
    <div className="m-2">
      <div className="w-24 flex">
        <div className="mx-2">
          <Input
            type="search"
            label="Source City"
            onChange={(e) => {
              if (e.target.value == "") setMainData([...data]);
              else {
                let opdata = data.filter((s) =>
                  s.route_id.source_city.city_name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                );
                setMainData([...opdata]);
              }
            }}
          />
        </div>
        {/* <div className="mx-2">
          <select>
            <option>AB-205</option>
          </select>
        </div> */}
      </div>
      <div className="my-1">
        <h1 className="font-bold"> Flights </h1>
        <small>
          Showing {pageData[active] ? pageData[active].length : 0} out of
          {data.length ?? 0} Flights
        </small>
      </div>
      <div className="overflow-x-auto w-full max-h-[30rem] px-8">
        <table className="table-auto w-full text-gray-800">
          <thead>
            <tr>
              <th>Flight Number </th>
              <th> Airbus </th>
              <th>Airline </th>
              <th> Route ID</th>
              <th> Source City </th>
              <th> Source Airport Name</th>
              <th> Destination City </th>
              <th> Destination Airport Name </th>
              <th className="flex items-center">
                {" "}
                Total Distance{" "}
                <span>
                  <BsChevronUp
                    className={`${
                      sortedUpDis ? "text-indigo-600 " : "text-black"
                    } ${sortedDwnDis ? "text-gray-400" : ""} cursor-pointer`}
                    onClick={() => setSortedUpByDis()}
                  />{" "}
                  <BsChevronDown
                    className={`${sortedUpDis ? "text-gray-400 " : ""} ${
                      sortedDwnDis ? "text-indigo-600" : "text-black"
                    } cursor-pointer`}
                    onClick={() => setSortedDwnByDis()}
                  />
                </span>
              </th>
              <th> Info</th>
            </tr>
          </thead>
          <tbody className="">
            {pageData[active]
              ? pageData[active].map((s) => (
                  <tr key={s.flight_no}>
                    <td>{s.flight_no}</td>
                    <td>{s.airbus_id.airbus_code}</td>
                    <td>{s.airline_id.airline_name}</td>
                    <td>{s.route_id.route_id}</td>
                    <td>{s.route_id.source_city.city_name}</td>
                    <td>{s.route_id.source_city.airport_name}</td>
                    <td>{s.route_id.destination_city.city_name}</td>
                    <td>{s.route_id.destination_city.airport_name}</td>
                    <td>{Math.floor(s.route_id.distance)} km</td>
                    <td>
                      <ScheduledFlightComponent data={s} />
                      <SeatFlightComponent data={s} />
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
      </div>
      <div className="flex items-center gap-8 my-2">
        <IconButton
          size="sm"
          variant="outlined"
          color="blue-gray"
          onClick={prev}
          disabled={active === 0}
        >
          <BiLeftArrow strokeWidth={2} className="h-4 w-4" />
        </IconButton>
        <Typography color="gray" className="font-normal">
          Page <strong className="text-blue-gray-900">{active + 1}</strong>{" "}
          of&nbsp;
          <strong className="text-blue-gray-900">{pageData.length}</strong>
        </Typography>
        <IconButton
          size="sm"
          variant="outlined"
          color="blue-gray"
          onClick={next}
          disabled={active + 1 === Math.floor(pageData.length)}
        >
          <BiRightArrow strokeWidth={2} className="h-4 w-4" />
        </IconButton>
      </div>
    </div>
  );
}
