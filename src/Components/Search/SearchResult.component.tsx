import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { HiArrowNarrowRight } from "react-icons/hi";
import SearchCard from "./Subcomponent/SearchCard";
import FilterCard from "./Subcomponent/FliterCard";

export default function SearchResult() {
  const SearchParams = useSelector((state: RootState) => state.SearchParms);

  return (
    <div className="grid grid-cols-4 bg-[#e1e7ee]">
      <div>
        <FilterCard />
      </div>
      <div className="col-span-3 p-2">
        <div className="mx-4 my-2">
          <h1 className="font-qs font-bold text-sm flex">
            {SearchParams.from.city_name}{" "}
            <HiArrowNarrowRight className="mx-2 mt-1" />{" "}
            {SearchParams.to.city_name}
          </h1>
          <small className="font-arial text-gray-800">Showing 10 Flights</small>
        </div>
        <div className="font-arial">
          <SearchCard />
        </div>
      </div>
    </div>
  );
}
