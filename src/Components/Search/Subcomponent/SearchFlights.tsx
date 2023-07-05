import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch, RootState } from "../../../store";
import { APICallType, Config, ResultBase } from "../../../Types";
import { callAPI, getAPICallType } from "../../../Services/APIFetch";
import axios, { AxiosRequestConfig } from "axios";
import { useLocation } from "react-router";
import { Spinner } from "@material-tailwind/react";
import Result from "./Result";
import ResultAction, {
  ResultActions,
  fetchResult,
} from "../../../Actions/Result.action";

export default function SearchFlights() {
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
    if (ResultData.length > 0) {
      setLoader(false);
    }
  }, [ResultData]);

  return <div>{loader ? <Spinner color="indigo" /> : <Result />}</div>;
}
