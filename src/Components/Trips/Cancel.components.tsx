import React from "react";
import { TripData } from "../../Types";

export default function CancelTrip({ data }: { data: Array<TripData> }) {
  return (
    <div className="bg-white rounded-md p-2 flex items-center">
      <div className="mx-2">
        <img
          src="https://res.cloudinary.com/dgsqarold/image/upload/v1690534836/Goibibo/11565677_a9j2y3.png"
          alt="no_trip"
          className="w-48 h-48"
        />
      </div>
      <div>
        <div className="mx-4 font-qs font-bold text-black tracking-wide text-lg">
          Enjoy! nothing to be cancel till now.
        </div>
      </div>
    </div>
  );
}
