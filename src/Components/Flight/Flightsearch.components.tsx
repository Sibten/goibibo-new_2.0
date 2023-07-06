import {
  Input,
  Menu,
  MenuHandler,
  MenuList,
  Radio,
} from "@material-tailwind/react";

import FlightInput from "./MainSubcomponents/CityInput";
import { BsArrowLeftRight } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  AirportType,
  CallBackType,
  Flighclass,
  SearchParamsType,
  SearchType,
  callTypes,
} from "../../Types";
import { useEffect, useState } from "react";
import { searchActions } from "../../Actions/Search.action";
import JouernyCalender from "./MainSubcomponents/JouernyCalender";
import FlightClass from "./MainSubcomponents/FlightClass";
import { useNavigate } from "react-router-dom";

export const ClassName = (no: number) => {
  switch (no) {
    case Flighclass.Economy:
      return "Economy";
    case Flighclass.FirstClass:
      return "First Class";
    case Flighclass.Business:
      return "Business";
    case Flighclass.PremiumEconomy:
      return "Premium Economy";
  }
};

export default function Flightsearch() {
  const SearchParams = useSelector((state: RootState) => state.SearchParms);
  const dispatch = useDispatch();
  const [openMenuFrom, setOpenMenuFrom] = useState(false);
  const [openMenuTo, setOpenMenuTo] = useState(false);
  const [openDateFrom, setOpenDateFrom] = useState(false);
  const [openDateTo, setOpenDateTo] = useState(false);
  const [openClass, setOpenClass] = useState(false);

  const [returnDate, setReturnDate] = useState(
    SearchParams.return_date ? true : false
  );

  const clickCallBack = (type: CallBackType) => {
    setOpenMenuFrom(false);
    setOpenMenuTo(false);
    setOpenDateFrom(false);
    setOpenDateTo(false);
    setOpenClass(false);
  };

  const clickSearchParams: SearchParamsType = { ...SearchParams };

  const adultsSpelling = SearchParams.pepoles.adults > 1 ? "Adults" : "Adult";
  const childernSpelling =
    SearchParams.pepoles.children! > 1 ? "Children" : "Child";

  const navigate = useNavigate();

  const retnDateDef = () => {
    return new Date(
      new Date(SearchParams.dept_date).setDate(
        new Date(SearchParams.dept_date).getDate() + 1
      )
    );
  };

  const searchFlight = () => {
    let url = "";
    if (!clickSearchParams.return_date) {
      clickSearchParams.return_date = retnDateDef().toISOString().split("T")[0];
    }
    if (returnDate) {
      url = `?from=${SearchParams.from.airport_code}&to=${
        SearchParams.to.airport_code
      }&dep_date=${SearchParams.dept_date}&rtn_date=${
        SearchParams.return_date ?? clickSearchParams.return_date
      }&class=${SearchParams.class}&adults=${
        SearchParams.pepoles.adults
      }&child=${SearchParams.pepoles.children}&infants=${
        SearchParams.pepoles.infants
      }`;
    } else {
      url = `?from=${SearchParams.from.airport_code}&to=${SearchParams.to.airport_code}&dep_date=${SearchParams.dept_date}&class=${SearchParams.class}&adults=${SearchParams.pepoles.adults}&child=${SearchParams.pepoles.children}&infants=${SearchParams.pepoles.infants}`;
    }
    navigate(`/flight/search/${url}`);
  };

  return (
    <div className="bg-white shadow-md  lg:w-[60%] rounded-lg p-8 mx-auto -mt-8 relative">
      <div className="font-qs font-bold text-gray-600">
        <span>
          {" "}
          <Radio
            id="blue"
            name="color"
            color="blue"
            defaultChecked={SearchParams.return_date ? false : true}
            onChange={() => {
              clickSearchParams.return_date = undefined;

              setReturnDate(false);
            }}
          />{" "}
          <label className="text-lg">One way</label>
        </span>
        <span>
          {" "}
          <Radio
            id="blue"
            name="color"
            color="blue"
            defaultChecked={SearchParams.return_date ? true : false}
            onChange={() => {
              setReturnDate(true);
              clickSearchParams.return_date =
                SearchParams.return_date ??
                new Date(
                  new Date().setDate(
                    new Date(SearchParams.dept_date).getDate() + 1
                  )
                ).toISOString();
            }}
          />{" "}
          <label className="text-lg">Round Trip</label>
        </span>
      </div>
      <div className="flex my-4 flex-wrap">
        <div className="w-max flex">
          <div className="rounded-lg border p-2 px-4 w-60 h-16 font-qs font-bold mx-4 my-2">
            <Menu open={openMenuFrom} handler={setOpenMenuFrom}>
              <MenuHandler>
                <div className="text-lg" onClick={() => setOpenMenuFrom(true)}>
                  <label className="absolute bg-white mx-2 text-xs -mt-4 px-2 h-max text-gray-500">
                    FROM
                  </label>{" "}
                  {SearchParams.from.city_name}
                  <p className="text-xs text-gray-500 font-arial font-light truncate">
                    {SearchParams.from.airport_code},
                    {SearchParams.from.airport_name}{" "}
                  </p>
                </div>
              </MenuHandler>
              <MenuList className="-mt-16">
                <>
                  <FlightInput
                    label="From"
                    type={SearchType.From}
                    callback={clickCallBack}
                    callType={callTypes.UpdateStore}
                  />
                </>
              </MenuList>
            </Menu>
          </div>
          <div className="relative rounded-lg border p-2 px-4 w-60 h-16 font-qs mr-2 font-bold my-2">
            <BsArrowLeftRight className="absolute -mx-10 my-1 rounded-full bg-white border p-2 w-max h-max" />
            <Menu open={openMenuTo} handler={setOpenMenuTo}>
              <MenuHandler>
                <div className="text-lg " onClick={() => setOpenMenuTo(true)}>
                  <label className="absolute bg-white mx-2 text-xs -mt-4 px-2 h-max text-gray-500">
                    TO
                  </label>{" "}
                  {SearchParams.to.city_name}
                  <p className="text-xs text-gray-500 font-arial font-light truncate">
                    {SearchParams.to.airport_code},
                    {SearchParams.to.airport_name}{" "}
                  </p>
                </div>
              </MenuHandler>
              <MenuList className="-mt-16">
                <>
                  <FlightInput
                    label="To"
                    type={SearchType.To}
                    callback={clickCallBack}
                    callType={callTypes.UpdateStore}
                  />
                </>
              </MenuList>
            </Menu>
          </div>
        </div>

        <div className="mx-2 rounded-lg border p-2 px-4 w-36 h-16 font-qs font-bold my-2">
          <Menu open={openDateFrom} handler={setOpenDateFrom}>
            <MenuHandler>
              <div className="text-lg">
                <label className="absolute bg-white mx-2 text-xs -mt-4 px-2 h-max text-gray-500">
                  Depature
                </label>{" "}
                <h2>
                  {new Date(SearchParams.dept_date).toLocaleDateString(
                    undefined,
                    { year: "2-digit", month: "short", day: "numeric" }
                  )}
                </h2>
                <p className="text-xs text-gray-500 font-arial font-light">
                  {" "}
                  {new Date(SearchParams.dept_date).toLocaleDateString(
                    undefined,
                    { weekday: "long" }
                  )}{" "}
                </p>
              </div>
            </MenuHandler>
            <MenuList className="-mt-16">
              <>
                <JouernyCalender
                  label="From"
                  type={SearchType.From}
                  callback={clickCallBack}
                />
              </>
            </MenuList>
          </Menu>
        </div>

        {returnDate ? (
          <div className="mx-2 rounded-lg border p-2 px-4 w-32 font-qs font-bold my-2">
            <Menu open={openDateTo} handler={setOpenDateTo}>
              <MenuHandler>
                <div className="text-lg">
                  <label className="absolute bg-white mx-2 text-xs -mt-4 px-2 h-max text-gray-500">
                    Return
                  </label>{" "}
                  <h2>
                    {SearchParams.return_date
                      ? new Date(SearchParams.return_date).toLocaleDateString(
                          undefined,
                          {
                            year: "2-digit",
                            month: "short",
                            day: "numeric",
                          }
                        )
                      : retnDateDef().toLocaleDateString(undefined, {
                          year: "2-digit",
                          month: "short",
                          day: "numeric",
                        })}
                  </h2>
                  <p className="text-xs text-gray-500 font-arial font-light">
                    {" "}
                    {SearchParams.return_date
                      ? new Date(SearchParams.return_date).toLocaleDateString(
                          undefined,
                          {
                            weekday: "long",
                          }
                        )
                      : retnDateDef().toLocaleDateString(undefined, {
                          weekday: "long",
                        })}
                  </p>
                </div>
              </MenuHandler>
              <MenuList className="-mt-16">
                <>
                  <JouernyCalender
                    label="To"
                    type={SearchType.To}
                    callback={clickCallBack}
                  />
                </>
              </MenuList>
            </Menu>
          </div>
        ) : (
          <div className="mx-2 rounded-lg border p-2 px-4 w-32 font-qs font-bold my-2">
            <div className="text-xl ">
              <label className="absolute bg-white mx-2 text-xs -mt-4 px-2 h-max text-gray-500">
                Return
              </label>{" "}
              <p className="text-xs text-gray-500 font-arial font-light">
                Click to return flight for better discount
              </p>
            </div>
          </div>
        )}

        <div className="mx-2 rounded-lg border p-2 px-4 w-60 font-qs font-bold my-2">
          <Menu open={openClass} handler={setOpenClass}>
            <MenuHandler>
              <div className="text-lg">
                <label className="absolute bg-white mx-2 text-xs -mt-4 px-2 h-max text-gray-500">
                  Travellers & Class
                </label>{" "}
                <h2>
                  {" "}
                  {SearchParams.pepoles.adults} {adultsSpelling}
                  {SearchParams.pepoles.children ? (
                    <span>
                      , {SearchParams.pepoles.children} {childernSpelling}
                    </span>
                  ) : (
                    ""
                  )}
                  {SearchParams.pepoles.infants ? (
                    <span>, {SearchParams.pepoles.infants} Infants</span>
                  ) : (
                    ""
                  )}
                </h2>
                <p className="text-xs text-gray-500 font-arial font-light">
                  {ClassName(SearchParams.class)}
                </p>
              </div>
            </MenuHandler>
            <MenuList className="-mt-16">
              <>
                <FlightClass callback={clickCallBack} />
              </>
            </MenuList>
          </Menu>
        </div>
      </div>
      <div className="w-max mx-auto ">
        <button
          onClick={() => searchFlight()}
          className="rounded-full p-4 w-max mt-2 uppercase tracking-widest font-bold font-arial text-white bg-orange-700"
        >
          Search Flights
        </button>
      </div>
    </div>
  );
}
