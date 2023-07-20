import React from "react";
import { TripData } from "../../Types";

export default function CancelTrip({ data }: { data: Array<TripData> }) {
  return (
    <div className="bg-white rounded-md p-2 flex items-center">
      <div className="mx-2">
        <img
          src="https://res.cloudinary.com/dgsqarold/image/upload/v1689850970/Goibibo/10041082_igv81p.png"
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
