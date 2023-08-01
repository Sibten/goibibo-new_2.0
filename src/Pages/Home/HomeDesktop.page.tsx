import React from "react";
import Flightsearch from "../../Components/Flight/Flightsearch.components";
import FAQs from "../../Components/Home/FAQs";
import Advt from "../../Components/Home/Advt";

export default function HomeDesktop() {
  return (
    <div>
      <div>
        <div className="title-bg p-16">
          <h1 className="font-bold font-qs text-white text-xl text-center">
            {" "}
            Domestic and International Flights{" "}
          </h1>
        </div>
        <Flightsearch />
      </div>
      <Advt />
      <FAQs />
    </div>
  );
}
