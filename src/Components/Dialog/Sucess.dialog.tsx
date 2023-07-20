import React, { useState } from "react";
import {
  Dialog,
  DialogBody,
  Alert,
  DialogFooter,
  Button,
} from "@material-tailwind/react";

export default function Sucessdialog({
  orderId,
  rzpId,
}: {
  orderId?: string;
  rzpId?: string;
}) {
  const [open, setOpen] = useState(true);
  const [off, setOff] = useState(false);

  const handleOpen = () => setOpen(!open);
  return (
    <div>
      <Dialog open={open} handler={setOff}>
        <DialogBody className="text-center">
          <img
            src="https://res.cloudinary.com/dgsqarold/image/upload/v1689829326/Goibibo/845646_cpnryy.png"
            alt=""
            className="w-24 h-24 mx-auto"
          />
          <div className="my-2">
            <h1 className="font-bold text-xl">
              Your transaction is sucessfully done
            </h1>
            <p>Your Ticket will be avliable on Trip Section</p>
          </div>

          <div className="border rounded-md bg-gray-100">
            <ul>
              <li>
                {" "}
                Order Id : <span>{orderId} </span>{" "}
              </li>
              <li>
                Razorpay Id : <span> {rzpId}</span>
              </li>
            </ul>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="outlined"
            color="green"
            onClick={() => setOpen(false)}
          >
            Done
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
