import React from "react";
import { TripData } from "../../Types";
import Card from "./SubComponent/Card";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export default function UpcomingTrips({ data }: { data: Array<TripData> }) {
  const navigate = useNavigate();
  return (
    <div>
      {data.length == 0 ? (
        <div className="bg-white rounded-md p-2 flex items-center">
          <div className="mx-2">
            <img
              src="https://res.cloudinary.com/dgsqarold/image/upload/v1689849689/Goibibo/gisrvrError.1e07eff2_yj8ahz.png"
              alt="no_trip"
              className="w-48 h-48"
            />
          </div>
          <div className="mx-4 font-qs font-bold text-black tracking-wide">
            <p className="text-sm">
              Looks like you have never booked with Goibibo
            </p>
            <h1 className="text-lg">
              When you book your trips will be shown here.
            </h1>
            <Button onClick={() => navigate("/flight")} className="my-4">
              Start Booking Now
            </Button>
          </div>
        </div>
      ) : (
        data.map((s) => <Card key={s.PNR_no} data={s} />)
      )}
    </div>
  );
}
