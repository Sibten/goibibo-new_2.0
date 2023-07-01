import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { RootState } from "../../store";
import { SearchParamsType, SearchType } from "../../Types";
import { searchActions } from "../../Actions/Search.action";

export default function FlightSearchHead() {
  const location = useLocation();
  const url = new URLSearchParams(location.search);

  const SearchParams = useSelector((state: RootState) => state.SearchParms);
  const Airports = useSelector((state: RootState) => state.Airports);
  const dispatch = useDispatch();

  let URLSearchParamsData: SearchParamsType = { ...SearchParams };

  useEffect(() => {
    if (Airports) {
      URLSearchParamsData.from =
        Airports.find((s) => s.airport_code === url.get("from")) ??
        SearchParams.from;
      URLSearchParamsData.to =
        Airports.find((s) => s.airport_code === url.get("to")) ??
        SearchParams.to;
      console.log(URLSearchParamsData);

      dispatch(searchActions.setParams(URLSearchParamsData));
    }
  }, [Airports]);

  return (
    <div className="bg-blue-700 sticky top-0 text-white  p-4">
      {url.get("dep_date")}
    </div>
  );
}
