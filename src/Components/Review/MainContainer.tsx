import React, { useState } from "react";
import FlightDetails from "./FlightDetails";
import PaymentDetails from "./PaymentDetails";
import Offers from "./Offers";
import { AddonBase, OfferBase } from "../../Types";
import TravellerDetails from "./TravellerDetails";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import AddOns from "./AddOns";

export default function MainContainer({ isReturn }: { isReturn: boolean }) {
  const [selectedOffer, setSelectedOffer] = useState<OfferBase>();

  const [selectedAddOn, setSelectedAddon] = useState<{
    data: AddonBase;
    type: number;
  }>();

  const handleCallBack = (data: OfferBase) => {
    setSelectedOffer(data);
  };

  const handleAddonCallback = (data: { data: AddonBase; type: number }) => {
    setSelectedAddon(data);
  };

  const selector = useSelector((state: RootState) => state.BookingFlight);
  const bookingParams = useSelector((state: RootState) => state.SearchParms);

  const [locked, setLocked] = useState<boolean>(false);

  return (
    <div className="flex justify-center">
      <div className="my-4">
        <div className="bg-white shadow-md w-[48rem] rounded-md py-4 mx-8 h-max font-arial relative">
          {selector.dep ? (
            <FlightDetails
              data={selector.dep}
              jouernyDate={bookingParams.dept_date}
              isReturn={false}
            />
          ) : (
            ""
          )}
          {isReturn && selector.rtn && bookingParams.return_date ? (
            <div className="border-t-2 border-dashed border-[#dde2e9] relative">
              <span className="h-4 bg-[#e9eef7] w-3 absolute -mt-2 rounded-r-full -ml-1">
                {" "}
              </span>
              <span className="h-4 bg-[#e9eef7] w-3 absolute -mt-2 rounded-l-full right-0 -mr-1">
                {" "}
              </span>
              <FlightDetails
                data={selector.rtn}
                isReturn={true}
                jouernyDate={bookingParams.return_date}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <AddOns callback={handleAddonCallback} />
        <TravellerDetails />
      </div>
      <div>
        <PaymentDetails
          addons={selectedAddOn}
          appliedOffer={selectedOffer ?? null}
          callback={() => setLocked(true)}
        />
        <Offers callback={handleCallBack} locked={locked} />
      </div>
    </div>
  );
}
