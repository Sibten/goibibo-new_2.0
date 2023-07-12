import React, { useEffect, useState } from "react";
import {
  OfferBase,
  People,
  TotalPaymentDetails,
  TravellerIndiPayment,
} from "../../Types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { calFare } from "../../Helper/Method";
import { MdPeople } from "react-icons/md";
import { FaBaby, FaChild } from "react-icons/fa";
import { Input } from "@material-tailwind/react";
import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const getPeopleType = (peopleType: number, peopleNumber: number) => {
  switch (peopleType) {
    case People.Adult:
      return (
        <span className="flex">
          {" "}
          <MdPeople className="mx-2 mt-1" /> {peopleNumber}{" "}
          {peopleNumber > 1 ? "Adults" : "Adult"}
        </span>
      );
    case People.Child:
      return (
        <span className="flex">
          <FaChild className="mx-2 mt-1" /> {peopleNumber}{" "}
          {peopleNumber > 1 ? "Children" : "Child"}
        </span>
      );
    case People.Infant:
      return (
        <span className="flex">
          <FaBaby className="mx-2 mt-1" />
          {peopleNumber} Infants
        </span>
      );
  }
};

export default function PaymentDetails({
  appliedOffer,
}: {
  appliedOffer: OfferBase | null;
}) {
  const bookingParams = useSelector((state: RootState) => state.SearchParms);
  const bookingFlight = useSelector((state: RootState) => state.BookingFlight);

  const adultSpelling = bookingParams.pepoles.adults > 1 ? "Adults" : "Adult";
  const childSpelling =
    bookingParams.pepoles.children && bookingParams.pepoles.children > 1
      ? "Children"
      : "Child";

  const [IndiPayment, setIndiPayment] = useState<Array<TravellerIndiPayment>>(
    []
  );
  const [TotalPayment, setTotalPayment] = useState<TotalPaymentDetails>({
    basic_total: 0,
    tax_total: 0,
    original_total: 0,
    discount: 0,
    promotion: 0,
  });
  let fare = { basic: 0, tax: 0 };
  let infantsFare = { basic: 0, tax: 0 };

  useEffect(() => {
    if (bookingFlight.dep) {
      IndiPayment.splice(0, IndiPayment.length);
      fare = calFare(
        bookingFlight.dep?.route_id.distance,
        bookingFlight.dep?.fare.fare,
        bookingFlight.dep?.fare.tax,
        bookingParams.class,
        bookingFlight.dep?.route_id.stops.length
      );

      IndiPayment.push({
        no_people: bookingParams.pepoles.adults,
        type: People.Adult,
        fare: fare,
        tax_total: fare.tax * bookingParams.pepoles.adults,
        basic_total: fare.basic * bookingParams.pepoles.adults,
      });
      if (bookingParams.pepoles.children) {
        IndiPayment.push({
          no_people: bookingParams.pepoles.children,
          type: People.Child,
          fare: fare,
          tax_total: fare.tax * bookingParams.pepoles.children,
          basic_total: fare.basic * bookingParams.pepoles.children,
        });
      }
      if (bookingParams.pepoles.infants) {
        infantsFare = calFare(
          bookingFlight.dep?.route_id.distance,
          bookingFlight.dep?.fare.fare,
          bookingFlight.dep?.fare.tax,
          bookingParams.class,
          bookingFlight.dep?.route_id.stops.length,
          People.Infant
        );
        IndiPayment.push({
          no_people: bookingParams.pepoles.infants,
          type: People.Infant,
          fare: infantsFare,
          tax_total: infantsFare.tax * bookingParams.pepoles.infants,
          basic_total: infantsFare.basic * bookingParams.pepoles.infants,
        });
      }

      setIndiPayment([...IndiPayment]);
      console.log(IndiPayment);
    }
  }, [bookingFlight]);

  useEffect(() => {
    if (IndiPayment.length > 0) {
      let basicTotal = 0,
        taxTotal = 0;

      IndiPayment.forEach((s) => {
        basicTotal += s.basic_total;
        taxTotal += s.tax_total;
      });

      TotalPayment.basic_total = basicTotal;
      TotalPayment.tax_total = taxTotal;
      TotalPayment.original_total = basicTotal + taxTotal;
    }
    setTotalPayment({ ...TotalPayment });
  }, [IndiPayment]);

  useEffect(() => {
    if (appliedOffer) {
      setTotalPayment({
        ...TotalPayment,
        discount: Math.ceil(
          TotalPayment.original_total * appliedOffer.offer_discount
        ),
      });
    }
  }, [appliedOffer]);

  const [promocode, setPromoCode] = useState<string>();

  const [active, setActive] = useState<boolean>(false);
  const [promoError, setPromoError] = useState("");

  const applyPromoCode = async () => {
    const config: AxiosRequestConfig = {
      method: "get",
      url: `http://localhost:5050/offers/reedme?code=${promocode}`,
      headers: {
        token: Cookies.get("token"),
      },
    };

    const res = await axios(config);
    if (res.status == 200 && res.data.reedme) {
      TotalPayment.promotion =
        TotalPayment.original_total * res.data.offer.offer_discount;
    } else {
      setPromoError("Invalid Promocode.");
    }
  };

  return (
    <div className=" bg-white shadow-md  rounded-md w-[20rem] h-max py-4 my-4 font-arial">
      <div className="border-b border-gray-300 p-4">
        <h1 className="font-bold uppercase tracking-wide"> Fare Summary </h1>
        <p className="text-xs uppercase">
          {" "}
          {bookingParams.pepoles.adults} {adultSpelling}{" "}
          {bookingParams.pepoles.children ? (
            <span>
              | {bookingParams.pepoles.children} {childSpelling}
            </span>
          ) : (
            ""
          )}
          {bookingParams.pepoles.infants ? (
            <span>| {bookingParams.pepoles.infants} Infants</span>
          ) : (
            ""
          )}
        </p>
      </div>
      <div className="p-4">
        <div className="flex font-bold justify-between">
          <h1>Basic Fare </h1>
          <p>&#8377; {TotalPayment.basic_total}</p>
        </div>
        <ul className="mx-2 my-2">
          {IndiPayment.map((s) => (
            <li key={s.type} className="flex justify-between text-sm my-1">
              <p className="flex">
                {" "}
                {getPeopleType(s.type, s.no_people)} &nbsp; ( 1 x &#8377;{" "}
                {s.fare.basic})
              </p>{" "}
              <p> &#8377; {s.basic_total} </p>
            </li>
          ))}
        </ul>
        <div className="flex  justify-between my-2 text-gray-700">
          <h1>Tax & Surcharges </h1>
          <p>&#8377; {TotalPayment.tax_total}</p>
        </div>
        {TotalPayment.discount > 0 ? (
          <div className="flex justify-between my-2">
            <h1>Discount</h1>
            <p className="text-red-600">- &#8377; {TotalPayment.discount}</p>
          </div>
        ) : (
          ""
        )}
        {TotalPayment.promotion > 0 ? (
          <div className="flex justify-between">
            <h1>Promotion</h1>
            <p className="text-red-600">- &#8377; {TotalPayment.promotion}</p>
          </div>
        ) : (
          ""
        )}
        <div className="flex font-bold justify-between border-t my-2 py-2">
          <h1>Grand Total</h1>
          <p>
            &#8377;{" "}
            {TotalPayment.original_total -
              TotalPayment.discount -
              TotalPayment.promotion}
          </p>
        </div>
      </div>
      <div className="flex mx-4">
        <Input
          label="Promo Code"
          color="indigo"
          onChange={(e) => setPromoCode(e.target.value)}
        />{" "}
        <button
          className="bg-indigo-700 rounded-md mx-2 p-1 text-white"
          onClick={() => applyPromoCode()}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
