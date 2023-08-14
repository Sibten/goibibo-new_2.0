import React from "react";
import { Link } from "react-router-dom";

export default function Pagenotfound() {
  return (
    <div className="font-qs font-bold m-4 w-max mx-auto">
      <div className="mx-auto w-max flex relative">
        <div className="absolute bottom-0">
          <h1 className="font-arial text-8xl text-gray-400"> 404 </h1>
        </div>
        <img
          src="https://res.cloudinary.com/dgsqarold/image/upload/v1690533855/Goibibo/7871481_rn9tp0.png"
          alt="not found"
        />
      </div>
      <div>
        <h1 className="text-2xl my-4">
          Oops! You are looking page that is not actually present.
        </h1>
        <div className="text-center text-lg w-max p-2 mx-auto bg-orange-600 rounded-full my-4 text-white">
          <Link to="/">
            {" "}
            <button>Go to Home page</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
