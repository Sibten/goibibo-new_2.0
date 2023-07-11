import React, { useEffect } from "react";
import FlightDetails from "../../Components/Review/FlightDetails";
import PaymentDetails from "../../Components/Review/PaymentDetails";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch, RootState } from "../../store";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosRequestConfig } from "axios";
import { getAPICallType } from "../../Services/APIFetch";
import { APICallType, SearchType } from "../../Types";
import { fetchFlight } from "../../Actions/BookingFlight.action";
import { Spinner } from "@material-tailwind/react";

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
    } else {
      const config: AxiosRequestConfig = {
        method: getAPICallType(APICallType.GET),
        url: `http://localhost:5050/flight/get_flight?flightno=${url.get(
          "dep_flight_no"
        )}`,
        headers: {},
      };

      dispatch(fetchFlight({ config: config, type: SearchType.From }));
    }
  }, []);

  return result.data.dep.length > 0 ? (
    <div className="bg-[#e9eef7]">
      <div className="bg-[#2176e3] h-[24rem] py-8 flex justify-center flex-wrap">
        <h1 className="text-white font-arial text-xl font-bold w-full mx-8 text-center">
          {" "}
          Review Your Booking{" "}
        </h1>
        <FlightDetails />
        <PaymentDetails />
      </div>
    </div>
  ) : (
    <div className="font-qs font-bold p-4">
      {" "}
      <h1> Oops! You have lost your booking data </h1>
      <div className="flex my-4">
        <Spinner color="indigo" className="mx-2" /> Redirecting...{" "}
      </div>
    </div>
  );
}
