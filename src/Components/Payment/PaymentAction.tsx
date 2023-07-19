import React, { useCallback } from "react";
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
    destn_city_code: dep_flight.route_id.destination_city.city_name,
    source_city_code: dep_flight.route_id.source_city.city_name,
    peoples: bookingDetails.basic.people,
    infants: bookingDetails.basic.infants,
    addons: {
      departure_addons: bookingDetails.addOnDep!,
      return_addons: bookingDetails.addOnRtn,
    },
  };
  console.log(sendingData);

  const config: AxiosRequestConfig = {
    method: "post",
    url: "http://localhost:5050/payment/validate",
    data: JSON.stringify(sendingData),
    headers: {
      token: Cookies.get("token"),
    },
  };


  try {
    const data = await axios(config);
    console.log(data);
  } catch (e) {
    console.log("Error: ",e);
  }
};

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

  const rzp = {
    razorpay_payment_id: "pay_MFbq6DjajmzBED",
    razorpay_order_id: "order_MFboAxdLXg2Swj",
    razorpay_signature:
      "8aa28e3f183050083e57be8228df6e9bea3b5dba356d6c2f85a96df700e734f8",
  };
  const payamout = () => {
    verifyPayment(
      rzp,
      selector,
      flight.dep!,
      flight.rtn ?? null,
      selector.payment!
    );
  };

  // const payamount = useCallback(async () => {
  //   const order = await createPaymentOrder(payableAmount);

  //   const paymentKeyId = process.env.REACT_APP_RZP_KEY ?? "";
  //   console.log(paymentKeyId);
  //   const paymentOptions = {
  //     key: paymentKeyId, // Enter the Key ID generated from the Dashboard
  //     amount: (payableAmount * 100).toString(),
  //     currency: "INR",
  //     name: "Goibibo",
  //     description: `Ticket Booking of ${selector.info?.from.city_name} - ${selector.info?.to.city_name} `,
  //     image:
  //       "https://res.cloudinary.com/dgsqarold/image/upload/v1685613732/Goibibo/OIP_l87euo.jpg",
  //     order_id: order.data.id,
  //     handler: async (res: any) => {
  //       console.log(res);
  //       const response = await verifyPayment(
  //         res,
  //         selector,
  //         flight.dep!,
  //         flight.rtn ?? null,
  //         selector.payment!
  //       );
  //       console.log(response);
  //     },
  //     prefill: {
  //       name: `${user.first_name} ${user.last_name}`,
  //       email: `${selector.basic.email}`,
  //     },
  //     notes: {
  //       address: "Goibibo Corporate Office , Ahmedabad",
  //     },
  //     theme: {
  //       color: "#2176e3",
  //     },
  //   };

  //   const rzp_payment = new razorPay(paymentOptions);
  //   rzp_payment.open();
  //   rzp_payment.on("payment.failed", (res: any) => {
  //     console.log(res);
  //     navigate("/flight/payment/fail");
  //   });
  // }, [razorPay]);

  return (
    <div className="mx-4 w-full">
      <div>
        <button
          className="bg-orange-800 text-white w-full p-2 rounded-md font-qs font-bold"
          onClick={() => payamout()}
        >
          {" "}
          Pay Now{" "}
        </button>
      </div>
    </div>
  );
}
