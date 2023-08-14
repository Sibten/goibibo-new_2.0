import React from "react";
import { Spinner } from "@material-tailwind/react";

export default function LostData() {
  return (
    <div className="font-qs font-bold my-8 p-4 w-max mx-auto">
      <div className="mx-auto w-max">
        <img
          src="https://res.cloudinary.com/dgsqarold/image/upload/v1690534485/Goibibo/11565689_dguboy.png"
          alt=""
        />
      </div>
      <h1 className="text-2xl"> Oops! You have lost your booking data </h1>

      <div className="flex my-4">
        <Spinner color="indigo" className="mx-2" /> Redirecting...{" "}
      </div>
    </div>
  );
}
