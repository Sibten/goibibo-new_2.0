import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { Button } from "@material-tailwind/react";
import { SearchParamsType, MyProps } from "../../../Types";
import { searchActions } from "../../../Actions/Search.action";

export default function JouernyCalender({ type }: MyProps) {
  const SearchParams = useSelector((state: RootState) => state.SearchParms);
  const dispatch = useDispatch();
  const [clickParams, setClickParams] = useState<SearchParamsType>({
    ...SearchParams,
    dept_date: SearchParams.dept_date,
    return_date: SearchParams.return_date,
  });

  const setParams = () => {
    console.log(clickParams);
    dispatch(searchActions.setParams(clickParams));
  };
  return (
    <div className="flex flex-col">
      <label
        htmlFor=""
        className="absolute text-sm -mt-2 mx-2 bg-white px-2 font-qs font-bold text-blue-500"
      >
        Departure
      </label>
      <input
        type="date"
        min={new Date().toISOString().split("T")[0]}
        max={
          new Date(new Date(new Date().setMonth(new Date().getMonth() + 12)))
            .toISOString()
            .split("T")[0]
        }
        className="w-48 p-4 font-qs border text-lg font-bold text-black focus:outline-blue-500"
        value={
          type == 0
            ? new Date(clickParams.dept_date).toISOString().split("T")[0]
            : new Date(clickParams.return_date!).toISOString().split("T")[0]
        }
        onChange={(e) =>
          type == 0
            ? setClickParams({ ...clickParams, dept_date: e.target.value })
            : setClickParams({ ...clickParams, return_date: e.target.value })
        }
      />
      <h2 className="mx-1 my-1">
        {" "}
        Selected Date :{" "}
        {type == 0
          ? clickParams.dept_date.split("T")[0]
          : clickParams.return_date?.split("T")[0]}
      </h2>
      <Button className="my-2" onClick={() => setParams()}>
        Done
      </Button>
    </div>
  );
}
