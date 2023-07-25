import React from "react";
import { HiArrowLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";

export default function BackToMenu() {
  return (
    <Link to="/admin/management">
      <div className="flex rounded-full p-2 border font-arial text-sm w-max my-2">
        <HiArrowLeft className="mx-2 my-1" /> Back to menus
      </div>
    </Link>
  );
}
