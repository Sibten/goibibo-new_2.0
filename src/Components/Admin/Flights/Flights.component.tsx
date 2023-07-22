import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import { FaInfo, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { ResultBase } from "../../../Types";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import ScheduledFlightComponent from "./ScheduledFlight.component";
import SeatFlightComponent from "./Seat.component";

export default function Flightscomponent({
  data,
}: {
  data: Array<ResultBase>;
}) {
  const [active, setActive] = React.useState(0);
  let pageData: Array<Array<ResultBase>> = [];
  let pageLength = 10;

  const [mainData, setMainData] = useState<Array<ResultBase>>([...data]);

  for (let i = 0; i < mainData.length; i += pageLength) {
    let pgData = mainData.slice(i, i + pageLength);
    pageData.push(pgData);
  }

  const next = () => {
    if (active === Math.floor(pageData.length / pageLength)) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 0) return;

    setActive(active - 1);
  };
  return (
    <div className="m-2">
      <div className="w-24 flex">
        <div className="mx-2">
          <Input
            type="search"
            label="Search By ID"
            onChange={(e) => {
              if (e.target.value == "") setMainData([...data]);
              setMainData(
                data.filter((s) => s.flight_no.includes(e.target.value))
              );
            }}
          />
        </div>
      </div>
      <div className="my-1">
        <h1 className="font-bold"> Flights </h1>
        <small>
          Showing {pageData[active] ? pageData[active].length : 0} out of{" "}
          {data.length ?? 0} Flights
        </small>
      </div>
      <div className="overflow-x-auto w-full max-h-[24rem]">
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
              <th> Total Distance </th>
              <th> Info</th>
            </tr>
          </thead>
          <tbody>
            {pageData[active]
              ? pageData[active].map((s) => (
                  <tr key={s.flight_no}>
                    <td> {s.flight_no} </td>
                    <td> {s.airbus_id.airbus_code} </td>
                    <td> {s.airline_id.airline_name} </td>
                    <td> {s.route_id.route_id}</td>
                    <td> {s.route_id.source_city.city_name}</td>
                    <td>{s.route_id.source_city.airport_name}</td>
                    <td> {s.route_id.destination_city.city_name}</td>
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
          Page <strong className="text-blue-gray-900">{active + 1}</strong> of{" "}
          <strong className="text-blue-gray-900">{pageData.length}</strong>
        </Typography>
        <IconButton
          size="sm"
          variant="outlined"
          color="blue-gray"
          onClick={next}
          disabled={active === Math.floor(pageData.length / pageLength)}
        >
          <BiRightArrow strokeWidth={2} className="h-4 w-4" />
        </IconButton>
      </div>
    </div>
  );
}
