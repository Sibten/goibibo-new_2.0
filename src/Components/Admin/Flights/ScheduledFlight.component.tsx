import React, { useState } from "react";
import { ResultBase } from "../../../Types";
import {
  Dialog,
  DialogHeader,
  IconButton,
  DialogBody,
  Input,
} from "@material-tailwind/react";
import { FaInfo } from "react-icons/fa";
import { HiOutlineArrowLongRight, HiOutlineArrowRight } from "react-icons/hi2";
import { date, time } from "../../../Helper/Method";

export default function ScheduledFlightComponent({
  data,
}: {
  data: ResultBase;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const [printData, setPrintData] = useState<ResultBase>(data);

  return (
    <div>
      <IconButton variant="outlined" color="gray" onClick={() => setOpen(true)}>
        <FaInfo />
      </IconButton>
      <Dialog handler={setOpen} open={open}>
        <DialogHeader className="block border-b">
          <h1 className="text-xl text-indigo-700"> {printData.flight_no}</h1>
          <p className="text-base  -mt-1 font-bold">Schedule</p>
        </DialogHeader>
        <DialogBody>
          <div className="text-gray-800 b border-b my-1">
            <p className="flex">
              {data.route_id.source_city.city_name}{" "}
              <HiOutlineArrowLongRight className="text-xl mt-[1px] font-bold mx-2" />{" "}
              {data.route_id.destination_city.city_name}{" "}
            </p>
          </div>
          <div className="w-48 mx-auto my-2">
            <Input
              label="Search"
              type="date"
              onChange={(e) =>
                setPrintData(
                  s.timing.filter(
                    (t) => new Date(t.date).toDateString() == e.target.value
                  )
                )
              }
            />
          </div>
          <div className="h-[24rem] overflow-auto my-2">
            <ul>
              <li className="flex justify-around border-b font-bold">
                {" "}
                <p>Source</p> <p className="ml-8">Destination </p>{" "}
              </li>
              {data.timing.map((s, i) => (
                <li
                  className="flex justify-between border-b"
                  key={`${s.source_time}-${s.destination_time}`}
                >
                  {" "}
                  <span>{date(s.source_time)}</span>{" "}
                  <span>{time(s.source_time)}</span>{" "}
                  <span>{date(s.destination_time)}</span>{" "}
                  <span>{time(s.destination_time)}</span>{" "}
                </li>
              ))}
            </ul>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
}
