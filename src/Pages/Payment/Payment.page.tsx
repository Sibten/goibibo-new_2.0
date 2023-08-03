import React, { useEffect, useState } from "react";
import Title from "../../Components/Utility/Title";
import PaymentDetails from "../../Components/Payment/PaymentDetails";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import { useNavigate } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import Timer from "../../Helper/Timer";
import { FaClock } from "react-icons/fa";
import TicketDetails from "../../Components/Payment/TicketDetails";
import BillingAddress from "../../Components/Payment/BillingAddress";
import PaymentAction from "../../Components/Payment/PaymentAction";

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

  const [start, setStart] = useState(true);

  return flight.dep ? (
    <div>
      <Title text="Payment" />
      <div className="bg-white flex justify-center p-2">
        <div className="my-4 w-[36rem]">
          <h1 className="text-2xl font-qs font-bold">
            Pay <span className="text-orange-700"> &#8377; {total} /-</span> to
            confirm booking{" "}
          </h1>
          <TicketDetails />
        </div>
        <div className="w-[20rem]">
          <div className="font-bold flex p-2 text-sm rounded-md my-2 w-max text-orange-800  font-qs ">
            <FaClock className="mx-2 my-[2px]" /> Time Left{" "}
            <Timer
              Start={true}
              Callback={() => {
                // //  console.log("hell");
                setStart(false);
                navigate("/flight");
              }}
              InComingMinute={20}
              InComingSecond={0}
            />
          </div>
          <PaymentDetails />
          <PaymentAction />
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
