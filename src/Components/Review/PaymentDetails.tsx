import React, { useEffect, useState } from "react";
import {
  APICallType,
  AddonBase,
  OfferBase,
  People,
  SearchType,
  TotalPaymentDetails,
  TravellerIndiPayment,
} from "../../Types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { calFare, getFlightClass } from "../../Helper/Method";
import { MdPeople } from "react-icons/md";
import { FaBaby, FaChild, FaLock } from "react-icons/fa";
import { Button, Input, Alert } from "@material-tailwind/react";
import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { callAPI, getAPI, getAPICallType } from "../../Services/API.services";

import { BookingActions } from "../../Actions/ConfirmBookingDetails.action";

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
  callback,
  addons,
}: {
  appliedOffer: OfferBase | null;
  callback: Function;
  addons: { data: AddonBase; type: number } | undefined;
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
    total_add_on: 0,
  });
  let fare = { basic: 0, tax: 0 };
  let rtnFare = { basic: 0, tax: 0 };
  let infantsFare = { basic: 0, tax: 0 };
  let rtnInfantFare = { basic: 0, tax: 0 };

  useEffect(() => {
    if (bookingFlight.dep) {
      IndiPayment.splice(0, IndiPayment.length);
      fare = calFare(
        bookingFlight.dep?.route_id.distance,
        {
          basicfare: bookingFlight.dep?.fare.fare,
          tax: bookingFlight.dep?.fare.tax,
        },
        bookingParams.class,
        bookingFlight.dep?.route_id.stops.length,
        bookingFlight.dep?.available_seats,
        bookingParams.dept_date
      );
      infantsFare = calFare(
        bookingFlight.dep?.route_id.distance,
        {
          basicfare: bookingFlight.dep?.fare.fare,
          tax: bookingFlight.dep?.fare.tax,
        },
        bookingParams.class,
        bookingFlight.dep?.route_id.stops.length,
        bookingFlight.dep.available_seats,
        bookingParams.dept_date,
        People.Infant
      );
    }
    if (bookingFlight.rtn && bookingParams.return_date) {
      rtnFare = calFare(
        bookingFlight.rtn?.route_id.distance,
        {
          basicfare: bookingFlight.rtn?.fare.fare,
          tax: bookingFlight.rtn?.fare.tax,
        },
        bookingParams.class,
        bookingFlight.rtn?.route_id.stops.length,
        bookingFlight.rtn?.available_seats,
        bookingParams.return_date
      );
      rtnInfantFare = calFare(
        bookingFlight.rtn?.route_id.distance,
        {
          basicfare: bookingFlight.rtn?.fare.fare,
          tax: bookingFlight.rtn?.fare.tax,
        },
        bookingParams.class,
        bookingFlight.rtn?.route_id.stops.length,
        bookingFlight.rtn?.available_seats,
        bookingParams.return_date,
        People.Infant
      );
    }

    IndiPayment.push({
      no_people: bookingParams.pepoles.adults,
      type: People.Adult,
      fare: { dep: fare, rtn: rtnFare },
      tax_total:
        fare.tax * bookingParams.pepoles.adults +
        rtnFare.tax * bookingParams.pepoles.adults,
      basic_total:
        fare.basic * bookingParams.pepoles.adults +
        rtnFare.basic * bookingParams.pepoles.adults,
    });
    if (bookingParams.pepoles.children) {
      IndiPayment.push({
        no_people: bookingParams.pepoles.children,
        type: People.Child,
        fare: { dep: fare, rtn: rtnFare },
        tax_total:
          fare.tax * bookingParams.pepoles.children +
          rtnFare.tax * bookingParams.pepoles.children,
        basic_total:
          fare.basic * bookingParams.pepoles.children +
          rtnFare.basic * bookingParams.pepoles.children,
      });
    }
    if (bookingParams.pepoles.infants) {
      IndiPayment.push({
        no_people: bookingParams.pepoles.infants,
        type: People.Infant,
        fare: { dep: infantsFare, rtn: rtnInfantFare },
        tax_total:
          infantsFare.tax * bookingParams.pepoles.infants +
          rtnInfantFare.tax * bookingParams.pepoles.infants,
        basic_total:
          infantsFare.basic * bookingParams.pepoles.infants +
          rtnInfantFare.basic * bookingParams.pepoles.infants,
      });
    }
    setIndiPayment([...IndiPayment]);
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
      if (appliedOffer.offer_discount > 1) {
        setTotalPayment({
          ...TotalPayment,
          discount: Math.ceil(appliedOffer.offer_discount),
        });
      } else {
        setTotalPayment({
          ...TotalPayment,
          discount: Math.ceil(
            TotalPayment.original_total * appliedOffer.offer_discount
          ),
        });
      }
    } else {
      setTotalPayment({
        ...TotalPayment,
        discount: 0,
      });
    }
  }, [appliedOffer]);

  const [promocode, setPromoCode] = useState<string>("");

  const [promoApplied, setpromoApplied] = useState<boolean>(false);
  const [payLock, setPayLock] = useState<boolean>(false);
  const [promoError, setPromoError] = useState("");
  const [depAddon, setDepAddon] = useState<AddonBase>();
  const [rtnAddon, setRtnAddon] = useState<AddonBase>();

  const dispatch = useDispatch();

  const applyPromoCode = async () => {
    try {
      const res = await getAPI(`/offers/reedme?code=${promocode}`);
      if (res.status == 200 && res.data.reedme) {
        setPromoError("");
        TotalPayment.promotion = Math.ceil(
          TotalPayment.original_total * res.data.offer.offer_discount
        );
        setTotalPayment({ ...TotalPayment });
        setpromoApplied(true);
      } else {
        setPromoError("Invalid Promocode.");
        setTimeout(() => {
          setPromoError("");
        }, 2000);
      }
    } catch (e) {
      setPromoError("Offer is not valid!");
      setTimeout(() => {
        setPromoError("");
      }, 2000);
    }
  };
  const removePromo = () => {
    setPromoCode("");
    TotalPayment.promotion = 0;
    setTotalPayment({ ...TotalPayment });
    setpromoApplied(false);
  };

  useEffect(() => {
    if (addons && addons.type == SearchType.From) {
      setDepAddon(addons.data);
    } else {
      setRtnAddon(addons?.data);
    }
  }, [addons]);

  const lockPayment = () => {
    TotalPayment.total_add_on =
      TotalPayment.total_add_on +
      (depAddon?.price ?? 0) +
      (rtnAddon?.price ?? 0);
    setTotalPayment({ ...TotalPayment });
    dispatch(BookingActions.addPayment(TotalPayment));
    dispatch(
      BookingActions.addAddon({ type: SearchType.From, data: depAddon })
    );
    dispatch(BookingActions.addAddon({ type: SearchType.To, data: rtnAddon }));
    setpromoApplied(true);
    setPayLock(true);
    callback();
  };

  return (
    <div className=" bg-white shadow-md  rounded-md w-[20rem] h-max py-4 my-4 font-arial sticky top-2 z-10">
      <div className="border-b border-gray-300 p-4">
        <h1 className="font-bold uppercase tracking-wide font-qs">
          {" "}
          Fare Summary{" "}
        </h1>
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
              <div>
                <p className="flex">
                  {" "}
                  <span> {getPeopleType(s.type, s.no_people)} </span>
                </p>{" "}
                <p className="w-max">
                  <span className="ms-8 text-xs">
                    {" "}
                    (Dep - 1 x &#8377; {s.fare.dep.basic}){" "}
                  </span>
                  {bookingFlight.rtn ? (
                    <span className="text-xs">
                      {" "}
                      (Rtn - 1 x &#8377; {s.fare.rtn.basic}){" "}
                    </span>
                  ) : (
                    ""
                  )}
                </p>
              </div>
              <p> &#8377; {s.basic_total} </p>
            </li>
          ))}
        </ul>
        <div className="flex  justify-between my-2 text-gray-700">
          <h1>Tax & Surcharges </h1>
          <p>&#8377; {TotalPayment.tax_total}</p>
        </div>
        {depAddon ? (
          <div className="flex justify-between my-2">
            <h1>Departure Addon </h1>
            <p className="text-blue-800">
              {" "}
              <span> + &#8377; {depAddon.price}</span>
            </p>
          </div>
        ) : (
          ""
        )}
        {rtnAddon ? (
          <div className="flex justify-between my-2">
            <h1>Return Addon </h1>
            <p className="text-blue-800">
              {" "}
              <span> + &#8377; {rtnAddon.price}</span>
            </p>
          </div>
        ) : (
          ""
        )}
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
        <div className="flex font-bold font-qs justify-between border-t my-2 py-2 text-indigo-600">
          <h1>Grand Total</h1>
          <p className="text-xl">
            &#8377;{" "}
            {TotalPayment.original_total +
              (depAddon?.price ?? 0) +
              (rtnAddon?.price ?? 0) -
              TotalPayment.discount -
              TotalPayment.promotion}
          </p>
        </div>
      </div>
      <div className=" mx-4">
        <div className="flex">
          <Input
            label="Promo Code"
            color="indigo"
            value={promocode}
            onChange={(e) => setPromoCode(e.target.value)}
            disabled={promoApplied}
          />{" "}
          {promoApplied && !payLock ? (
            <Button
              className="bg-red-600 w-24 rounded-md mx-2 p-1 text-white"
              onClick={() => removePromo()}
            >
              Remove
            </Button>
          ) : (
            <Button
              className="bg-indigo-600 w-24 rounded-md mx-2 p-1 text-white"
              onClick={() => applyPromoCode()}
              disabled={promoApplied}
            >
              Apply
            </Button>
          )}
        </div>
        <div className="w-full text-xs my-2">
          {promoError && (
            <Alert className="bg-red-50 p-1 text-center px-2">
              {" "}
              <p className="text-red-500">{promoError}</p>{" "}
            </Alert>
          )}
        </div>

        <div className="my-2 w-max mx-auto">
          <Button
            className="flex bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            onClick={lockPayment}
            disabled={payLock}
          >
            <FaLock className="mx-2" />{" "}
            {payLock ? "Price Locked" : "Lock Price"}{" "}
          </Button>
        </div>

        <div className="w-full">
          <Alert className="bg-blue-50 text-indigo-500 text-xs w-full">
            {" "}
            Once you have locked your payment, you are not eligible to add
            promotion code or any offer.{" "}
          </Alert>
        </div>
      </div>
    </div>
  );
}
