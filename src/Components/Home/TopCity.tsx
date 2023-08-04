import React from "react";
import city from "../../Data/City.json";
import { Link } from "react-router-dom";

export default function TopCity() {
  return (
    <div className="lg:w-[60%] mx-auto  my-8">
      <h1 className="font-qs font-bold text-xl">
        {" "}
        Unlock Lesser-Known Wonders of India
      </h1>
      <div className="lg:w-full mx-auto p-2 overflow-auto">
        <div className="bg-white shadow-md w-max flex overflow-auto p-2 font-arial my-2">
          {city.cities.map((c) => (
            <div
              className="rounded-lg overflow-hidden relative w-max h-max group mx-4"
              key={c.id}
            >
              <Link
                to={`/flight/search/?from=BOM&to=${c.airport}&dep_date=${
                  new Date().toISOString().split("T")[0]
                }&class=0&adults=1&child=0&infants=0`}
              >
                <div className="absolute text-white bottom-0 p-2 w-full bg-black opacity-70 hidden group-hover:block">
                  <h1 className="font-bold text-sm">{c.name}</h1>
                  <p className="text-xs">{c.quotes}</p>
                </div>
                <img src={c.img} alt={c.name} className="w-64 h-48" />
              </Link>
            </div>
          ))}
        </div>
      </div>{" "}
    </div>
  );
}
