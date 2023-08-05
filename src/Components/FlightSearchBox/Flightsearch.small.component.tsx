import React, { useState } from "react";
import Title from "../Utility/Title";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Radio } from "@material-tailwind/react";
import { SearchParamsType } from "../../Types";
import Flightsearch from "./Flightsearch.components";

export default function Flightsearchsmall() {
  return (
    <div>
      <Title text="Domestic Cheap Flights" />
      <div>
        <Flightsearch />
      </div>
    </div>
  );
}
