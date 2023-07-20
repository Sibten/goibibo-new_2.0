import React from "react";
import { TripData } from "../../Types";

export default function Completedtrip({ data }: { data: Array<TripData> }) {
  return (
    <div className="bg-white rounded-md p-2 flex items-center">
      <div className="mx-2">
        <img
          src="https://res.cloudinary.com/dgsqarold/image/upload/v1689851200/Goibibo/10757284_r9rb0d.png"
          alt="no_trip"
          className="w-48 h-48"
        />
      </div>
      <div>
        <div className="mx-4 font-qs font-bold text-black tracking-wide text-lg">
          When you sucessfully completed your trip, then show here.
        </div>
      </div>
    </div>
  );
}
