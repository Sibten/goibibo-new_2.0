import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { GrLocation } from "react-icons/gr";

export default function BillingAddress() {
  const selector = useSelector((state: RootState) => state.BookingDetails);
  const User = useSelector((state: RootState) => state.User);
  return (
    <div className="my-2 border border-gray-300 rounded-md font-arial p-2">
      <h1 className="font-bold border-b flex items-center p-1">
        <GrLocation className="font-bold text-2xl mr-2" /> Billing Address
      </h1>
      <div className="p-2">
        <p className="font-bold">
          {" "}
          {User.first_name ?? ""} {User.last_name}
        </p>
        <p>
          {selector.basic.address} , {selector.basic.state} -
          {selector.basic.pincode}
        </p>
      </div>
    </div>
  );
}
