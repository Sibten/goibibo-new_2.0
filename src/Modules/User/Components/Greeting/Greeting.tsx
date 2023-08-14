import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

export default function Greeting() {
  const user = useSelector((state: RootState) => state.Admin);
  const time = new Date().getHours();
  let greeting = "";
  if (time >= 0 && time < 12) {
    greeting = "Good Morning!";
  } else if (time >= 12 && time < 17) {
    greeting = "Good Afternoon!";
  } else {
    greeting = "Good Evening!";
  }

  return (
    <div className=" rounded-md p-2 m-2 text-black font-bold font-arial">
      <h1>
        {" "}
        {greeting} {user.first_name} {user.last_name}.{" "}
        <span className="text-base font-normal">
          {" "}
          Welcome to the Goibibo Airline Admin Dashboard.
        </span>
      </h1>
    </div>
  );
}
