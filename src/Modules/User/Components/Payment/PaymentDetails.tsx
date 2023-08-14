import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

export default function PaymentDetails() {
  const selector = useSelector((state: RootState) => state.BookingDetails);
  return (
    <div className="my-2">
      <div className="border border-gray-300 rounded-md  mx-4 font-arial p-4 w-[20rem]">
        <h1 className="font-bold border-b border-gray-300 text-lg my-2">
          Payment Summary
        </h1>
        <div>
          <ul>
            <li className="flex justify-between my-2">
              <span>Fare (Inc. GST + Surcharges) </span>
              <span> &#8377; {selector.payment?.original_total}</span>
            </li>
            <li className="flex justify-between my-2">
              <span>Add On Charges </span>
              <span> &#8377; {selector.payment?.total_add_on}</span>
            </li>
            <li className="flex justify-between my-2">
              <span>Promotion & Discount</span>
              <span className="text-red-600">
                - &#8377;
                {selector.payment?.discount! * 1 +
                  selector.payment?.promotion! * 1}
              </span>
            </li>
            <li className="flex justify-between text-xl my-4 font-bold ">
              <span>Grand Total</span>
              <span className="text-orange-800">
                &#8377;
                {selector.payment?.original_total! +
                  selector.payment?.total_add_on! -
                  (selector.payment?.promotion! + selector.payment?.discount!)}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
