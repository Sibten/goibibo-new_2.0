import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch, RootState } from "../../../store";
import { APICallType, Config, Filter, ResultBase } from "../../../Types";
import { callAPI, getAPICallType } from "../../../Services/APIFetch";
import axios, { AxiosRequestConfig } from "axios";
import { useLocation } from "react-router";
import { Spinner } from "@material-tailwind/react";
import Result from "./Result";
import { ResultActions, fetchResult } from "../../../Actions/Result.action";

export default function SearchFlights({ data }: { data: Filter }) {
  const SearchParams = useSelector((state: RootState) => state.SearchParms);
  const ResultData = useSelector((state: RootState) => state.Result.data);
  const Loader = useSelector((state: RootState) => state.Result.loader);
  const dispatch = useDispatch<AppThunkDispatch>();
  const simpleDispatch = useDispatch();
  const config: AxiosRequestConfig = {
    method: "",
    url: "",
    headers: {},
  };

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
    simpleDispatch(ResultActions.setLoader());
    dispatch(fetchResult(config));
  }, [SearchParams]);

  return (
    <div>
      {Loader ? (
        <Spinner color="indigo" className="mx-4" />
      ) : (
        <Result filter={data} />
      )}
    </div>
  );
}
