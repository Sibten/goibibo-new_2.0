import React, { useEffect, useState } from "react";
import { Step, Stepper } from "@material-tailwind/react";
import { FaCalendarCheck } from "react-icons/fa";
import { MdOutlineAirlineSeatReclineNormal, MdPayment } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
export default function Tracking() {
  const trackingSelector = useSelector((state: RootState) => state.Tracking);

  const [activeState, setActiveState] = useState(0);
  
  const flight = useSelector((state: RootState) => state.BookingFlight);
  useEffect(() => {
    if (trackingSelector.booking) setActiveState(0);
    if (trackingSelector.dep_seat_selection) setActiveState(1);
    if (trackingSelector.rtn_seat_selection) setActiveState(2);
    if (trackingSelector.payment) setActiveState(flight.rtn ? 3 : 2);
  }, [trackingSelector]);

  
  return (
    <div>
      <div className="bg-white">
        <div className="w-[48rem] p-4 mx-auto pb-8 font-qs font-bold">
          {flight.rtn ? (
            <Stepper activeStep={activeState}>
              <Step className="relative">
                {" "}
                <FaCalendarCheck />
                <div className="absolute -bottom-8 text-black text-sm">
                  Review
                </div>
              </Step>
              <Step className="relative">
                {" "}
                <MdOutlineAirlineSeatReclineNormal />
                <div className="absolute -bottom-8 text-black w-max text-sm">
                  Departure Seat Selection
                </div>
              </Step>
              <Step className="relative">
                {" "}
                <MdOutlineAirlineSeatReclineNormal />
                <div className="absolute -bottom-8 text-black w-max text-sm">
                  Return Seat Selection
                </div>
              </Step>
              <Step className="relative">
                {" "}
                <MdPayment />
                <div className="absolute -bottom-8 text-black w-max text-sm">
                  Payment
                </div>
              </Step>
            </Stepper>
          ) : (
            <Stepper activeStep={activeState}>
              <Step className="relative">
                {" "}
                <FaCalendarCheck />
                <div className="absolute -bottom-8 text-black text-sm">
                  Review
                </div>
              </Step>
              <Step className="relative">
                {" "}
                <MdOutlineAirlineSeatReclineNormal />
                <div className="absolute -bottom-8 text-black w-max text-sm">
                  Seat Selection
                </div>
              </Step>
              <Step className="relative">
                {" "}
                <MdPayment />
                <div className="absolute -bottom-8 text-black w-max text-sm">
                  Payment
                </div>
              </Step>
            </Stepper>
          )}
        </div>
      </div>
    </div>
  );
}
