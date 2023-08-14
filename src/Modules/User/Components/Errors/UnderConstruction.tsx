import React from "react";
import { Link } from "react-router-dom";

export default function UnderConstruction() {
  return (
    <div className="font-qs font-bold w-max mx-auto">
      <div className="w-max mx-auto my-8">
        <img
          src="https://res.cloudinary.com/dgsqarold/image/upload/v1690532863/Goibibo/11473627_kq7jjo.png"
          alt="construction"
        />
      </div>
      <div>
        <h1 className="text-2xl">
          {" "}
          Oops! You are looking page that is in under construction.
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
