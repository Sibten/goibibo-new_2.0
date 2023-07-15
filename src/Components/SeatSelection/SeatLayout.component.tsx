import React, { useEffect, useState } from "react";
import { BookedSeat, Flighclass, SeatLayout, Traveller } from "../../Types";
import { Button, Tooltip } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function SeatLayoutCompo({
  seatMap,
  bookedSeat,
  selectionCount,
  callback,
}: {
  seatMap: SeatLayout;
  bookedSeat: Array<string>;
  selectionCount: number;
  callback: Function;
}) {
  const [seats, setSeats] = useState<Array<React.ReactNode>>([]);

  let type = "";

  switch (seatMap.class_type) {
    case Flighclass.Business:
      type = "B";
      break;
    case Flighclass.Economy:
      type = "E";
      break;
    case Flighclass.FirstClass:
      type = "F";
      break;
    case Flighclass.PremiumEconomy:
      type = "P";
      break;
  }

  const [selectedSeat, setSelectedSeat] = useState<Array<string>>([]);

  const selector = useSelector((state: RootState) => state.BookingDetails);

  const [passanger, setPassanger] = useState<Array<Traveller>>([
    ...selector.basic.people,
  ]);

  const getClassName = (
    i: number,
    row_no: number,
    col_start: number,
    col_end: number,
    col_gap: number
  ) => {
    if (bookedSeat.includes(`${type}${row_no}${String.fromCharCode(i)}`)) {
      return "text-xs w-12 h-12 rounded-full border  border-blue-300 text-center text-white bg-blue-400";
    } else if (
      selectedSeat.includes(`${type}${row_no}${String.fromCharCode(i)}`)
    ) {
      return "text-xs w-12 h-12 rounded-full border cursor-pointer  bg-green-100 text-center hover:bg-green-200";
    } else if (i == col_start || i == col_end) {
      return "text-xs w-12 h-12 rounded-full border cursor-pointer border-blue-300 text-center hover:bg-blue-100";
    } else if (
      (i == col_start + 1 && i + 1 != col_gap) ||
      (i == col_end - 1 && i - 1 != col_gap)
    ) {
      return "text-xs w-12 h-12 rounded-full border cursor-pointer border-gray-300 text-center hover:bg-gray-100";
    } else {
      return "text-xs w-12 h-12 rounded-full border cursor-pointer border-cyan-300 text-center hover:bg-cyan-50";
    }
  };

  const create_row = (
    row_no: number,
    col_start: number,
    col_end: number,
    col_gap: number
  ) => {
    const array = [];
    let class_name = "";
    for (let i = col_start; i <= col_end; i++) {
      if (i == col_gap) {
        array.push(
          <td className="border-none" key={`${row_no}-${i}`}>
            &emsp;&emsp;
          </td>
        );
      } else {
        class_name = getClassName(i, row_no, col_start, col_end, col_gap);
        array.push(
          <td className="py-4 border-none " key={`${row_no}-${i}`}>
            <Tooltip content={`${type}-${row_no}${String.fromCharCode(i)}`}>
              <button
                className={class_name}
                onClick={() => {
                  let f = selectedSeat.findIndex(
                    (s) => s == `${type}${row_no}${String.fromCharCode(i)}`
                  );
                  if (f == -1) {
                    if (selectedSeat.length == passanger.length) {
                      alert("Limit exceed!");
                    } else {
                      selectedSeat.push(
                        `${type}${row_no}${String.fromCharCode(i)}`
                      );
                    }
                    setSelectedSeat([...selectedSeat]);
                  } else {
                    selectedSeat.splice(f, 1);
                    setSelectedSeat([...selectedSeat]);
                  }
                }}
                disabled={bookedSeat.includes(
                  `${type}${row_no}${String.fromCharCode(i)}`
                )}
              >
                <p className="my-4">
                  {" "}
                  {row_no}
                  {String.fromCharCode(i)}{" "}
                </p>
              </button>
            </Tooltip>
          </td>
        );
      }
    }

    const row = (
      <tr className="border-none" key={row_no}>
        {array.map((s) => {
          return s;
        })}
      </tr>
    );

    return row;
  };

  useEffect(() => {
    seats.splice(0, seats.length);
    for (let i = seatMap.row_start; i <= seatMap.row_end; i++) {
      seats.push(
        create_row(
          i,
          seatMap.col_start.charCodeAt(0),
          seatMap.col_end.charCodeAt(0),
          seatMap.col_gap.charCodeAt(0)
        )
      );
    }

    setSeats([...seats]);
  }, [seatMap, selectedSeat]);

  const confirmSeat = () => {
    selectedSeat.forEach(
      (s, i) => (passanger[i] = { ...passanger[i], seat_no: s })
    );
    setPassanger([...passanger]);
    callback(passanger);
  };

  return (
    <div className="  my-1 flex ">
      <div className="h-[39rem] overflow-y-auto overflow-x-hidden p-2 border rounded-md shadow-sm">
        <table className=" w-max mx-auto">
          <tbody className="border-2 rounded-lg">
            {seats.map((s) => {
              return s;
            })}
          </tbody>
        </table>
      </div>
      <div className="border h-max mx-4 p-4 rounded-md w-48 text-sm">
        <h1 className="font-qs font-bold text-black border-b">Selected Seat</h1>
        <div className="my-2">
          <ul>
            {selectedSeat.map((s, i) => (
              <li key={s} className="flex justify-between items-center my-1">
                {" "}
                <span>
                  {" "}
                  {passanger[i].first_name} {passanger[i].last_name}{" "}
                </span>{" "}
                <span className="bg-gray-200 p-1 rounded-md"> {s} </span>
              </li>
            ))}
            {selectedSeat.length == passanger.length ? (
              <Button className="my-2" onClick={() => confirmSeat()}>
                Confirm Seat
              </Button>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
