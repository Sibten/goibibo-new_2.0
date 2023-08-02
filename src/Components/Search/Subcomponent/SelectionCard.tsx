import React from "react";
import { ResultBase } from "../../../Types";
import { calDuration, calFare, getStops, time } from "../../../Helper/Method";
import { Button } from "@material-tailwind/react";
import { HiRefresh } from "react-icons/hi";
import { GrPowerReset } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useNavigate } from "react-router-dom";
import { trackingActions } from "../../../Actions/Tracking.actions";

export default function SelectionCard({
  data,
}: {
  data: { from?: ResultBase; to?: ResultBase };
}) {
  const selector = useSelector((state: RootState) => state.SearchParms);
  let depFare = { basic: 0, tax: 0 },
    rtnFare = { basic: 0, tax: 0 };
  if (data.from && data.to) {
    depFare = calFare(
      data.from.route_id.distance,
      { basicfare: data.from.fare.fare, tax: data.from.fare.tax },
      selector.class,
      data.from.route_id.stops.length,
      data.from.available_seats,
      selector.dept_date
    );
    rtnFare = calFare(
      data.to.route_id.distance,
      { basicfare: data.to.fare.fare, tax: data.to.fare.tax },
      selector.class,
      data.to.route_id.stops.length,
      data.to.available_seats,
      selector.return_date!
    );
  }

  const navigate = useNavigate();

  const dispatch = useDispatch();

  return (
    <div className="mx-4 grid grid-cols-3 justify-between bg-white p-2 my-4 sticky top-auto rounded-md shadow-sm">
      <div className="my-2 border-r">
        {data.from ? (
          <div className="flex justify-around items-center">
            <img
              src={data.from?.airline_id.airline_icon}
              alt="airline"
              className="w-10 h-10"
            />
            <div className="text-xs">
              <p>{new Date(data.from.timing[0].source_time).toDateString()}</p>
              <p>{data.from.route_id.source_city.airport_code}</p>
              <h1 className="text-base font-bold">
                {time(data.from.timing[0].source_time)}
              </h1>
            </div>
            <div className="text-gray-500 text-xs text-center">
              <p>
                {calDuration(
                  data.from.timing[0].source_time,
                  data.from.timing[0].destination_time
                )}
              </p>
              <p>
                {data.from.route_id.stops.length == 0
                  ? "Non Stop"
                  : getStops(data.from.route_id.stops)}
              </p>
            </div>
            <div className="text-xs">
              <p>
                {new Date(data.from.timing[0].destination_time).toDateString()}
              </p>
              <p>{data.from.route_id.destination_city.airport_code}</p>
              <h1 className="text-base font-bold">
                {time(data.from.timing[0].destination_time)}
              </h1>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="my-2 border-r">
        {data.to ? (
          <div className="flex justify-around items-center">
            <img
              src={data.to?.airline_id.airline_icon}
              alt="airline"
              className="w-10 h-10"
            />
            <div className="text-xs">
              <p>{new Date(data.to.timing[0].source_time).toDateString()}</p>
              <p>{data.to.route_id.source_city.airport_code}</p>
              <h1 className="text-base font-bold">
                {time(data.to.timing[0].source_time)}
              </h1>
            </div>
            <div className="text-gray-500 text-xs text-center">
              <p>
                {calDuration(
                  data.to.timing[0].source_time,
                  data.to.timing[0].destination_time
                )}
              </p>
              <p>
                {data.to.route_id.stops.length == 0
                  ? "Non Stop"
                  : getStops(data.to.route_id.stops)}
              </p>
            </div>
            <div className="text-xs">
              <p>
                {new Date(data.to.timing[0].destination_time).toDateString()}
              </p>
              <p>{data.to.route_id.destination_city.airport_code}</p>
              <h1 className="text-base font-bold">
                {time(data.to.timing[0].destination_time)}
              </h1>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="mx-4">
        {data.from && data.to ? (
          <div className="flex items-center">
            <h1 className="font-bold text-lg">
              {" "}
              Total Fare : &#8377;
              {rtnFare.basic + rtnFare.tax + (depFare.basic + depFare.tax)}{" "}
            </h1>

            <Button
              className="my-2 mx-4"
              color="indigo"
              onClick={() => {
                dispatch(trackingActions.activeBookig());
                navigate(
                  `/flight/review/?dep_flight_no=${data.from?.flight_no}&rtn_flight_no=${data.to?.flight_no}`
                );
              }}
            >
              {" "}
              Book{" "}
            </Button>
          </div>
        ) : (
          <div className="mx-4">
            {" "}
            <h1 className="rounded-md my-2 text-xs text-gray-500 w-28 mx-auto">
              {" "}
              Note : Select the Departure Flight and Return Flight for booking
              option{" "}
            </h1>{" "}
          </div>
        )}
      </div>
    </div>
  );
}
