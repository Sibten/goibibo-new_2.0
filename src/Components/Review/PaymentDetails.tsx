import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { calFare } from "../../Helper/Method";
import { People } from "../../Types";
import { FaBaby, FaChild, FaPersonBooth } from "react-icons/fa";
import { MdChildCare, MdOutlineEmojiPeople, MdPeople } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { Button, Input } from "@material-tailwind/react";

export default function PaymentDetails() {
  const selector = useSelector((state: RootState) => state.BookingFlight);

  const bookingParams = useSelector((state: RootState) => state.SearchParms);
  const people = bookingParams.pepoles;
  const childSpelling =
    people.children && people.children > 1 ? "children" : "Child";
  const adultSpelling = people.adults > 1 ? "Adults" : "Adult";
  let fare = { basic: 0, tax: 0 };
  let infantFare = { basic: 0, tax: 0 };
  if (selector.dep) {
    fare = calFare(
      selector.dep?.route_id.distance,
      selector.dep?.fare.fare,
      selector.dep?.fare.tax,
      bookingParams.class,
      selector.dep?.route_id.stops.length
    );
    infantFare = calFare(
      selector.dep?.route_id.distance,
      selector.dep?.fare.fare,
      selector.dep?.fare.tax,
      bookingParams.class,
      selector.dep?.route_id.stops.length,
      People.Infant
    );
  }

  const EachFare: Array<{
    type: number;
    fare: { basic: number; tax: number };
    total: number;
    basic_total: number;
    tax_total: number;
  }> = [];

  EachFare.push({
    type: People.Adult,
    fare: fare,
    total: people.adults * (fare.basic + fare.tax),
    basic_total: people.adults * fare.basic,
    tax_total: people.adults * fare.tax,
  });
  if (people.children)
    EachFare.push({
      type: People.Child,
      fare: fare,
      total: people.children * (fare.basic + fare.tax),
      basic_total: people.children * fare.basic,
      tax_total: people.children * fare.tax,
    });

  if (people.infants)
    EachFare.push({
      type: People.Infant,
      fare: fare,
      total: people.infants * (infantFare.basic + infantFare.tax),
      basic_total: people.infants * infantFare.basic,
      tax_total: people.infants * infantFare.tax,
    });

  const getPeopleType = (peopleNumber: number) => {
    switch (peopleNumber) {
      case People.Adult:
        return (
          <span className="flex">
            {" "}
            <MdPeople className="mx-2 mt-1" /> {people.adults} {adultSpelling}{" "}
          </span>
        );
      case People.Child:
        return (
          <span className="flex">
            <FaChild className="mx-2 mt-1" /> {people.children} {childSpelling}
          </span>
        );
      case People.Infant:
        return (
          <span className="flex">
            <FaBaby className="mx-2 mt-1" />
            {people.infants} Infants
          </span>
        );
    }
  };

  let basicTotal = 0,
    GrandTotal = 0,
    taxTotal = 0;

  EachFare.forEach((s) => {
    basicTotal = basicTotal + s.basic_total;
    taxTotal = taxTotal + s.tax_total;
    GrandTotal = GrandTotal + s.total;
  });

  const ApplyPromoCode = () => {};

  return (
    <div className="mx-8 bg-white shadow-md  rounded-md w-[20rem] h-max py-4 my-4 font-arial">
      <div className="border-b border-gray-300 p-4">
        <h1 className="font-bold uppercase tracking-wide"> Fare Summary </h1>
        <p className="text-xs uppercase">
          {" "}
          {people.adults} {adultSpelling}{" "}
          {people.children ? (
            <span>
              | {people.children} {childSpelling}
            </span>
          ) : (
            ""
          )}
          {people.infants ? <span>| {people.children} Infants</span> : ""}
        </p>
      </div>
      <div className="p-4">
        <div className="flex justify-between font-bold">
          <h1> Base fare</h1>
          <p>&#8377; {basicTotal}</p>
        </div>
        <div className="text-sm mx-2 my-2">
          <ul>
            {EachFare.map((s) => {
              return (
                <li key={s.type} className="flex justify-between">
                  {" "}
                  <p className="flex">
                    {" "}
                    {getPeopleType(s.type)} &nbsp;(1 x &#8377; {s.fare.basic})
                  </p>
                  <p> &#8377; {s.basic_total} </p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="border-t text-gray-800 flex justify-between my-2 p-2">
          <p> Taxes and Surcharges</p>
          <p>&#8377; {taxTotal}</p>
        </div>
        <div className="border-t text-base text-indigo-800 flex justify-between my-2 p-2 font-bold">
          <p>Grand Total </p>
          <p className="text-xl">&#8377; {GrandTotal} </p>
        </div>
      </div>
      <div className="mx-4 flex">
        <Input
          label="Promo Code"
          className="text-indigo-700 font-bold"
          color="indigo"
        />
        <button
          className="bg-indigo-700 text-white p-1 rounded-md mx-2 px-4"
          onClick={() => ApplyPromoCode()}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
