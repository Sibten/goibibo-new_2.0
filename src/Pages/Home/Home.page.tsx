import React, { useEffect } from "react";
import HomeSmall from "./HomeSmall.page";
import HomeDesktop from "./HomeDesktop.page";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { trackingActions } from "../../Actions/Tracking.actions";
import { BookingActions } from "../../Actions/ConfirmBookingDetails.action";
import { BookingFlightActions } from "../../Actions/BookingFlight.action";

export default function Homepage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(trackingActions.disableAll());
    dispatch(BookingActions.reset());
    dispatch(BookingFlightActions.reset());
  }, []);

  return (
    <div>
      <div className="lg:block hidden">
        <HomeDesktop />
      </div>
      <div className="block lg:hidden">
        <HomeSmall />
      </div>
    </div>
  );
}
