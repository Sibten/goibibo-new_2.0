import React, { useState } from "react";
import { Dialog, DialogBody, Spinner } from "@material-tailwind/react";

export default function Loaderdialog() {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <Dialog open={open} handler={setOpen} size="xs">
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
