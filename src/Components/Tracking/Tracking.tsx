import React, { useEffect, useState } from "react";
import { Step, Stepper } from "@material-tailwind/react";
import { FaCalendarCheck } from "react-icons/fa";
import { MdOutlineAirlineSeatReclineNormal, MdPayment } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
export default function Tracking({ active }: { active: string }) {
  const trackingSelector = useSelector((state: RootState) => state.Tracking);

  const [activeState, setActiveState] = useState(0);

  useEffect(() => {
    if (trackingSelector.booking) setActiveState(0);
    if (trackingSelector.seat_selection) setActiveState(1);
    if (trackingSelector.payment) setActiveState(2);
  }, [trackingSelector]);

  return (
    <div>
      <div className="bg-white">
        <div className="w-[48rem] p-4 mx-auto pb-8 font-qs font-bold">
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
        </div>
      </div>
    </div>
  );
}
