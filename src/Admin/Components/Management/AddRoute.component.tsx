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

import { ToastContainer, toast } from "react-toastify";
import { fetchRoutes } from "../../../Actions/Admin/Route.action";
import Loaderdialog from "../../../Components/Dialog/Loader.dialog";
import { postAPI } from "../../../Services/API.services";

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
  const [loading, setLoading] = useState<boolean>(false);

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
      newRouteData.destination_city &&
      newRouteData.source_city &&
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
    setLoading(true);
    const data = JSON.stringify(newRouteData);

    try {
      const res = await postAPI("/route/addroute", data);
      if (res.status == 200) {
        toast.success("Route Added Successfully", { position: "bottom-right" });
        dispatch(fetchRoutes());
      } else toast.error("Unable to add Route!");
      setLoading(false);
    } catch (e) {
      toast.error("Something bad happen!", { position: "bottom-right" });
      setLoading(false);
    }
  };

  return (
    <div className="mx-4">
      {loading ? <Loaderdialog /> : ""}
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
            <button
              className="mx-2 font-bold text-black"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
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
