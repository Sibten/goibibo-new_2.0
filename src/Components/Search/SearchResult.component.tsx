import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { HiArrowNarrowRight } from "react-icons/hi";
import FilterCard, { defFilter } from "./Subcomponent/FliterCard";
import SearchFlights from "./Subcomponent/SearchFlights";
import { Filter } from "../../Types";

export default function SearchResult() {
  const SearchParams = useSelector((state: RootState) => state.SearchParms);
  const [filter, setFilter] = useState<Filter>(defFilter);

  const handlecallBack = (data: Filter) => {
    setFilter(data);
  };
  return (
    <div className="grid grid-cols-4 bg-[#e1e7ee]">
      <div>
        <FilterCard callback={handlecallBack} />
      </div>
      <div className="col-span-3 p-2">
        <div className="mx-4 my-2">
          <h1 className="font-qs font-bold text-sm flex">
            {SearchParams.from.city_name}{" "}
            <HiArrowNarrowRight className="mx-2 mt-1" />{" "}
            {SearchParams.to.city_name}
          </h1>
        </div>
        <div className="font-arial">
          <SearchFlights data={filter} />
        </div>
      </div>
    </div>
  );
}
