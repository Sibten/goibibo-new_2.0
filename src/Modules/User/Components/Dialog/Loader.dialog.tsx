import React, { useState } from "react";
import { Dialog, DialogBody, Spinner } from "@material-tailwind/react";

export default function Loaderdialog() {
  const [open, setOpen] = useState(true);
  const [handle, setHandle] = useState(false);
  return (
    <div>
      <Dialog open={open} handler={setHandle} size="xs">
        <DialogBody>
          <div className="flex font-bold text-lg">
            {" "}
            <Spinner className="mx-4" /> Please Wait...{" "}
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
}
