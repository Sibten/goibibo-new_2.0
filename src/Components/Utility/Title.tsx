import { url } from "inspector";
import React from "react";
import "./Style.css";
export default function Title({ text, img }: { text: string; img?: string }) {
  return (
    <div className="title py-8 flex justify-center flex-wrap print:hidden">
      <h1 className="text-white  text-xl font-bold w-full mx-8 text-center font-qs">
        {" "}
        {text}{" "}
      </h1>
    </div>
  );
}
