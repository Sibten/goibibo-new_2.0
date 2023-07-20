import {
  Alert,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import React, { useState } from "react";

export default function Faildialog({ orderId }: { orderId?: string }) {
  const [open, setOpen] = useState(true);
  const [off, setOff] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <div>
      <Dialog open={open} handler={setOff}>
        <DialogBody className="text-center">
          <img
            src="https://res.cloudinary.com/dgsqarold/image/upload/v1689828032/Goibibo/9503179_acrnyx.png"
            alt=""
            className="w-24 h-24 mx-auto"
          />
          <div>
            <h1 className="font-bold text-xl">Your payment has been failed</h1>
            <p>Please Try Again </p>
            <p className="my-2 border rounded-md">
              Order Id : <span>{orderId} </span>
            </p>
            <Alert className="bg-red-50 text-red-600 text-sm">
              {" "}
              If Your Amount is deducted from Bank, So Don't worry If System
              will detecte the Transaction failed, It will automatically
              Generated Refund. Your Refund will credited in between 1-2 Working
              days.
            </Alert>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="outlined" color="red" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
