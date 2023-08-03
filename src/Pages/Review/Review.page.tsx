import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch, RootState } from "../../store";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosRequestConfig } from "axios";
import { getAPICallType } from "../../Services/APIFetch";
import { APICallType, SearchType, OfferBase } from "../../Types";
import { fetchFlight } from "../../Actions/BookingFlight.action";
import { Spinner } from "@material-tailwind/react";
import Offers from "../../Components/Review/Offers";
import Tracking from "../../Components/Tracking/Tracking";
import MainContainer from "../../Components/Review/MainContainer";
import Title from "../../Components/Utility/Title";
import LostData from "../../Components/Errors/LostData";

export default function Reviewpage() {
  const result = useSelector((state: RootState) => state.Result);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppThunkDispatch>();
  const location = useLocation();

  const url = new URLSearchParams(location.search);
  useEffect(() => {
    if (result.data.dep.length == 0) {
      setTimeout(() => {
        navigate("/flight");
      }, 1000);
    }
    if (url.get("dep_flight_no")) {
      const config: AxiosRequestConfig = {
        method: getAPICallType(APICallType.GET),
        url: `${process.env.REACT_APP_API}/flight/get_flight?flightno=${url.get(
          "dep_flight_no"
        )}`,
        headers: {},
      };
      dispatch(fetchFlight({ config: config, type: SearchType.From }));
    }

    if (url.get("rtn_flight_no")) {
      const config: AxiosRequestConfig = {
        method: getAPICallType(APICallType.GET),
        url: `${process.env.REACT_APP_API}/flight/get_flight?flightno=${url.get(
          "rtn_flight_no"
        )}`,
        headers: {},
      };
      dispatch(fetchFlight({ config: config, type: SearchType.To }));
    }
  }, []);

  return result.data.dep.length > 0 ? (
    <div className="bg-[#e9eef7]">
      {/* <Tracking /> */}
      <Title text="Review your booking" />
      <div>
        <MainContainer isReturn={url.get("rtn_flight_no") ? true : false} />
      </div>
    </div>
  ) : (
    <LostData />
  );
}
