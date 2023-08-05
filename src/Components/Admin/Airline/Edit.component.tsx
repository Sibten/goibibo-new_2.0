import React, { useState } from "react";
import { Airline } from "../../../Types";
import { Button, Input } from "@material-tailwind/react";
import { FaPen } from "react-icons/fa";
import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppThunkDispatch } from "../../../store";
import { fetchAirlineDetails } from "../../../Actions/Admin/Airline.action";
import { callAPI } from "../../../Services/APIFetch";

export default function Editcomponent({ data }: { data: Airline }) {
  const [airlineData, setAirlineData] = useState<Airline>(data);
  const dispatch = useDispatch<AppThunkDispatch>();
  const updateAirline = async () => {
    let data = JSON.stringify({
      airline_id: airlineData.airline_id,
      airline_name: airlineData.airline_name,
      airline_location: airlineData.airline_location,
      airline_code: airlineData.airline_code,
    });
    let config: AxiosRequestConfig = {
      method: "put",
      url: `${process.env.REACT_APP_API}/airlines/myairline/update`,
      headers: {
        // token: Cookies.get("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    const res = await axios(config);

    if (res.data.update) {
      toast.success("Airline update successfully.", {
        position: "bottom-right",
      });
      dispatch(fetchAirlineDetails());
    } else {
      toast.error("Unable to update Airline", { position: "bottom-right" });
    }
  };

  const [fileIcon, setFileIcon] = useState<any>();

  const updateIcon = () => {
    const formdata = new FormData();
    formdata.append("file", fileIcon);

    axios
      .patch(
        `${process.env.REACT_APP_API}/airlines/myairline/update/uploadicon`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // token: Cookies.get("token"),
          },
        }
      )
      .then((s) => {
        if (s.data.update)
          toast.success("Icon updated successfully!", {
            position: "bottom-right",
          });
        else
          toast.error("Unable to update", {
            position: "bottom-right",
          });
      })
      .catch((e) =>
        toast.error("Unable to update!", {
          position: "bottom-right",
        })
      );
  };
  return (
    <div className="  rounded-md w-[24rem] mx-auto p-4">
      <h1 className="font-bold text-xl text-indigo-600 flex my-4">
        {" "}
        <FaPen className="mt-1 mx-2" /> Edit Airline{" "}
      </h1>
      <div className="my-2">
        <Input
          label="Airline Name"
          defaultValue={airlineData.airline_name}
          onChange={(e) =>
            setAirlineData({ ...airlineData, airline_name: e.target.value })
          }
        />
      </div>
      <div className="my-4">
        <Input
          label="Airline Location"
          defaultValue={airlineData.airline_location}
          onChange={(e) =>
            setAirlineData({ ...airlineData, airline_location: e.target.value })
          }
        />
      </div>
      <Button color="indigo" onClick={() => updateAirline()}>
        {" "}
        Update{" "}
      </Button>
      <h1 className="font-bold text-xl text-indigo-600 flex my-4 border-t py-2">
        {" "}
        <FaPen className="mt-1 mx-2" /> Edit Icon{" "}
      </h1>
      <div className="my-4">
        <Input
          type="file"
          label="Airline Icon"
          onChange={(e) => setFileIcon(e.target.files![0])}
        />
      </div>
      <Button color="indigo" onClick={() => updateIcon()}>
        {" "}
        Upload
      </Button>

      <ToastContainer />
    </div>
  );
}
