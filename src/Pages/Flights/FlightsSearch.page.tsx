import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import axios from "axios";
import FlightSearchHead from "../../Components/Flight/FlightSearchHead.component";

export default function Flightspage() {
  const SearchParams = useSelector((state: RootState) => state.SearchParms);

  // useEffect(() => {
  //   const config = {
  //     method: "get",
  //     url: `http://localhost:5050/search/get_flights?start_point=${
  //       SearchParams.from.airport_code
  //     }&end_point=${SearchParams.to.airport_code}&date=${new Date(
  //       SearchParams.dept_date
  //     ).toDateString()}&class=${SearchParams.class}&people=${
  //       SearchParams.pepoles.adults + (SearchParams.pepoles.children ?? 0)
  //     }`,
  //     headers: {},
  //   };

  //   console.log(config);

  //   axios(config)
  //     .then(function (response) {
  //       console.log(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <div>
      <FlightSearchHead />
    </div>
  );
}
