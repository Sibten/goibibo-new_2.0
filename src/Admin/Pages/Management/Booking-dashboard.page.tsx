import React from "react";
import Title from "../../../Components/Utility/Title";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export default function BookingDashboardPage() {
  const flights = useSelector((state: RootState) => state.AirlineFlight);
  return (
    <div>
      <Title text="Flight & Booking Management" />
    </div>
  );
}
