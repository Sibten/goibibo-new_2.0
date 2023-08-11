import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { AddonBase } from "../../../Types";
import {
  Alert,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { AppThunkDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { fetchAirlineFlights } from "../../../Actions/Admin/AirlineFlights.action";
import { postAPI } from "../../../Services/API.services";

export default function AddSchedulededFlightcomponent({
  flightno,
}: {
  flightno: string;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(!open);
  const [scheduleFlightData, setScheduleFlightData] = useState<{
    route_id: string;
    airbus_code: string;
    source_time: string;
    destination_time: string;
  }>({ route_id: "", airbus_code: "", source_time: "", destination_time: "" });

  const selector = useSelector((state: RootState) => state.AirlineFlight);

  useEffect(() => {
    setLoading(false);
    const findFlight = selector.find((s) => s.flight_no == flightno);
    scheduleFlightData.airbus_code = findFlight?.airbus_id.airbus_code ?? "";
    scheduleFlightData.route_id = findFlight?.route_id.route_id ?? "";
  }, [selector]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppThunkDispatch>();
  const schedule = async () => {
    if (
      new Date(scheduleFlightData.source_time) <
      new Date(scheduleFlightData.destination_time)
    ) {
      try {
        const data = JSON.stringify(scheduleFlightData);
        setLoading(true);

        const res = await postAPI("/flight/schedule", data);
        if (res.status == 200) {
          toast.success("Flight Successfully Schedulded!");
          dispatch(fetchAirlineFlights());
        } else {
          toast.error("Unable to schedule!");
        }
      } catch (e) {
        toast.error("Something bad happen!");
      }
      setLoading(false);
      setOpen(!open);
    } else {
      setError(
        "Source time must be lesser than destination time or all field are required."
      );
      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <div>
      <button
        className="w-max bg-indigo-800 text-white p-1 flex rounded-full text-sm m-1 px-2"
        onClick={(e) => {
          e.preventDefault();
          handleOpen();
        }}
      >
        <MdAdd className="text-lg mr-2" /> Schedule New
      </button>
      <Dialog handler={setOpen} open={open}>
        <DialogHeader>Schedule Flight {flightno}</DialogHeader>
        <DialogBody>
          <div className="my-4">
            <Input
              label="Airbus Code"
              defaultValue={scheduleFlightData.airbus_code}
              disabled
            />
          </div>
          <div className="my-4">
            <Input
              label="Route ID"
              defaultValue={scheduleFlightData.route_id}
              disabled
            />
          </div>
          <div className="my-4">
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
          <div className="my-4">
            <Input
              type="datetime-local"
              min={new Date().toISOString().slice(0, -8)}
              label="Destination Time"
              onChange={(e) =>
                setScheduleFlightData({
                  ...scheduleFlightData,
                  destination_time: e.target.value,
                })
              }
            />
          </div>
          {error ? (
            <Alert className="text-sm bg-red-50 text-red-500">{error}</Alert>
          ) : (
            ""
          )}
        </DialogBody>
        <DialogFooter>
          {loading ? (
            <div className="flex">
              {" "}
              <Spinner /> Scheduling...
            </div>
          ) : (
            <>
              <button onClick={() => setOpen(!open)}> Cancel </button>
              <Button color="pink" onClick={() => schedule()}>
                {" "}
                Schedule{" "}
              </Button>{" "}
            </>
          )}
        </DialogFooter>
      </Dialog>
      <ToastContainer />
    </div>
  );
}
