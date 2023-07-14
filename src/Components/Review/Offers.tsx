import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Radio } from "@material-tailwind/react";
import { GrPowerReset } from "react-icons/gr";
import { OfferBase } from "../../Types";

export default function Offers({
  callback,
  locked,
}: {
  callback: Function;
  locked: boolean;
}) {
  const offerSelector = useSelector((state: RootState) => state.Offers);

  return (
    <div className="w-[20rem] bg-white shadow-md my-2 rounded-md font-arial">
      <form>
        <div className="border-b  font-bold p-4 flex justify-between font-qs">
          <h1 className="text-lg"> Goibibo Offers</h1>
          {!locked ? (
            <button type="reset">
              <GrPowerReset type="reset" onClick={() => callback(null)} />
            </button>
          ) : (
            ""
          )}
        </div>
        {!locked ? (
          <div className="p-4">
            {offerSelector.map((s: OfferBase) => (
              <div
                className="flex"
                key={s.referal_code}
                onClick={() => {
                  callback(s);
                }}
              >
                <Radio name="offers" />
                <div>
                  <h2 className="font-bold"> {s.offer_name}</h2>
                  <p className="text-sm text-gray-700">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4">
            <p className="text-sm text-gray-600 font-arial">
              {" "}
              Your Payment is locked! You can't add any more offer! If you
              really want to access another offer please go back and re-select
              your travel flight.{" "}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
