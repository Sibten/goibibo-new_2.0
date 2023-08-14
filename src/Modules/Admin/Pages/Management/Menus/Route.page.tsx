import React, { useEffect } from "react";
import Title from "../../../../User/Components/Utility/Title";
import BackToMenu from "../../../Components/Menus/BackToMenu";
import { Input } from "@material-tailwind/react";
import AirlineData from "../../../Components/Airline/AirlineData";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch, RootState } from "../../../../../store";
import { Route } from "../../../../../Types";
import { fetchRoutes } from "../../../../../Actions/Admin/Route.action";
import { getStops } from "../../../../../Helper/Method";
import AddRouteComponent from "../../../Components/Management/AddRoute.component";

export default function Routepage() {
  const routeSelector = useSelector((state: RootState) => state.Routes);
  const defaultRoute: Array<Route> = routeSelector.filter(
    (s) => s.added_by?.airline_code == "ADMN"
  );
  const airlineRoute = routeSelector.filter(
    (s) => s.added_by?.airline_code != "ADMN"
  );

  return (
    <div className=" pb-8">
      <Title text="Route Management" />
      <div className="border rounded-md  p-4 w-[36rem] mx-auto m-2">
        <BackToMenu />
        <div className="flex justify-between items-center">
          <AirlineData />
          <AddRouteComponent />
        </div>
        <div className="font-arial my-4">
          <h1 className="font-bold text-center text-lg">
            {" "}
            Active Route{" "}
            <small className="block -mt-2 font-normal">
              Operated by Airline
            </small>
          </h1>
          <div className="max-h-[14rem] overflow-auto text-sm">
            <ul className="my-4">
              <li className="grid grid-cols-5 font-bold">
                {" "}
                <span>Route ID</span>
                <span className="col-span-2">Route</span>
                <span>Stops</span>
                <span>Distance</span>
              </li>
              {airlineRoute.map((s) => (
                <li key={s.route_id} className="grid grid-cols-5 border-b my-1">
                  <span> {s.route_id}</span>
                  <span className="col-span-2">
                    {" "}
                    {s.source_city.city_name} - {s.destination_city.city_name}{" "}
                  </span>
                  <span>{getStops(s.stops)}</span>
                  <span>{Math.ceil(s.distance)} km</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="font-arial my-4">
          <h1 className="font-bold text-center text-lg">
            {" "}
            Active Route{" "}
            <small className="block -mt-2 font-normal">
              Operated by Admin Airline
            </small>
          </h1>
          <div className="h-[14rem] overflow-auto text-sm">
            <ul className="my-4">
              <li className="grid grid-cols-5 font-bold">
                {" "}
                <span>Route ID</span>
                <span className="col-span-2">Route</span>
                <span>Stops</span>
                <span>Distance</span>
              </li>
              {defaultRoute.map((s) => (
                <li key={s.route_id} className="grid grid-cols-5 border-b my-1">
                  <span> {s.route_id}</span>
                  <span className="col-span-2">
                    {" "}
                    {s.source_city.city_name} - {s.destination_city.city_name}{" "}
                  </span>
                  <span>{getStops(s.stops)}</span>
                  <span>{Math.ceil(s.distance)} km</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
