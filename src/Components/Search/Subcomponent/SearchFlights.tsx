import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch, RootState } from "../../../store";
import { APICallType, Config, Filter, ResultBase } from "../../../Types";
import { callAPI, getAPICallType } from "../../../Services/APIFetch";
import axios, { AxiosRequestConfig } from "axios";
import { useLocation } from "react-router";
import { Spinner } from "@material-tailwind/react";
import Result from "./Result";
import { fetchResult } from "../../../Actions/Result.action";

export default function SearchFlights({ data }: { data: Filter }) {
  const SearchParams = useSelector((state: RootState) => state.SearchParms);
  const ResultData = useSelector((state: RootState) => state.Result);
  const dispatch = useDispatch<AppThunkDispatch>();
  const config: AxiosRequestConfig = {
    method: "",
    url: "",
    headers: {},
  };

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (SearchParams.return_date) {
      console.log("Retn date...");
    } else {
      config.method = getAPICallType(APICallType.GET);
      config.url = `http://localhost:5050/search/get_flights?start_point=${
        SearchParams.from.airport_code
      }&end_point=${SearchParams.to.airport_code}&date=${
        new Date(SearchParams.dept_date).toISOString().split("T")[0]
      }&class=${SearchParams.class}&people=${
        SearchParams.pepoles.adults + SearchParams.pepoles.children!
      }`;
    }
    setLoader(true);

    dispatch(fetchResult(config));
  }, [SearchParams]);

  useEffect(() => {
    setLoader(false);
  }, [ResultData]);

  return (
    <div>{loader ? <Spinner color="indigo" /> : <Result filter={data} />}</div>
  );
}
