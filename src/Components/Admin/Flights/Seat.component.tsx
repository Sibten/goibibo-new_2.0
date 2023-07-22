import React, { useState } from "react";
import { ResultBase } from "../../../Types";
import {
  Dialog,
  DialogHeader,
  IconButton,
  DialogBody,
} from "@material-tailwind/react";
import { FaInfo } from "react-icons/fa";
import { HiOutlineArrowLongRight, HiOutlineArrowRight } from "react-icons/hi2";
import { date, time } from "../../../Helper/Method";
import { MdAirlineSeatReclineExtra } from "react-icons/md";

export default function SeatFlightComponent({ data }: { data: ResultBase }) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <IconButton variant="outlined" color="gray" onClick={() => setOpen(true)}>
        <MdAirlineSeatReclineExtra />
      </IconButton>
      <Dialog handler={setOpen} open={open}>
        <DialogHeader className="block border-b">
          <h1 className="text-xl text-indigo-700"> {data.flight_no}</h1>
          <p className="text-base  -mt-1 font-bold">Seat Avaliablity</p>
        </DialogHeader>
        <DialogBody>
          <div className="text-gray-800 b border-b my-1">
            <p className="flex">
              {data.route_id.source_city.city_name}{" "}
              <HiOutlineArrowLongRight className="text-xl mt-[1px] font-bold mx-2" />{" "}
              {data.route_id.destination_city.city_name}{" "}
            </p>
          </div>
          <div className="h-[24rem] overflow-auto my-2">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Economy</th>
                  <th>Bussiness</th>
                  <th>Premium Eco.</th>
                  <th>First Class</th>
                </tr>
              </thead>
              <tbody>
                {data.available_seats.map((s, i) => (
                  <tr key={new Date(s.date).toDateString()}>
                    <td>{new Date(s.date).toDateString()}</td>
                    <td>{s.EC > 0 ? s.EC : "-"}</td>
                    <td>{s.BC > 0 ? s.BC : "-"}</td>
                    <td>{s.PE > 0 ? s.PE : "-"}</td>
                    <td>{s.FC > 0 ? s.FC : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
}
