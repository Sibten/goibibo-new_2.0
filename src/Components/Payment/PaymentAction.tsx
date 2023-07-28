import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router-dom";
import {
  BookingSendingData,
  ResultBase,
  ResultData,
  SeatBase,
  TotalPaymentDetails,
  TravellerDetailsBase,
} from "../../Types";
import { Spinner } from "@material-tailwind/react";
import Faildialog from "../Dialog/Fail.dialog";
import Successdialog from "../Dialog/Sucess.dialog";
import Statusdialog from "../Dialog/Status.dialog";
import { MdDone } from "react-icons/md";
import Loaderdialog from "../Dialog/Loader.dialog";
import Timer from "../../Helper/Timer";

export const createPaymentOrder = async (amount: number) => {
  let config = {
    method: "post",
    url: `http://localhost:5050/payment/create?amount=${amount}`,
    headers: {
      token: Cookies.get("token"),
    },
  };

  return await axios(config);
};

const verifyPayment = async (
  res: any,
  bookingDetails: TravellerDetailsBase,
  dep_flight: ResultBase,
  rtn_flight: ResultBase | null,
  payment: TotalPaymentDetails
) => {
  let dep_seat: Array<SeatBase> = [];

  bookingDetails.basic.people.forEach((s) => dep_seat.push(s.seat_no!));

  let rtn_seat: Array<SeatBase> | null = [];
  if (rtn_flight) {
    bookingDetails.basic.people.forEach((s) => rtn_seat?.push(s.rtn_seat_no!));
  }

  const sendingData: BookingSendingData = {
    rzpinfo: res,
    dep_flight_no: dep_flight.flight_no,
    rtn_flight_no: rtn_flight?.flight_no ?? null,
    payment: payment,
    travel_class: bookingDetails.jouerny?.travel_class ?? 0,
    dep_date:
      bookingDetails.jouerny?.dep.source_time ?? new Date().toDateString(),
    rtn_date: bookingDetails.jouerny?.rtn?.destination_time ?? null,
    dep_booking_seat: dep_seat,
    rtn_booking_seat: rtn_seat.length > 0 ? rtn_seat : null,
    email: bookingDetails.basic.email,
    destn_city_code: dep_flight.route_id.destination_city.airport_code,
    source_city_code: dep_flight.route_id.source_city.airport_code,
    peoples: bookingDetails.basic.people,
    infants: bookingDetails.basic.infants,
    addons: {
      departure_addons: bookingDetails.addOnDep!,
      return_addons: bookingDetails.addOnRtn,
    },
  };
  console.log(sendingData);
  const data = JSON.stringify(sendingData);

  const config: AxiosRequestConfig = {
    method: "post",
    url: "http://localhost:5050/payment/validate",
    headers: {
      token: Cookies.get("token"),
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const data = await axios(config);
    return { data: data, status: true };
  } catch (e) {
    return { data: null, status: false };
  }
};

// const IssueRefund = (paymentId: string) => {};

export default function PaymentAction() {
  const selector = useSelector((state: RootState) => state.BookingDetails);
  const flight = useSelector((state: RootState) => state.BookingFlight);
  const user = useSelector((state: RootState) => state.User);

  const payableAmount =
    selector.payment?.original_total! +
    selector.payment?.total_add_on! -
    (selector.payment?.promotion! + selector.payment?.discount!);

  const [razorPay] = useRazorpay();

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const [transaction, setTransaction] = useState<{
    status: boolean;
    orderId?: string;
    rzpId?: string;
  }>({ status: false, orderId: undefined });

  const payamount = useCallback(async () => {
    setLoading(true);
    const order = await createPaymentOrder(payableAmount);
    const paymentKeyId = process.env.REACT_APP_RZP_KEY ?? "";
    const paymentOptions = {
      key: paymentKeyId, // Enter the Key ID generated from the Dashboard
      amount: (payableAmount * 100).toString(),
      currency: "INR",
      name: "Goibibo",
      description: `Ticket Booking of ${flight.dep?.route_id.source_city.city_name} - ${flight.dep?.route_id.destination_city.city_name} `,
      image:
        "https://res.cloudinary.com/dgsqarold/image/upload/v1685613732/Goibibo/OIP_l87euo.jpg",
      order_id: order.data.id,
      handler: async (res: any) => {
        setLoading(true);
        const response = await verifyPayment(
          res,
          selector,
          flight.dep!,
          flight.rtn ?? null,
          selector.payment!
        );
        setLoading(false);
        if (response.data?.data.payment)
          setTransaction({
            status: true,
            orderId: res.razorpay_order_id,
            rzpId: res.razorpay_payment_id,
          });
        else {
          setTransaction({
            status: false,
            orderId: res.razorpay_order_id,
          });

        }
      },
      prefill: {
        name: `${user.first_name} ${user.last_name}`,
        email: `${selector.basic.email}`,
      },
      notes: {
        address: "Goibibo Corporate Office , Ahmedabad",
      },
      theme: {
        color: "#2176e3",
      },
    };

    const rzp_payment = new razorPay(paymentOptions);
    rzp_payment.open();
    setLoading(false);
    rzp_payment.on("payment.failed", (res: any) => {
      setTransaction({ status: false, orderId: res.error.metadata.payment_id });
    });
  }, [razorPay]);

  return (
    <div className="mx-4 w-full">
      {loading ? <Loaderdialog /> : ""}

      {transaction.orderId ? (
        <>
          <Statusdialog
            status={transaction.status}
            orderId={transaction.orderId}
            rzpId={transaction.rzpId}
          />
        </>
      ) : (
        ""
      )}
      {transaction.status ? (
        <>
          <div className="bg-orange-800 text-white w-full p-2 rounded-md font-qs font-bold flex">
            <MdDone className="mt-1 mx-2" /> Payment Done
          </div>
          <div>
            Redirecting in{" "}
            <Timer
              Start={true}
              Callback={() => navigate("/flight")}
              InComingMinute={0}
              InComingSecond={30}
            />
          </div>
        </>
      ) : (
        <div>
          <button
            className="bg-orange-800 text-white w-full p-2 rounded-md font-qs font-bold"
            onClick={() => payamount()}
          >
            {" "}
            Pay Now{" "}
          </button>
        </div>
      )}
    </div>
  );
}
