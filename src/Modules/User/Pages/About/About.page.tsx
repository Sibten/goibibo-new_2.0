import React from "react";
import Title from "../../Components/Utility/Title";

export default function AboutPage() {
  return (
    <div>
      <Title text="About Us" />
      <div className="p-2 lg:w-[60%] mx-auto text-justify font-arial m-8">
        <h1 className="font-bold text-xl"> About Goibibo.com </h1>
        <p className="my-2">
          {" "}
          &emsp; Goibibo is India's leading online travel booking brand
          providing range of choice for hotels, flights, trains, bus and cars
          for travelers. Our core value differentiator is the most trusted user
          experience, be it in terms of quickest search and booking, fastest
          payments, settlement or refund processes. Through GoStays, our
          customers enjoy standardised stay experience at certified hotel
          properties. With industry first virtual travel booking currency GoCash
          and travel social network, GoCash+ Rewards - GoIbibo is the number one
          choice for new India on the move.
        </p>
        <div className="w-max mx-auto">
          <button className="mx-2 bg-orange-700 p-2 rounded-full font-qs font-bold text-white">
            Know Management
          </button>
        </div>
      </div>
    </div>
  );
}
