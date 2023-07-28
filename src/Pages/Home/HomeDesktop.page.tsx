import React from "react";
import Flightsearch from "../../Components/Flight/Flightsearch.components";
import FAQs from "../../Components/Home/FAQs";

export default function HomeDesktop() {
  return (
    <div>
      <div>
        <div className="bg-blue-600 p-16">
          <h1 className="font-bold font-qs text-white text-xl text-center">
            {" "}
            Domestic and International Flights{" "}
          </h1>
        </div>
        <Flightsearch />
      </div>
      <FAQs />
    </div>
  );
}
