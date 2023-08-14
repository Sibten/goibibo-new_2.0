import React, { useEffect, useState } from "react";
import BackToMenu from "../../../Components/Menus/BackToMenu";
import Title from "../../../../User/Components/Utility/Title";
import { Input, Select, Option, Button, Alert } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch, RootState } from "../../../../../store";
import { Route, SearchType, callTypes } from "../../../../../Types";
import { fetchRoutes } from "../../../../../Actions/Admin/Route.action";
import { fetchAirbus } from "../../../../../Actions/Admin/Airbuses.action";
import { ToastContainer, toast } from "react-toastify";
import Loaderdialog from "../../../../User/Components/Dialog/Loader.dialog";
import { postAPI } from "../../../../../Services/API.services";
import { fetchAirlineFlights } from "../../../../../Actions/Admin/AirlineFlights.action";

export default function ScheduleFlightpage() {
  const dispatch = useDispatch<AppThunkDispatch>();

  const city = useSelector((state: RootState) => state.Airports);
  const routes = useSelector((state: RootState) => state.Routes);
  const airbus = useSelector((state: RootState) => state.Airbuses);
  const [avaliableRoutes, setAvaliableRoutes] = useState<Array<Route>>([]);
  const [routeSearchParams, setRouteSearchParams] = useState<{
    from: string;
    to: string;
  }>({ from: "", to: "" });
  const [message, setMessage] = useState<{
    type: number | null;
    message: string | null;
  }>();

  const [loading, setLoading] = useState(false);
  const [scheduleFlightData, setScheduleFlightData] = useState<{
    route_id: string;
    airbus_code: string;
    source_time: string;
    destination_time: string;
  }>({ route_id: "", airbus_code: "", source_time: "", destination_time: "" });

  const scheduleFlight = async () => {
    // //  console.log(scheduleFlightData);
    const data = JSON.stringify(scheduleFlightData);
    setLoading(true);

    try {
      const res = await postAPI("/flight/schedule", data);
      if (res.status == 200) {
        setLoading(false);
        toast.success("Flight Scheduleded!", { position: "bottom-right" });
        setAvaliableRoutes([]);
        dispatch(fetchAirlineFlights());
      } else {
        toast.error("Unable to Schedule Flight", { position: "bottom-right" });
      }
    } catch (e) {
      toast.error("Something bad happen!", { position: "bottom-right" });
    }
  };

  return (
    <div className="pb-8">
      {loading ? <Loaderdialog /> : ""}
      <Title text="Schedule Flight" />
      <div className="border border-gray-300 rounded-md  p-4 w-[36rem] mx-auto m-8 font-arial">
        <BackToMenu />
        <h1 className="mx-2 font-bold mt-4 text-center">
          {" "}
          Flight Information{" "}
        </h1>
        <div className="my-8 font-arial">
          <Select
            className="h-12 w-full"
            label="Select Source"
            onChange={(e) =>
              setRouteSearchParams({ ...routeSearchParams, from: e ?? "" })
            }
          >
            {city.map((s) => (
              <Option
                key={s.city_id}
                value={s.airport_code}
                className="w-full overflow-hidden flex flex-col"
              >
                <p className="text-base font-bold"> {s.city_name}</p>
                <span className="text-xs"> {s.airport_name}</span>
              </Option>
            ))}
          </Select>
        </div>
        <div className="my-8 font-arial">
          <Select
            label="Select Destination"
            size="lg"
            className="h-12 "
            onChange={(e) =>
              setRouteSearchParams({ ...routeSearchParams, to: e ?? "" })
            }
          >
            {city.map((s) => (
              <Option
                key={s.city_id}
                value={s.airport_code}
                className="w-full overflow-hidden truncate"
              >
                <p className="text-base font-bold"> {s.city_name}</p>
                <span className="truncate text-xs">{s.airport_name}</span>
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <Button
            onClick={() => {
              if (routeSearchParams.from == routeSearchParams.to) {
                setMessage({
                  type: 0,
                  message: "Source and Destination must be unique!",
                });
                setTimeout(
                  () => setMessage({ type: null, message: null }),
                  2000
                );
              } else {
                // //  console.log(routes);
                let data = routes.filter(
                  (s) =>
                    s.destination_city.airport_code == routeSearchParams.to &&
                    s.source_city.airport_code == routeSearchParams.from
                );
                // //  console.log(data);
                if (data.length == 0) {
                  setMessage({ type: 1, message: "No Route avaliable" });

                  setTimeout(() => {
                    setMessage({ type: null, message: null });
                  }, 2000);
                }
                setAvaliableRoutes([...data]);
              }
            }}
            className="bg-pink-600 text-xs w-max mx-1"
          >
            {" "}
            Find Route
          </Button>
        </div>

        {avaliableRoutes.length > 0 ? (
          <>
            {" "}
            <div className="my-4">
              <Select
                label="Select Route"
                onChange={(e) => {
                  if (e) {
                    setScheduleFlightData({
                      ...scheduleFlightData,
                      route_id: e,
                    });
                  }
                }}
              >
                {avaliableRoutes.map((s) => (
                  <Option key={s.route_id} value={s.route_id}>
                    {s.route_id}&nbsp;[{s.stops.length} stop(s)]
                  </Option>
                ))}
              </Select>
            </div>
            <div className="my-8 font-arial">
              <Input
                type="datetime-local"
                label="Source Time"
                min={new Date().toISOString().slice(0, -8)}
                onChange={(e) =>
                  setScheduleFlightData({
                    ...scheduleFlightData,
                    source_time: e.target.value,
                  })
                }
              />
            </div>
            <div className="my-8 font-arial">
              <Input
                type="datetime-local"
                label="Destination Time"
                min={
                  scheduleFlightData.source_time
                    ? new Date(scheduleFlightData.source_time)
                        .toISOString()
                        .slice(0, -8)
                    : new Date().toISOString().slice(0, -8)
                }
                onChange={(e) =>
                  setScheduleFlightData({
                    ...scheduleFlightData,
                    destination_time: e.target.value,
                  })
                }
              />
            </div>
            <div className="my-8">
              <Select
                label="Select Airbus"
                onChange={(e) =>
                  setScheduleFlightData({
                    ...scheduleFlightData,
                    airbus_code: e ?? "",
                  })
                }
              >
                {airbus.map((s) => (
                  <Option key={s.airbus_code} value={s.airbus_code}>
                    {" "}
                    <p> {s.airbus_code} </p>
                  </Option>
                ))}
              </Select>
            </div>
            <div>
              <Button
                color="indigo"
                onClick={() => {
                  const d = Object.values(scheduleFlightData).every(
                    (s) => s != ""
                  );
                  if (
                    d &&
                    new Date(scheduleFlightData.destination_time) >
                      new Date(scheduleFlightData.source_time)
                  ) {
                    scheduleFlight();
                  } else {
                    setMessage({
                      type: 0,
                      message: "Value can't be empty or provide proper value",
                    });
                    setTimeout(
                      () => setMessage({ type: null, message: null }),
                      2000
                    );
                  }
                }}
              >
                Schedule Flight
              </Button>
            </div>
          </>
        ) : (
          ""
        )}
        {message?.message ? (
          <Alert
            className={`${
              message.type == 0
                ? "bg-red-50 text-red-500"
                : "bg-green-50 text-green-600 "
            }  text-xs font-arial p-2 my-2`}
          >
            {message.message}
          </Alert>
        ) : (
          ""
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
