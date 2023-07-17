import React, { useEffect } from "react";
import Title from "../../Components/Utility/Title";
import PaymentDetails from "../../Components/Payment/PaymentDetails";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import { useNavigate } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";

export default function PaymentPage() {
  const payment = useSelector(
    (state: RootState) => state.BookingDetails.payment
  );
  const flight = useSelector((state: RootState) => state.BookingFlight);
  const total = payment
    ? payment.total_add_on! +
      payment.original_total -
      (payment.promotion + payment.discount)
    : 0;

  const navigate = useNavigate();

  useEffect(() => {
    if (!flight.dep) {
      setTimeout(() => {
        navigate("/flight");
      }, 2000);
    }
  }, []);

  return flight.dep ? (
    <div>
      <Title text="Payment" />
      <div className="bg-[#e9eef7] flex justify-center p-2">
        <div className="my-4 w-[36rem]">
          <h1 className="text-2xl font-qs font-bold">
            Pay <span className="text-orange-700"> &#8377; {total} /-</span> to
            confirm booking{" "}
          </h1>
        </div>
        <div className="w-[16rem]">
          <PaymentDetails />
        </div>
      </div>
    </div>
  ) : (
    <div>
      {" "}
      <h1 className="text-xl font-qs m-2 font-bold flex">
        {" "}
        <Spinner className="mx-4" /> Oops! you have lost your data.{" "}
        Redirecting...{" "}
      </h1>{" "}
    </div>
  );
}
