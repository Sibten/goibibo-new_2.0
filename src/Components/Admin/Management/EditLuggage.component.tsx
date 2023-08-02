import React, { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { Flighclass, LuggageType, LuggageUpdate } from "../../../Types";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import { getFlightClass } from "../../../Helper/Method";
import Cookies from "js-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppThunkDispatch } from "../../../store";
import { fetchLuggage } from "../../../Actions/Admin/Utility.action";

export default function EditLuggageComponent({
  data,
}: {
  data?: Array<LuggageType>;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppThunkDispatch>();

  const [updateData, setUpdateData] = useState<LuggageUpdate>({
    EC: 0,
    BC: 0,
    PE: 0,
    FC: 0,
  });

  const update = (type: number, value: number) => {
    switch (type) {
      case Flighclass.Business:
        updateData.BC = value;
        break;
      case Flighclass.Economy:
        updateData.EC = value;
        break;
      case Flighclass.FirstClass:
        updateData.FC = value;
        break;
      case Flighclass.PremiumEconomy:
        updateData.PE = value;
        break;
    }
  };

  useEffect(() => {
    console.log(data);
    data?.forEach((s) => update(s.type, s.limit));
    setUpdateData({ ...updateData });
  }, []);

  const updateLuggage = async () => {
    console.log(updateData);
    const data = JSON.stringify(updateData);
    let config = {
      method: "post",
      url: "http://localhost:5050/airlines/myairline/rule/add?type=0",
      headers: {
        token: Cookies.get("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };
    try {
      const res = await axios(config);
      if (res.status == 200) {
        console.log(res.data);
        setOpen(false);
        dispatch(fetchLuggage());
        toast.success("Luggage updated successfully!", {
          position: "bottom-right",
        });
      } else {
        toast.error("Unable to update!", { position: "bottom-right" });
      }
    } catch (e) {
      toast.error("Something bad happen!", { position: "bottom-right" });
    }
  };

  return (
    <div>
      <div>
        <button
          className="bg-indigo-500 text-white p-2 h-max rounded-full"
          onClick={() => setOpen(!open)}
        >
          <FaPen />
        </button>
      </div>
      <div>
        <Dialog open={open} handler={setOpen} size="xs">
          <DialogHeader>Edit Luggage Capacity</DialogHeader>
          <DialogBody>
            {data?.map((s) => (
              <div className="relative flex w-full my-4" key={s.type}>
                {" "}
                <Input
                  type="number"
                  defaultValue={s.limit}
                  label={getFlightClass(s.type)}
                  onBlur={(e) => {
                    update(s.type, parseInt(e.target.value));
                    setUpdateData({ ...updateData });
                  }}
                />{" "}
                <span className="absolute right-8 top-2">Kg</span>
              </div>
            ))}
          </DialogBody>
          <DialogFooter>
            <button
              className="mx-2 font-bold text-black"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <Button color="indigo" onClick={() => updateLuggage()}>
              {" "}
              Update{" "}
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
      <ToastContainer />
    </div>
  );
}
