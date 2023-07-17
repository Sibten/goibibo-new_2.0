import React, { useEffect, useState } from "react";
import {
  AddonType,
  BookedSeat,
  Flighclass,
  SearchType,
  SeatBase,
  SeatLayout,
  SeatType,
  Traveller,
} from "../../Types";
import { Button, Tooltip } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { BookingActions } from "../../Actions/ConfirmBookingDetails.action";

export default function SeatLayoutCompo({
  seatMap,
  bookedSeat,
  selectionCount,
  callback,
  mapType,
}: {
  seatMap: SeatLayout;
  bookedSeat: Array<string>;
  selectionCount: number;
  callback: Function;
  mapType: number;
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

  const [selectedSeat, setSelectedSeat] = useState<Array<SeatBase>>([]);

  const selector = useSelector((state: RootState) => state.BookingDetails);

  const [passanger, setPassanger] = useState<Array<Traveller>>([
    ...selector.basic.people,
  ]);

  let add_on = 0;
  const dispatch = useDispatch();

  const getSeatType = (
    i: number,
    row_no: number,
    col_start: number,
    col_end: number,
    col_gap: number
  ): { seat: SeatBase; design: string } => {
    if (bookedSeat.includes(`${type}${row_no}${String.fromCharCode(i)}`)) {
      return {
        seat: {
          seat_no: `${type}${row_no}${String.fromCharCode(i)}`,
          type: SeatType.Booked,
          price: null,
        },
        design:
          "text-xs w-12 h-12 rounded-full border  border-blue-300 text-center text-white bg-blue-400",
      };
    } else if (
      selectedSeat.findIndex(
        (s) => s.seat_no == `${type}${row_no}${String.fromCharCode(i)}`
      ) != -1
    ) {
      return {
        seat: {
          seat_no: `${type}${row_no}${String.fromCharCode(i)}`,
          type: -1,
          price: null,
        },
        design:
          "text-xs w-12 h-12 rounded-full border cursor-pointer  bg-green-100 text-center hover:bg-green-200",
      };
    } else if (i == col_start || i == col_end) {
      return {
        seat: {
          seat_no: `${type}${row_no}${String.fromCharCode(i)}`,
          type: SeatType.Window,
          price: 150,
        },
        design:
          "text-xs w-12 h-12 rounded-full border cursor-pointer border-blue-300 text-center hover:bg-blue-100",
      };
    } else if (
      (i == col_start + 1 && i + 1 != col_gap) ||
      (i == col_end - 1 && i - 1 != col_gap)
    ) {
      return {
        seat: {
          seat_no: `${type}${row_no}${String.fromCharCode(i)}`,
          type: SeatType.Middle,
          price: 70,
        },
        design:
          "text-xs w-12 h-12 rounded-full border cursor-pointer border-gray-300 text-center hover:bg-gray-100",
      };
    } else {
      return {
        seat: {
          seat_no: `${type}${row_no}${String.fromCharCode(i)}`,
          type: SeatType.Aisle,
          price: 100,
        },
        design:
          "text-xs w-12 h-12 rounded-full border cursor-pointer border-cyan-300 text-center hover:bg-cyan-50",
      };
    }
  };

  const create_row = (
    row_no: number,
    col_start: number,
    col_end: number,
    col_gap: number
  ) => {
    const array = [];

    for (let i = col_start; i <= col_end; i++) {
      if (i == col_gap) {
        array.push(
          <td className="border-none" key={`${row_no}-${i}`}>
            &emsp;&emsp;
          </td>
        );
      } else {
        let seatDetails: { seat: SeatBase; design: string } = getSeatType(
          i,
          row_no,
          col_start,
          col_end,
          col_gap
        );
        array.push(
          <td className="py-4 border-none " key={seatDetails.seat.seat_no}>
            <Tooltip content={`Rs. ${seatDetails.seat.price! * 1}`}>
              <button
                className={seatDetails.design}
                onClick={() => {
                  let f = selectedSeat.findIndex(
                    (s) => s.seat_no == seatDetails.seat.seat_no
                  );
                  if (f == -1) {
                    if (selectedSeat.length == passanger.length) {
                      alert("Limit exceed!");
                    } else {
                      selectedSeat.push(seatDetails.seat);
                    }
                    setSelectedSeat([...selectedSeat]);
                  } else {
                    selectedSeat.splice(f, 1);
                    setSelectedSeat([...selectedSeat]);
                  }
                }}
                disabled={bookedSeat.includes(seatDetails.seat.seat_no)}
              >
                <p className="my-4">{seatDetails.seat.seat_no}</p>
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
    let add = 0;
    if (mapType == SearchType.From) {
      selectedSeat.forEach((s, i) => {
        add += s.price!;
        passanger[i] = { ...passanger[i], seat_no: s };
      });
    } else {
      selectedSeat.forEach((s, i) => {
        add += s.price!;
        passanger[i] = { ...passanger[i], rtn_seat_no: s };
      });
    }
    setPassanger([...passanger]);
    dispatch(BookingActions.addAddOnPayment(add));
    dispatch(
      BookingActions.addAddon({
        type: mapType,
        data: { name: "User Preferd Seat", price: add, type: AddonType.Seat },
      })
    );
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
      <div className="border h-max mx-4 p-4 rounded-md w-56 text-sm">
        <h1 className="font-qs font-bold text-black border-b">Selected Seat</h1>
        <div className="my-2">
          <ul>
            {selectedSeat.map((s, i) => {
              add_on += s.price!;
              return (
                <li
                  key={s.seat_no}
                  className="flex justify-between items-center my-1 w-full"
                >
                  {" "}
                  <span>
                    {" "}
                    {passanger[i].first_name} {passanger[i].last_name}{" "}
                  </span>{" "}
                  <span className="bg-gray-200 p-1 rounded-md w-max  font-bold">
                    {" "}
                    {s.seat_no} &#8377; {s.price}
                  </span>
                </li>
              );
            })}
            <p className="flex justify-between font-bold text-base mt-2 border-t py-1">
              {" "}
              <span> Total </span> <span> &#8377; {add_on}</span>
            </p>
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
