import React, { useEffect, useState } from "react";
import { ClassFare, Fare, FareUpdate, Flighclass } from "../../../Types";
import { FaPen } from "react-icons/fa";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { getFlightClass } from "../../../Helper/Method";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppThunkDispatch } from "../../../store";
import { fetchFare } from "../../../Actions/Admin/Utility.action";

export default function EditFarecomponents({
  fare,
  tax,
}: {
  fare?: Array<ClassFare>;
  tax?: number;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const dispatch = useDispatch<AppThunkDispatch>();

  const [updateData, setUpdateData] = useState<FareUpdate>({
    EC_fare: 0,
    BC_fare: 0,
    PE_fare: 0,
    FC_fare: 0,
    tax: tax ?? 0,
  });

  const update = (type: number, value: number) => {
    switch (type) {
      case Flighclass.Business:
        updateData.BC_fare = value;
        break;
      case Flighclass.Economy:
        updateData.EC_fare = value;
        break;
      case Flighclass.FirstClass:
        updateData.FC_fare = value;
        break;
      case Flighclass.PremiumEconomy:
        updateData.PE_fare = value;
        break;
    }
  };
  useEffect(() => {
    fare?.forEach((v) => {
      update(v.class_type, v.basic_fare);
    });
    setUpdateData({ ...updateData });
  }, [fare]);

  const GST = 18;

  const updateFare = async () => {
    const data = JSON.stringify(updateData);
    let config = {
      method: "post",
      url: `${process.env.REACT_APP_API}/airlines/myairline/fare/add`,
      headers: {
        // token: Cookies.get("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };
    try {
      const res = await axios(config);
      if (res.status == 200) {
        toast.success("Fare Updated Successfully", {
          position: "bottom-right",
        });
        dispatch(fetchFare());
        setOpen(false);
      } else toast.error("Unable to update!", { position: "bottom-right" });
    } catch (e) {
      toast.error("Something bad happen!", { position: "bottom-right" });
    }
  };

  return (
    <div>
      <button
        className="bg-indigo-500 text-white p-2 h-max rounded-full"
        onClick={() => setOpen(!open)}
      >
        <FaPen />
      </button>
      <Dialog open={open} handler={setOpen} size="xs">
        <DialogHeader>Edit fare</DialogHeader>
        <DialogBody>
          <p>Edit fare in INR</p>
          {fare?.map((s) => {
            const class_type = getFlightClass(s.class_type);
            return (
              <div key={s.class_type} className="my-4 flex">
                <div className="relative flex w-full ">
                  <Input
                    type="number"
                    label={class_type}
                    className="focus:outline-red-500"
                    defaultValue={s.basic_fare}
                    onBlur={(e) => {
                      update(s.class_type, parseInt(e.target.value));
                      setUpdateData({ ...updateData });
                    }}
                  />
                  <p className="absolute right-8 top-2 rounded text-sm">
                    &#8377; Per Km
                  </p>
                </div>
              </div>
            );
          })}
          <div className="relative flex w-full" tabIndex={0}>
            <Input
              type="number"
              label="Tax"
              onBlur={(e) =>
                setUpdateData({
                  ...updateData,
                  tax: (parseInt(e.target.value) + GST) / 100,
                })
              }
              defaultValue={Math.ceil(tax! * 100) - GST}
            />
            <p className="absolute right-8  top-2 rounded text-sm font-bold">
              % on total amt + {GST} % GST
            </p>
          </div>
        </DialogBody>
        <DialogFooter>
          <button
            className="mx-2 font-bold text-black"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <Button color="indigo" onClick={() => updateFare()}>
            Update
          </Button>
        </DialogFooter>
      </Dialog>
      <ToastContainer />
    </div>
  );
}
