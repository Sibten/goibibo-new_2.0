import {
  Alert,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import ReactSelect from "react-select";
import { AppThunkDispatch, RootState } from "../../../store";
import { AirportType } from "../../../Types";
import Cookies from "js-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { getStops } from "../../../Helper/Method";
import { fetchRoutes } from "../../../Actions/Admin/Route.action";

export default function AddRouteComponent() {
  const [open, setOpen] = useState<boolean>(false);
  const city = useSelector((state: RootState) => state.Airports);

  const [options, setOptions] = useState<
    Array<{ value: number; label: string }>
  >([{ value: 0, label: "Default" }]);
  const [selectedOptions, setSelectedOptions] = useState<
    Array<{ value: number; label: string }>
  >([{ value: 0, label: "Default" }]);

  useEffect(() => {
    options.splice(0, options.length);
    city.forEach((s) => options.push({ value: s.city_id, label: s.city_name }));
    setOptions([...options]);
  }, []);

  const [newRouteData, setNewRouteData] = useState<{
    source_city: string;
    destination_city: string;
    stops: Array<string>;
  }>({ source_city: "", destination_city: "", stops: [] });

  const [message, setMessage] = useState("");
  const dispatch = useDispatch<AppThunkDispatch>();

  const addRoute = () => {
    newRouteData.stops.splice(0, newRouteData.stops.length);
    selectedOptions.forEach((s) =>
      newRouteData.stops.push(
        city.find((d) => d.city_id == s.value)?.airport_code ?? ""
      )
    );
    if (newRouteData.stops[0] == "")
      newRouteData.stops.splice(0, newRouteData.stops.length);
    setNewRouteData({ ...newRouteData });
    selectedOptions.splice(0, selectedOptions.length);
    setSelectedOptions([...selectedOptions]);

    if (
      newRouteData.destination_city != newRouteData.source_city &&
      !newRouteData.stops.includes(
        newRouteData.destination_city || newRouteData.source_city
      )
    ) {
      confirmRoute();
      setOpen(false);
      dispatch(fetchRoutes());
    } else {
      setMessage("Please Check Route Source or destination with stops!");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  const confirmRoute = async () => {
    const data = JSON.stringify(newRouteData);

    let config = {
      method: "post",
      url: "http://localhost:5050/route/addroute",
      headers: {
        token: Cookies.get("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const res = await axios(config);
      if (res.status == 200) {
        toast.success("Route Added Successfully", { position: "bottom-right" });
      } else toast.error("Unable to add Route!");
    } catch (e) {
      toast.error("Something bad happen!", { position: "bottom-right" });
    }
  };

  return (
    <div className="mx-4">
      <div>
        <button
          className="bg-indigo-500 p-1 font-arial flex font-bold px-2 text-white rounded-full"
          onClick={() => setOpen(!open)}
        >
          <BiPlus size="20px" className="mr-1" />{" "}
          <small className="text-sm">Add New Route</small>
        </button>
      </div>
      <div>
        <Dialog open={open} handler={setOpen} size="xs">
          <DialogHeader>Add New Route</DialogHeader>
          <DialogBody>
            <div className="my-2">
              <Select
                label="Select Source"
                onChange={(e) =>
                  setNewRouteData({ ...newRouteData, source_city: e ?? "" })
                }
              >
                {city.map((s) => (
                  <Option value={s.airport_code} key={s.city_id}>
                    {s.city_name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="my-2">
              <Select
                label="Select Destination"
                onChange={(e) =>
                  setNewRouteData({
                    ...newRouteData,
                    destination_city: e ?? "",
                  })
                }
              >
                {city.map((s) => (
                  <Option value={s.airport_code} key={s.city_id}>
                    {s.city_name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="my-2">
              <ReactSelect
                options={options}
                isMulti
                isOptionDisabled={() => selectedOptions.length >= 3}
                onChange={(e) => {
                  selectedOptions.splice(0, selectedOptions.length);
                  selectedOptions.push(...e);
                  setSelectedOptions([...selectedOptions]);
                }}
              />
            </div>
            <Alert className="bg-blue-50 text-blue-500 p-1 text-sm">
              {" "}
              You can select stops upto 3 stops
            </Alert>
          </DialogBody>
          <DialogFooter>
            {message ? (
              <Alert className="bg-red-50 text-red-500 p-1 my-2 text-sm">
                {message}
              </Alert>
            ) : (
              ""
            )}
            <Button
              variant="outlined"
              color="gray"
              className="mx-2"
              onClick={() => setOpen(!open)}
            >
              Cancel
            </Button>
            <Button color="indigo" onClick={() => addRoute()}>
              Add Route
            </Button>
          </DialogFooter>
        </Dialog>
      </div>

      <ToastContainer />
    </div>
  );
}