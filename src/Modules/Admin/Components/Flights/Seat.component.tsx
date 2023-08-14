import React, { useEffect, useState } from "react";
import { ResultBase } from "../../../../Types";
import {
  Dialog,
  DialogHeader,
  IconButton,
  DialogBody,
  Input,
} from "@material-tailwind/react";
import { FaInfo } from "react-icons/fa";
import { HiOutlineArrowLongRight, HiOutlineArrowRight } from "react-icons/hi2";
import { date, time } from "../../../../Helper/Method";
import { MdAirlineSeatReclineExtra, MdClose } from "react-icons/md";
import { RxReset } from "react-icons/rx";

export default function SeatFlightComponent({ data }: { data: ResultBase }) {
  const [open, setOpen] = useState<boolean>(false);

  const [printData, setPrintData] = useState([...data.available_seats]);
  useEffect(() => {
    printData.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [printData]);

  return (
    <div className="m-1">
      <IconButton
        variant="outlined"
        color="gray"
        size="sm"
        onClick={() => setOpen(true)}
      >
        <MdAirlineSeatReclineExtra />
      </IconButton>
      <Dialog handler={setOpen} open={open}>
        <DialogHeader className="flex border-b justify-between">
          <div>
            <h1 className="text-xl text-indigo-700"> {data.flight_no}</h1>
            <p className="text-base  -mt-1 font-bold">Seat Avaliablity</p>
          </div>
          <button onClick={() => setOpen(!open)}>
            {" "}
            <MdClose />{" "}
          </button>
        </DialogHeader>
        <DialogBody>
          <form>
            <div className="flex w-max mx-auto">
              <Input
                type="date"
                label="Departure Date"
                onChange={(e) => {
                  let opData = data.available_seats.filter(
                    (s) =>
                      new Date(s.date).toDateString() ==
                      new Date(e.target.value).toDateString()
                  );
                  setPrintData([...opData]);
                }}
              />
              <button
                type="reset"
                className="mx-2 h-max w-max border rounded-full p-2 my-1"
                onClick={() => setPrintData([...data.available_seats])}
              >
                <RxReset />
              </button>
            </div>
          </form>
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
                {printData.map((s, i) => (
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
