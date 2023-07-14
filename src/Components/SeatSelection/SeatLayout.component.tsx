import React, { useEffect, useState } from "react";
import { BookedSeat, Flighclass, SeatLayout } from "../../Types";
import { Tooltip } from "@material-tailwind/react";

export default function SeatLayoutCompo({
  seatMap,
  bookedSeat,
  selectionCount,
}: {
  seatMap: SeatLayout;
  bookedSeat: Array<string>;
  selectionCount: number;
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
        if (i == col_start || i == col_end) {
          class_name =
            "text-xs w-12 h-12 rounded-full border cursor-pointer border-blue-300 text-center hover:bg-blue-100";
        } else if (i == col_start + 1 || i == col_end - 1) {
          class_name =
            "text-xs w-12 h-12 rounded-full border cursor-pointer border-gray-300 text-center hover:bg-gray-100";
        } else if (
          selectedSeat.includes(`${type}${row_no}${String.fromCharCode(i)}`)
        ) {
          class_name = "bg-green";
        } else {
          class_name =
            "text-xs w-12 h-12 rounded-full border cursor-pointer border-cyan-300 text-center hover:bg-cyan-50";
        }

        array.push(
          <td className="py-4 border-none " key={`${row_no}-${i}`}>
            <Tooltip content={`${type}-${row_no}${String.fromCharCode(i)}`}>
              <button
                className={
                  bookedSeat.includes(
                    `${type}${row_no}${String.fromCharCode(i)}`
                  )
                    ? "text-xs w-12 h-12 rounded-full border  border-blue-300 text-center text-white bg-blue-400"
                    : class_name
                }
                onClick={() => {
                  if (selectedSeat.length == selectionCount) {
                    alert("Your Selection Limited Existed!");
                  } else {
                    selectedSeat.push(
                      `${type}${row_no}${String.fromCharCode(i)}`
                    );
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
    console.log(bookedSeat);
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
  }, [seatMap]);

  useEffect(() => {
    console.log(selectedSeat);
  }, [selectedSeat]);
  return (
    <div className="h-[36rem] overflow-auto w-[30rem] mx-auto my-1">
      <table className="w-max mx-auto">
        <tbody className="border-2 rounded-lg">
          {seats.map((s) => {
            return s;
          })}
        </tbody>
      </table>
    </div>
  );
}
