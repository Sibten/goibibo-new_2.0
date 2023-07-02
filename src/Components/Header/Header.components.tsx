import React, { useEffect } from "react";
import HeaderDesktop from "./HeaderDesktop.components";
import HeaderSmall from "./HeaderSmall.components";

export default function Header() {
  useEffect(() => {
    
  }, []);

  return (
    <div>
      <div className="lg:block hidden">
        <HeaderDesktop />
      </div>
      <div className="block lg:hidden">
        <HeaderSmall />
      </div>
    </div>
  );
}
