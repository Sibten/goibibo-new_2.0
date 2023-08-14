import React from "react";

export default function FlightCardcomponent({
  flightNo,
  source,
  destination,
}: {
  flightNo: string;
  source: string;
  destination: string;
}) {
  return (
    <div>
      <div className="m-2 border bg-gray-50 border-gray-200 p-2 rounded-md w-60">
        <div className="w-max mx-auto">
          <img
            src="https://res.cloudinary.com/dgsqarold/image/upload/v1692011115/Goibibo/10741138_jm6wvo.png"
            alt="flight"
          />
        </div>
        <div>
          <h1 className="text-lg font-qs font-bold ">{flightNo}</h1>
          <p className="font-qs">
            {source} - {destination}{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
