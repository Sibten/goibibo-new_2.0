import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch, RootState } from "../../../../../store";
import {
  APICallType,
  Config,
  Filter,
  ResultBase,
  ClassFare,
} from "../../../../../Types";
import { callAPI, getAPICallType } from "../../../../../Services/API.services";
import axios, { AxiosRequestConfig } from "axios";
import { Spinner } from "@material-tailwind/react";
import Result from "./Result";
import {
  ResultActions,
  fetchResult,
} from "../../../../../Actions/Result.action";

export default function SearchFlights({ data }: { data: Filter }) {
  const SearchParams = useSelector((state: RootState) => state.SearchParms);
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
      config.method = getAPICallType(APICallType.GET);
      config.url = `${
        process.env.REACT_APP_API
      }/search/get_dep_rtn_flights?start_point=${
        SearchParams.from.airport_code
      }&end_point=${SearchParams.to.airport_code}&date=${
        SearchParams.dept_date
      }&rtndate=${SearchParams.return_date}&class=${
        SearchParams.class
      }&people=${SearchParams.pepoles.adults + SearchParams.pepoles.children!}`;
    } else {
      config.method = getAPICallType(APICallType.GET);

      config.url = `${
        process.env.REACT_APP_API
      }/search/get_dep_flights?start_point=${
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
