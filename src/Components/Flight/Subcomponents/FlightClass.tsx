import React, { useState, useEffect } from "react";
import { RiAddFill, RiSubtractLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { Button, Checkbox, Chip, Radio } from "@material-tailwind/react";
import {
  Flighclass,
  SearchParamsType,
  MyProps,
  CallBackType,
} from "../../../Types";
import { searchActions } from "../../../Actions/Search.action";
import { ClassName } from "../Flightsearch.components";

export default function FlightClass({ callback }: MyProps) {
  const SearchParams = useSelector((state: RootState) => state.SearchParms);
  const dispatch = useDispatch();
  const [adults, setAdults] = useState(SearchParams.pepoles.adults);
  const [children, setChildren] = useState(SearchParams.pepoles.children!);
  const [infants, setInfants] = useState(SearchParams.pepoles.infants!);
  const [travelClass, setTravelClass] = useState(SearchParams.class);

  const [adultDisable, setAdultDisable] = useState(false);
  const [childrenDisable, setChildrenDisable] = useState(false);
  const [infantsDisable, setInfantsDisable] = useState(false);

  const adultsSpelling = adults > 1 ? "Adults" : "Adult";
  const childernSpelling = children > 1 ? "Children" : "Child";

  useEffect(() => {
    if (adults == 1) setAdultDisable(true);
    if (children == 0) setChildrenDisable(true);
    if (infants == 0) setInfantsDisable(true);
  }, []);

  const clickParams: SearchParamsType = {
    ...SearchParams,
    pepoles: {
      adults: adults,
      children: children,
      infants: infants,
    },
    class: travelClass,
  };

  const handleClick = () => {
    console.log(clickParams);
    dispatch(searchActions.setParams(clickParams));
    callback!(CallBackType.success);
  };

  return (
    <div>
      <div className="border-b">
        <div className="mx-auto rounded-lg border-2 border-blue-500 p-2 px-4 w-72 font-qs font-bold my-2">
          <div className="text-lg">
            <label className="absolute bg-white mx-2 text-xs -mt-4 px-2 h-max text-blue-500">
              Travellers & Class
            </label>{" "}
            <h2 className="text-black">
              {adults > 0 && (
                <span>
                  {" "}
                  {adults} {adultsSpelling}{" "}
                </span>
              )}
              {children > 0 && (
                <span>
                  ,{children} {childernSpelling}{" "}
                </span>
              )}
              {infants > 0 && <span>,{infants} Infants </span>}
            </h2>
            <p className="text-xs text-gray-500 font-arial font-light">
              {ClassName(travelClass)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex my-2 p-2 mx-auto w-max">
        <div className="text-center mx-2">
          <h3 className="font-qs font-bold text-black">Adults</h3>
          <small className="text-black">(Aged 12+ yrs)</small>
          <div className="border p-1 text-xl font-qs text-black my-2  rounded-lg">
            <button
              className="text-blue-500 mx-2 disabled:text-gray-400"
              onClick={() => {
                if (adults > 2) {
                  setAdults(adults - 1);
                } else {
                  setAdults(adults - 1);
                  setAdultDisable(true);
                }
              }}
              disabled={adultDisable}
            >
              <RiSubtractLine />
            </button>
            <span className="-mt-2 mx-2"> {adults}</span>
            <button
              onClick={() => {
                if (adults >= 1) {
                  setAdults(adults + 1);
                  setAdultDisable(false);
                }
              }}
            >
              <RiAddFill className="mx-2 text-blue-500" />
            </button>
          </div>
        </div>
        <div className="text-center mx-2">
          <h3 className="font-qs font-bold text-black">Children</h3>
          <small className="text-black">(Aged 2-12 yrs)</small>
          <div className="border p-1 text-xl font-qs text-black my-2  rounded-lg">
            <button
              className="text-blue-500 mx-2 disabled:text-gray-400"
              onClick={() => {
                if (children > 1) {
                  setChildren(children - 1);
                } else {
                  setChildren(children - 1);
                  setChildrenDisable(true);
                }
              }}
              disabled={childrenDisable}
            >
              <RiSubtractLine />
            </button>
            <span className="-mt-2 mx-2"> {children}</span>
            <button
              onClick={() => {
                if (children >= 0) {
                  setChildren(children + 1);
                  setChildrenDisable(false);
                }
              }}
            >
              <RiAddFill className="mx-2 text-blue-500" />
            </button>
          </div>
        </div>
        <div className="text-center mx-2">
          <h3 className="font-qs font-bold text-black">Infants</h3>
          <small className="text-black">(Below 2 yrs)</small>
          <div className="border p-1 text-xl font-qs text-black my-2  rounded-lg">
            <button
              className="text-blue-500 mx-2 disabled:text-gray-400"
              onClick={() => {
                if (infants > 1) {
                  setInfants(infants - 1);
                } else {
                  setInfants(infants - 1);
                  setInfantsDisable(true);
                }
              }}
              disabled={infantsDisable}
            >
              <RiSubtractLine />
            </button>
            <span className="-mt-2 mx-2"> {infants}</span>
            <button
              onClick={() => {
                if (infants >= 0) {
                  setInfants(infants + 1);
                  setInfantsDisable(false);
                }
              }}
            >
              <RiAddFill className="mx-2 text-blue-500" />
            </button>
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-qs text-base text-center font-bold text-black">
          {" "}
          Travel Class
        </h3>
        <div className="flex w-max gap-4">
          <Radio
            label="Economy"
            name="class"
            onChange={() => setTravelClass(Flighclass.Economy)}
            defaultChecked={SearchParams.class == Flighclass.Economy}
          />
          <Radio
            label="Premium Economy"
            name="class"
            onChange={() => setTravelClass(Flighclass.PremiumEconomy)}
            defaultChecked={SearchParams.class == Flighclass.PremiumEconomy}
          />
          <Radio
            label="Business"
            name="class"
            onChange={() => setTravelClass(Flighclass.Business)}
            defaultChecked={SearchParams.class == Flighclass.Business}
          />
          <Radio
            label="First Class"
            name="class"
            onChange={() => setTravelClass(Flighclass.FirstClass)}
            defaultChecked={SearchParams.class == Flighclass.FirstClass}
          />
        </div>
      </div>
      <div className="border-t p-2 flex justify-end">
        <div>
          <button
            className="font-qs text-base my-1 text-black mx-2"
            onClick={() => callback!(CallBackType.success)}
          >
            Cancel
          </button>{" "}
          <button
            className="mx-2 bg-blue-800 rounded-md p-2 font-bold font-qs text-white"
            onClick={handleClick}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
