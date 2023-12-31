import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import axios, { AxiosRequestConfig } from "axios";
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router-dom";
import {
  ResultBase,
  SeatBase,
  TotalPaymentDetails,
  TravellerDetailsBase,
} from "../../../../Types";
import Statusdialog from "../Dialog/Status.dialog";
import { MdDone } from "react-icons/md";
import Loaderdialog from "../Dialog/Loader.dialog";
import Timer from "../../../../Helper/Timer";
import { ToastContainer, toast } from "react-toastify";
import { getFlightClass } from "../../../../Helper/Method";
import { postAPI } from "../../../../Services/API.services";

export const createPaymentOrder = async (amount: number) => {
  return await postAPI(`/payment/create?amount=${amount}`);
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

  const sendingData = {
    rzpinfo: res,
    dep_flight_no: dep_flight.flight_no,
    rtn_flight_no: rtn_flight?.flight_no ?? null,
    payment: payment,
    address: bookingDetails.basic.address,
    pincode: bookingDetails.basic.pincode,
    state: bookingDetails.basic.state,
    travel_class: bookingDetails.jouerny.travel_class,
    dep_date: bookingDetails.jouerny?.dep?.source_time ?? null,
    rtn_date: bookingDetails.jouerny?.rtn?.source_time ?? null,
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

  const data = JSON.stringify(sendingData);

  try {
    const res = await postAPI("/payment/validate", data);

    return { data: res, status: true };
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
    try {
      const order = await createPaymentOrder(payableAmount);
      const paymentKeyId = process.env.REACT_APP_RZP_KEY ?? "";
      // //  console.log(paymentKeyId);
      const paymentOptions = {
        key: paymentKeyId, // Enter the Key ID generated from the Dashboard
        amount: (payableAmount * 100).toString(),
        currency: "INR",
        name: `Goibibo ${getFlightClass(selector.jouerny.travel_class)}`,
        description: `Ticket Booking of ${
          flight.dep?.route_id.source_city.city_name
        } - ${
          flight.dep?.route_id.destination_city.city_name
        } - ${getFlightClass(selector.jouerny.travel_class)} `,
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
        setTransaction({
          status: false,
          orderId: res.error.metadata.payment_id,
        });
      });
    } catch (e) {
      setLoading(false);
      toast.error("Something Bad happen!");
    }
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
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white w-full p-2 rounded-md font-qs font-bold"
            onClick={() => payamount()}
          >
            {" "}
            Pay Now{" "}
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
