import React, { useEffect, useState } from "react";
import BackToMenu from "../../../../Components/Admin/Menus/BackToMenu";
import Title from "../../../../Components/Utility/Title";
import { Input, Select, Option, Button, Alert } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch, RootState } from "../../../../store";
import { Route } from "../../../../Types";
import { fetchRoutes } from "../../../../Actions/Admin/Route.action";

export default function ScheduleFlightpage() {
  const dispatch = useDispatch<AppThunkDispatch>();
  useEffect(() => {
    if (routes.length == 0) dispatch(fetchRoutes());
  }, []);

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

  const [scheduleFlightData, setScheduleFlightData] = useState<{
    route_id: string;
    airbus_code: string;
    source_time: string;
    destination_time: string;
  }>({ route_id: "", airbus_code: "", source_time: "", destination_time: "" });

  return (
    <div>
      <Title text="Schedule Flight" />
      <div className="border p-2  w-96 m-4 mx-auto font-arial">
        <BackToMenu />
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
                let data = routes.filter(
                  (s) =>
                    s.destination_city.airport_code == routeSearchParams.from &&
                    s.source_city.airport_code == routeSearchParams.to
                );
                console.log(data);
                if (data.length == 0) {
                  setMessage({ type: 1, message: "No Route avaliable" });

                  setTimeout(() => {
                    setMessage({ type: null, message: null });
                  }, 2000);
                }
                setAvaliableRoutes([...data]);
              }
            }}
            className="text-xs w-max mx-1"
          >
            {" "}
            Find Route
          </Button>
        </div>
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
                    {s.route_id}
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
                    route_id: e.target.value,
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
                    ? new Date(scheduleFlightData.source_time).toISOString()
                    : new Date().toISOString().split("T")[0]
                }
                onChange={(e) =>
                  setScheduleFlightData({
                    ...scheduleFlightData,
                    route_id: e.target.value,
                  })
                }
              />
            </div>
            <div className="my-8">
              <Select label="Select Airbus">
                {airbus.map((s) => (
                  <Option key={s.airbus_code}>
                    {" "}
                    <p> {s.airbus_code} </p>
                  </Option>
                ))}
              </Select>
            </div>
            <div>
              <Button color="indigo">Schedule Flight</Button>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
