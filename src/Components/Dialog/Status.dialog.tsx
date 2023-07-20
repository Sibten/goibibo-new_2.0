import React from "react";
import Sucessdialog from "./Sucess.dialog";
import Faildialog from "./Fail.dialog";

export default function Statusdialog({
  status,
  orderId,
  rzpId,
}: {
  status: boolean;
  orderId?: string;
  rzpId?: string;
}) {
  return (
    <div>
      {status ? (
        <Sucessdialog orderId={orderId} rzpId={rzpId} />
      ) : (
        <Faildialog orderId={orderId} />
      )}
    </div>
  );
}
