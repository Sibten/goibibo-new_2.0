import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Radio } from "@material-tailwind/react";

export default function FlightSearchHead() {
  const SearchParams = useSelector((state: RootState) => state.SearchParms);
  return (
    <div className="bg-blue-700 sticky top-0 text-white">
      <div>
        <Radio
          defaultChecked={SearchParams.return_date ? false : true}
          label="Oneway trip"
        />
        <Radio
          defaultChecked={SearchParams.return_date ? true : false}
          label="Round trip"
        />
      </div>
    </div>
  );
}
