import React from "react";
import HomeSmall from "./HomeSmall.page";
import HomeDesktop from "./HomeDesktop.page";

export default function Homepage() {
  return (
    <div>
      <div className="lg:block hidden">
        <HomeDesktop />
      </div>
      <div className="block lg:hidden">
        <HomeSmall />
      </div>
    </div>
  );
}
