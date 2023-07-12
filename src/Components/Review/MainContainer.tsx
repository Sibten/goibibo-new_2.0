import React, { useState } from "react";
import FlightDetails from "./FlightDetails";
import PaymentDetails from "./PaymentDetails";
import Offers from "./Offers";
import { OfferBase } from "../../Types";

export default function MainContainer() {
  const [selectedOffer, setSelectedOffer] = useState<OfferBase>();

  const handleCallBack = (data: OfferBase) => {
    setSelectedOffer(data);
  };
  return (
    <div className="flex justify-center">
      <div>
        <FlightDetails />
      </div>
      <div>
        <PaymentDetails appliedOffer={selectedOffer ?? null} />
        <Offers callback={handleCallBack} />
      </div>
    </div>
  );
}
