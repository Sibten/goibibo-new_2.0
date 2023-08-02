import React, { useState } from "react";
import FlightSearchHead from "./FlightSearchHead.component";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { BiLeftArrow } from "react-icons/bi";
import { HiArrowLongRight } from "react-icons/hi2";
import { date } from "../../Helper/Method";
import { FaBars } from "react-icons/fa";
import { MdClose } from "react-icons/md";

export default function FlightSearchHeadsmall() {
  const searchParams = useSelector((state: RootState) => state.SearchParms);

  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex  justify-between bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 font-qs font-bold text-white">
      {open ? (
        <div>
          <FlightSearchHead />
        </div>
      ) : (
        <div className="flex text-sm">
          <div className="flex">
            {" "}
            <span> {searchParams.from.city_name} </span>{" "}
            <span>
              {" "}
              <HiArrowLongRight className="text-xl mt-[2px] mx-2" />
            </span>{" "}
            <span>{searchParams.to.city_name}</span>
          </div>
          <div className="mx-2 border-l-2 border-gray-400 px-2">
            {date(searchParams.dept_date)}
          </div>
        </div>
      )}

      <div>
        {open ? (
          <span onClick={() => setOpen(!open)}>
            <MdClose />{" "}
          </span>
        ) : (
          <span onClick={() => setOpen(!open)}>
            <FaBars />{" "}
          </span>
        )}
      </div>
    </div>
  );
}
