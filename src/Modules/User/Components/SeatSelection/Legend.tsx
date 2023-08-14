import React from "react";
import { Alert } from "@material-tailwind/react";

export default function Legend() {
  return (
    <div className="p-4 border rounded-md mx-4">
      <h1 className="border-b font-qs font-bold my-2 text-black"> Legend </h1>
      <div className="flex">
        <ul className="text-sm">
          <li className="flex items-center my-1">
            <div className="text-xs w-8 h-8 rounded-full border  border-blue-300 text-center text-white bg-blue-400"></div>
            <span className="mx-2"> Booked Seat</span>
          </li>
          <li className="flex items-center my-1">
            <div className="text-xs w-8 h-8 rounded-full border  border-blue-300 text-center text-white "></div>
            <span className="mx-2"> Window Seat </span>
          </li>
          <li className="flex items-center my-1">
            <div className="text-xs w-8 h-8 rounded-full border  border-gray-300 text-center"></div>
            <span className="mx-2"> Middle Seat </span>
          </li>
          <li className="flex items-center my-1">
            <div className="text-xs w-8 h-8 rounded-full border border-cyan-300 text-center"></div>
            <span className="mx-2"> Aisle Seat</span>
          </li>
          <li className="flex items-center my-1">
            <div className="text-xs w-8 h-8 rounded-full border  bg-green-100 text-center "></div>
            <span className="mx-2"> Selected Seat</span>
          </li>
        </ul>
        <div className="text-sm my-1 mx-2">
          <p className="font-bold">Seat Number </p>
          <p className="text-xs"> &lt; Number &gt; &lt; Alphabet &gt; </p>
        </div>
      </div>
      <Alert className="w-[18rem] bg-blue-100 text-blue-800 p-1 text-xs mt-1">
        {" "}
        If you are selecting Window Seat then, You need to pay more charges.{" "}
      </Alert>
    </div>
  );
}
