import React from "react";
import Flightsearch from "../../Components/FlightSearchBox/Flightsearch.components";
import FAQs from "../../Components/Home/FAQs";
import Advt from "../../Components/Home/Advt";
import TopCity from "../../Components/Home/TopCity";

export default function HomeDesktop() {
  return (
    <div>
      <div>
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 p-16">
          <h1 className="font-bold font-qs text-white text-xl text-center">
            {" "}
            International & Domestic Cheap Flights Search{" "}
          </h1>
        </div>
        <Flightsearch />
      </div>
      <Advt />
      <TopCity />
      <FAQs />
    </div>
  );
}
