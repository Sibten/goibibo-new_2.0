import {
  Alert,
  Button,
  Checkbox,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { TotalPaymentDetails } from "../../../../Types";
import { putAPI } from "../../../../Services/API.services";
import Loaderdialog from "../Dialog/Loader.dialog";
import { useDispatch } from "react-redux";
import { AppThunkDispatch } from "../../../../store";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchTrips } from "../../../../Actions/Trip.action";

export default function CancelDialog({
  pnr,
  date,
  payment,
}: {
  pnr: number;
  date: Date;
  payment: TotalPaymentDetails | null;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [ack, setAck] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const disaptch = useDispatch<AppThunkDispatch>();
  const navigate = useNavigate();
  const duration = Math.floor(
    (new Date(date).getTime() - new Date().getTime()) / 3600000
  );
  let paymentRefund: number = 0;
  if (payment) {
    if (duration > 2 && duration <= 24) {
      paymentRefund =
        payment.basic_total ?? 0 + (payment.total_add_on ?? 0) * 0.7;
    } else if (duration > 24 && duration <= 48) {
      paymentRefund =
        payment.basic_total ?? 0 + (payment.total_add_on ?? 0) * 0.8;
    } else {
      paymentRefund = (payment.basic_total ?? 0) + (payment.total_add_on ?? 0);
    }
  }

  const cancelTrip = async () => {
    setLoading(true);
    const data = {
      PNR_no: pnr,
    };
    try {
      const res = await putAPI("/payment/booking/cancel", JSON.stringify(data));
      if (res.data) {
        setOpen(!open);
        setLoading(false);
        toast.success("Trip successfully cancelled. Please check your mail");
        disaptch(fetchTrips());
        setTimeout(() => navigate("/mytrips"), 3000);
      }
    } catch (e) {
      toast.error("Unable to cancel the trip!");
    }
  };

  return (
    <div className="mx-2">
      {loading ? <Loaderdialog /> : ""}
      <Button
        variant="outlined"
        color="red"
        className="print:hidden"
        onClick={() => setOpen(!open)}
      >
        Cancel Trip
      </Button>
      <Dialog handler={setOpen} open={open} size="sm">
        <DialogHeader className="font-qs text-blue-800">
          <h1 className="text-xl">Cancellation against {pnr}</h1>
        </DialogHeader>
        {duration > 2 ? (
          <>
            {" "}
            <DialogBody>
              <div>
                <h1 className="font-qs font-bold text-base text-black">
                  Goibibo Cancellation Policy{" "}
                </h1>
                <div className="font-qs">
                  <ul className="text-black list-disc mx-4 text-sm">
                    <li>
                      {" "}
                      If you are cancel trip between duration of departure 2
                      Hours to 24 Hours (24 Hrs included), then you will get
                      refund 70% of Basic Flight charge and Addons total.{" "}
                    </li>
                    <li>
                      {" "}
                      If you are cancel trip between duration of departure 24
                      Hours to 48 Hours (48 Hrs included), then you will get
                      refund 80% of Basic Flight charge and Addons total.{" "}
                    </li>
                    <li>
                      {" "}
                      If you are cancel trip between duration of departure 48
                      Hours and above, then you will get full refund of Basic
                      Flight charge and Addons total.{" "}
                    </li>
                  </ul>
                </div>
                <Alert className="font-qs text-sm text-red-500 bg-red-50 p-1 my-4 font-bold">
                  {" "}
                  If you have cancel once your trip, then you are not eligible
                  for your confirmed seats and don't recover this seats again.{" "}
                </Alert>
                <div className="font-qs border p-2 my-2 text-black flex justify-between">
                  <h1 className="font-bold">
                    {" "}
                    Currently You will get refund :{" "}
                  </h1>
                  <p className="bg-green-700 text-white p-1 font-bold">
                    {" "}
                    &#8377; {paymentRefund}{" "}
                  </p>
                </div>
                <div className="flex">
                  <Checkbox onChange={() => setAck(!ack)} />{" "}
                  <p className="text-sm">
                    I Acknowldge the aboves terms and condition, I am totally
                    responsible for lost of my confirmed seat(s) and I want to
                    cancel my trip due to unforseen reason.
                  </p>
                </div>
              </div>
            </DialogBody>
            <DialogFooter>
              <button className="mx-2" onClick={() => setOpen(!open)}>
                Cancel{" "}
              </button>
              <Button disabled={!ack} onClick={() => cancelTrip()}>
                Confirm
              </Button>
            </DialogFooter>
          </>
        ) : (
          <DialogBody>
            <div className="flex items-center">
              <img
                src="https://res.cloudinary.com/dgsqarold/image/upload/v1689828032/Goibibo/9503179_acrnyx.png"
                alt="Error!"
                className="w-24"
              />
              <div className="font-qs font-bold text-black mx-2">
                <h1 className="text-lg">
                  Oops! Sorry You have not eligible to cancel your trip.{" "}
                </h1>
                <p className="font-normal">
                  For cancellation of your trip, you must issue the request
                  before 2 hours of departure. Please check terms and
                  conditions.{" "}
                </p>
              </div>
            </div>
          </DialogBody>
        )}
      </Dialog>
      <ToastContainer />
    </div>
  );
}
