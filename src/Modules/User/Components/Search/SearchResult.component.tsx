import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

import FilterCard, { defFilter } from "./Subcomponent/FliterCard";
import SearchFlights from "./Subcomponent/SearchFlights";
import { Filter } from "../../../../Types";

export default function SearchResult() {
  // const SearchParams = useSelector((state: RootState) => state.SearchParms);
  const [filter, setFilter] = useState<Filter>(defFilter);

  const handlecallBack = (data: Filter) => {
    setFilter(data);
  };
  return (
    <div className="flex bg-[#e1e7ee]">
      <div>
        <FilterCard callback={handlecallBack} />
      </div>
      <div className="w-full p-2">
        <div className="font-arial">
          <SearchFlights data={filter} />
        </div>
      </div>
    </div>
  );
}
