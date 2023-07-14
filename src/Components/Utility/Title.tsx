import React from "react";

export default function Title({ text }: { text: string }) {
  return (
    <div className="bg-[#2176e3]  py-8 flex justify-center flex-wrap">
      <h1 className="text-white  text-xl font-bold w-full mx-8 text-center font-qs">
        {" "}
        {text}{" "}
      </h1>
    </div>
  );
}
