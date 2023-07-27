import React from "react";
import Title from "../../../../Components/Utility/Title";
import BackToMenu from "../../../../Components/Admin/Menus/BackToMenu";

export default function Airbuspage() {
  return (
    <div>
      <Title text="Airbus Management" />
      <div className="bg-gray-50 rounded-md shadow-md p-2 w-[36rem] mx-auto m-2">
        <BackToMenu />
      </div>
    </div>
  );
}
