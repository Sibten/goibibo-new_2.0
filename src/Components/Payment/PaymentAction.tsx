import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import axios from "axios";
import Cookies from "js-cookie";
import useRazorpay from "react-razorpay";

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

export default function PaymentAction() {
  const selector = useSelector((state: RootState) => state.BookingDetails);
  const flight = useSelector((state: RootState) => state.BookingFlight);
  const user = useSelector((state: RootState) => state.User);

  const payableAmount =
    selector.payment?.original_total! +
    selector.payment?.total_add_on! -
    (selector.payment?.promotion! + selector.payment?.discount!);

  const [razorPay] = useRazorpay();

  const payamount = useCallback(async () => {
    const order = await createPaymentOrder(payableAmount);

    const paymentKeyId = process.env.REACT_APP_RZP_KEY ?? "";
    console.log(paymentKeyId);
    const paymentOptions = {
      key: paymentKeyId, // Enter the Key ID generated from the Dashboard
      amount: (payableAmount * 100).toString(),
      currency: "INR",
      name: "Goibibo",
      description: `Ticket Booking of ${selector.info?.from.city_name} - ${selector.info?.to.city_name} `,
      image:
        "https://res.cloudinary.com/dgsqarold/image/upload/v1685613732/Goibibo/OIP_l87euo.jpg",
      order_id: order.data.id,
      handler: (res: any) => {
        console.log(res);
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
  }, [razorPay]);

  return (
    <div className="mx-4 w-full">
      <div>
        <button
          className="bg-orange-800 text-white w-full p-2 rounded-md font-qs font-bold"
          onClick={() => payamount()}
        >
          {" "}
          Pay Now{" "}
        </button>
      </div>
    </div>
  );
}
