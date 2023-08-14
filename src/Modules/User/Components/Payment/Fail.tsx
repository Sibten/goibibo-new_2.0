import React from "react";
import Title from "../Utility/Title";

export default function Fail() {
  return (
    <div>
      <Title text="Payment" />
      <div className="bg-gray-50 rounded-lg w-max mx-auto m-2 p-4 shadow-md">
        <img
          src="https://res.cloudinary.com/dgsqarold/image/upload/v1689828032/Goibibo/9503179_acrnyx.png"
          alt="fail"
        />
      </div>
    </div>
  );
}
