import React, { useState } from "react";
import { ResultBase } from "../../../../Types";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";

export default function TodaysFlightcomponent({
  data,
}: {
  data: Array<ResultBase>;
}) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <button onClick={() => setOpen(!open)}>
        {" "}
        <p className="text-white text-4xl  text-left font-qs">
          {" "}
          {data.length}{" "}
        </p>
        <h1 className="text-gray-300"> Today's Flights</h1>{" "}
      </button>
      <Dialog open={open} handler={setOpen}>
        <DialogHeader>Today's Scheduleded Flight</DialogHeader>
        <DialogBody>
          <div className="">
            <ul>
              <li className="grid grid-cols-4 font-bold">
                <span>Flight No.</span>
                <span>Source City</span>
                <span>Destination City</span>
                <span>
                  Seat Avaliablity{" "}
                  <p className="text-sm">BC &nbsp; EC &nbsp; FE &nbsp; PE</p>{" "}
                </span>{" "}
              </li>
              {data.map((s) => {
                const avlSeat = s.available_seats.find(
                  (e) =>
                    new Date(e.date).toDateString() == new Date().toDateString()
                );
                return (
                  <li className="grid grid-cols-4" key={s.flight_no}>
                    <span> {s.flight_no} </span>{" "}
                    <span>
                      {" "}
                      {s.route_id.source_city.city_name} (
                      {new Date(
                        s.timing.find(
                          (e) =>
                            new Date(e.source_time).toDateString() ==
                            new Date().toDateString()
                        )?.source_time!
                      ).toLocaleTimeString()}
                      )
                    </span>{" "}
                    <span>
                      {" "}
                      {s.route_id.destination_city.city_name}(
                      {new Date(
                        s.timing.find(
                          (e) =>
                            new Date(e.source_time).toDateString() ==
                            new Date().toDateString()
                        )?.destination_time!
                      ).toLocaleTimeString()}
                      )
                    </span>{" "}
                    <span>
                      {avlSeat?.BC! > 0 ? avlSeat?.BC : "-"} &nbsp;{" "}
                      {avlSeat?.EC! > 0 ? avlSeat?.EC : "-"} &nbsp;{" "}
                      {avlSeat?.FC! > 0 ? avlSeat?.FC : "-"} &nbsp;{" "}
                      {avlSeat?.PE! > 0 ? avlSeat?.PE : "-"} &nbsp;
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
}
