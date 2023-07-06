import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { Button } from "@material-tailwind/react";
import {
  SearchParamsType,
  MyProps,
  SearchType,
  callTypes,
} from "../../../Types";
import { searchActions } from "../../../Actions/Search.action";

export default function JouernyCalender({
  label,
  type,
  callback,
  callType,
}: MyProps) {
  const SearchParams = useSelector((state: RootState) => state.SearchParms);
  const dispatch = useDispatch();
  const [clickParams, setClickParams] = useState<SearchParamsType>({
    ...SearchParams,
    dept_date: SearchParams.dept_date,
    return_date: undefined,
  });

  const setParams = () => {
    console.log(clickParams);
    if (callType == callTypes.JustReturn) {
      callback!(clickParams);
    } else {
      dispatch(searchActions.setParams(clickParams));
    }
    if (callback) callback();
  };

  const getRetnVal = () => {
    return SearchParams.return_date
      ? new Date(SearchParams.return_date).toISOString().split("T")[0]
      : new Date(
          new Date().setDate(new Date(SearchParams.dept_date).getDate() + 1)
        )
          .toISOString()
          .split("T")[0];
  };
  return (
    <div className="flex flex-col">
      <label
        htmlFor=""
        className="absolute text-sm -mt-2 mx-2 bg-white px-2 font-qs font-bold text-blue-500"
      >
        {label}
      </label>
      <input
        type="date"
        min={
          type == SearchType.From
            ? new Date().toISOString().split("T")[0]
            : new Date(SearchParams.dept_date).toISOString().split("T")[0]
        }
        max={
          new Date(new Date(new Date().setMonth(new Date().getMonth() + 12)))
            .toISOString()
            .split("T")[0]
        }
        className="w-48 p-4 font-qs border text-lg font-bold text-black focus:outline-blue-500"
        defaultValue={
          type == 0
            ? new Date(clickParams.dept_date).toISOString().split("T")[0]
            : getRetnVal()
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
