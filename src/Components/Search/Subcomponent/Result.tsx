import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import SearchCard from "./SearchCard";
import { ResultBase } from "../../../Types";

export default function Result() {
  const [result, setResult] = useState<Array<ResultBase>>([]);
  const selector = useSelector((state: RootState) => state.Result);
  const SearchParms = useSelector((state: RootState) => state.SearchParms);
  useEffect(() => {
    if (selector.length > 0) {
      const time = new Date(new Date(SearchParms.dept_date).setHours(12, 0));
      setResult(selector.filter((s) => new Date(s.timing.source_time) >= time));
    }
  }, [selector]);
  return (
    <div>
      <p className="mx-4 text-xs">Showing {result.length} flights</p>
      {result.map((result) => (
        <SearchCard value={result} key={result.timing.source_time} />
      ))}
    </div>
  );
}
