import React, { useEffect } from "react";
import Title from "../../Components/Utility/Title";
import { useParams, useLocation } from "react-router-dom";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { payment } from "../../Types";
import { Button } from "@material-tailwind/react";
import { FaPrint } from "react-icons/fa";
import { URL } from "url";
import { getFlightClass } from "../../Helper/Method";

export default function TripMorepage() {
  const params = useParams();

  const selector = useSelector((state: RootState) => state.Trips);
  const location = useLocation();

  const data = selector.find((s) => s.PNR_no == parseInt(params.pnr!));

  return (
    <div className="w-full overflow-auto">
      <Title text="Your Trip" />
      <div className="w-max mx-auto">
        <img src="https://res.cloudinary.com/dgsqarold/image/upload/v1690998775/Goibibo/gbo_gstxd2.png" />
      </div>
      <div className=" mx-auto w-max my-2">
        <Button
          className="print:hidden flex"
          variant="outlined"
          color="indigo"
          onClick={() => window.print()}
        >
          Print <FaPrint className="mx-2" />
        </Button>
        {/* <a
          className="print:hidden flex"
          // variant="outlined"
          color="indigo"
          download
          // onClick={() => window.print()}
        >
          Print <FaPrint className="mx-2" />
        </a> */}
      </div>
      <div className="font-arial w-[48rem] mx-auto flex p-4 justify-between">
        <div className="w-[24rem] mx-4">
          <div>
            <h1 className="text-gray-700"> PNR Number </h1>
            <p className="font-bold text-2xl">{data?.PNR_no}</p>
          </div>
          <div className="flex my-4 justify-between">
            <div>
              <h1 className="text-gray-700"> From </h1>
              <p className="font-bold text-xl">
                {data?.jouerny_info.source_city.city_name}&nbsp;(
                {data?.jouerny_info.source_city.airport_code})
              </p>
              <p className="text-gray-600 text-sm w-48">
                {data?.jouerny_info.source_city.airport_name}
              </p>
            </div>
            <div className="mx-4 text-right">
              <h1 className="text-gray-700"> To </h1>
              <p className="font-bold text-xl">
                {data?.jouerny_info.destination_city.city_name}&nbsp;(
                {data?.jouerny_info.destination_city.airport_code})
              </p>
              <p className="text-gray-600 text-sm w-48">
                {data?.jouerny_info.destination_city.airport_name}
              </p>
            </div>
          </div>
          <div className="flex my-4 justify-between">
            <div>
              <h1 className="text-gray-700"> Departure Flight </h1>
              <p className="font-bold text-base w-48">
                {data?.jouerny_info.departure_flight.flight_no} (
                {data?.jouerny_info.departure_flight.airline_id.airline_name})
              </p>
            </div>
            <div className="mx-4 text-right">
              <h1 className="text-gray-700"> Return Flight </h1>
              <p className="font-bold text-base w-48">
                {data?.jouerny_info.return_flight ? (
                  <>
                    {" "}
                    {data?.jouerny_info.return_flight.flight_no} (
                    {data?.jouerny_info.return_flight.airline_id.airline_name})
                  </>
                ) : (
                  "--"
                )}
              </p>
            </div>
          </div>
          <div className="flex my-4 justify-between">
            <div>
              <h1 className="text-gray-700"> Departure Date </h1>
              <p className="font-bold text-base w-48">
                {new Date(data?.jouerny_info.departure_date!).toDateString()}
              </p>
              <p>
                {" "}
                {new Date(
                  data?.jouerny_info.departure_date!
                ).toLocaleTimeString()}{" "}
              </p>
            </div>
            <div className="mx-4 text-right">
              <h1 className="text-gray-700"> Return Date </h1>
              <p className="font-bold text-base w-48">
                {data?.jouerny_info.return_date
                  ? new Date(data?.jouerny_info.return_date).toDateString()
                  : "--"}
              </p>
              <p>
                {data?.jouerny_info.return_date
                  ? new Date(
                      data?.jouerny_info.return_date
                    ).toLocaleTimeString()
                  : ""}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-md mx-4 p-2">
          <h1 className="font-bold text-lg border-b"> Payment Summary </h1>
          <div>
            <div className="my-2">
              <h1 className="text-gray-700"> Order Id </h1>
              <p>{data?.payment.order_id} </p>
            </div>
            <div className="my-2">
              <h1 className="text-gray-700"> Payment Id </h1>
              <p>{data?.payment.razor_pay_id} </p>
            </div>
            <div className="my-2">
              <h1 className="text-gray-700"> Payment Status </h1>
              <p>{data?.payment.status! ? "Success" : "Failed"} </p>
            </div>
            <div className="my-2">
              <h1 className="text-gray-700"> Payment Amount </h1>
              <p>
                &#8377;{" "}
                {data?.payment.payment_amount.original_total! +
                  data?.payment.payment_amount.total_add_on! -
                  (data?.payment.payment_amount.promotion! +
                    data?.payment.payment_amount.discount!)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="my-2 border-t border-gray-400  font-arial mx-auto w-[48rem] p-4">
        <h1 className="font-bold text-lg my-2"> Passanger Information </h1>
        <div>
          <table className="w-full">
            <thead>
              <tr>
                <th>Type </th>
                <th> Name </th>
                <th> Age </th>
                <th> Gender </th>
                <th> Class </th>
                <th> Seat No </th>
                <th> Return Seat No </th>
              </tr>
            </thead>
            <tbody>
              {data?.jouerny_info.peoples.map((s) => (
                <tr key={s.seat_no?.seat_no} className="text-center">
                  <td>{s.type == 0 ? "Adult" : "Child"}</td>
                  <td>
                    {s.first_name} {s.last_name}
                  </td>
                  <td>{s.age}</td>
                  <td>{s.gender}</td>
                  <td>{getFlightClass(data.class_type)}</td>
                  <td>{s.seat_no?.seat_no ?? "N/A"}</td>
                  <td>
                    {s.rtn_seat_no?.seat_no ? s.rtn_seat_no.seat_no : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="my-1 border-t border-gray-400  font-arial mx-auto w-[48rem] p-4">
        <h1 className="font-bold text-lg my-2"> Billing Information </h1>
        <div className=" w-[24rem]">
          <div>
            <h1 className="text-gray-700"> Transaction Stamp </h1>
            <p>
              {" "}
              {new Date(data?.payment.transaction_stamp!).toLocaleString()}
            </p>
          </div>
          <div>
            <h1 className="text-gray-700"> Billing Address </h1>
            <p>
              {" "}
              {data?.jouerny_info.address ?? "N/A"}&nbsp;{" "}
              {data?.jouerny_info.state ?? ""}&nbsp;{" "}
              {data?.jouerny_info.pincode ?? ""}
            </p>
          </div>
          <div className="border-t border-gray-300 my-2 p-2 ">
            <ul>
              <li className="flex justify-between my-1">
                {" "}
                <span className="font-bold"> Basic Fare</span>{" "}
                <span> &#8377; {data?.payment.payment_amount.basic_total}</span>
              </li>
              <li className="flex justify-between my-1">
                {" "}
                <span className="font-bold">
                  {" "}
                  Tax & Surcharges (18% GST Inc.)
                </span>{" "}
                <span> &#8377; {data?.payment.payment_amount.tax_total}</span>
              </li>
              <li className="flex justify-between my-1">
                {" "}
                <span className="font-bold"> Promotion</span>{" "}
                <span className="text-red-500">
                  {" "}
                  -&#8377; {data?.payment.payment_amount.promotion}
                </span>
              </li>
              <li className="flex justify-between my-1">
                {" "}
                <span className="font-bold"> Disount</span>{" "}
                <span className="text-red-500">
                  {" "}
                  -&#8377; {data?.payment.payment_amount.discount}
                </span>
              </li>
              <li className="flex justify-between my-1">
                {" "}
                <span className="font-bold"> Add ons</span>{" "}
                <span className="text-blue-700">
                  {" "}
                  +&#8377; {data?.payment.payment_amount.total_add_on}
                </span>
              </li>
              <li className="flex justify-between my-4 border-t border-gray-300">
                {" "}
                <span className="font-bold"> Grand Total</span>{" "}
                <span className="text-indigo-700 font-bold text-lg">
                  &#8377;
                  {data?.payment.payment_amount.original_total! +
                    data?.payment.payment_amount.total_add_on! -
                    (data?.payment.payment_amount.promotion! +
                      data?.payment.payment_amount.discount!)}{" "}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-300">
          <small>
            This is computer generated invoice cum ticket. Do not required any
            signature{" "}
          </small>
        </div>
      </div>
    </div>
  );
}
