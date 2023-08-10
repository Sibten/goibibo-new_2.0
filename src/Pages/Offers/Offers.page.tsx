import React from "react";
import Title from "../../Components/Utility/Title";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { date } from "../../Helper/Method";

export default function OffersPage() {
  const selector = useSelector((state: RootState) => state.Offers);

  return (
    <div>
      <Title text="Offers" />
      <div className="w-max mx-auto my-2">
        <div>
          <img
            src="https://res.cloudinary.com/dgsqarold/image/upload/v1691574024/Goibibo/topband-1670486848_uzokgp.webp"
            alt="offer"
            className="w-[48rem]"
          />
        </div>
        <h1 className="font-bold font-qs my-6 text-lg">
          {" "}
          All valid offers on every booking
          <p className="text-sm font-normal">
            {" "}
            This all are present at booking time
          </p>
        </h1>
        <div className="grid grid-cols-3 my-4 font-arial">
          {selector.map((o) => (
            <div
              className="bg-white p-2 shadow-md rounded-md m-1"
              key={o.referal_code}
            >
              <h1 className="text-lg font-bold text-gray-800">
                {" "}
                {o.offer_name}{" "}
              </h1>
              <p className="text-sm w-60 text-gray-500">{o.description}</p>
              <h2 className="text-center my-2 bg-blue-50 rounded-full p-1">
                {o.referal_code}
              </h2>
              <p className="text-gray-500">
                {" "}
                Valid upto : {new Date(o.valid_till).toLocaleDateString()}{" "}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
