import React, { useEffect, useState } from "react";
import Title from "../../../../User/Components/Utility/Title";
import { Alert, Button, Input } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch, RootState } from "../../../../../store";
import { Link, useNavigate, useParams } from "react-router-dom";
import { postAPI, putAPI } from "../../../../../Services/API.services";
import { ToastContainer, toast } from "react-toastify";
import Loaderdialog from "../../../../User/Components/Dialog/Loader.dialog";
import { fetchAirlineFlights } from "../../../../../Actions/Admin/AirlineFlights.action";

export default function Reschedulepage() {
  const selector = useSelector((state: RootState) => state.AirlineFlight);

  const params = useParams();
  const flightNo = params.flightno;
  const flightDate = params.date;

  const findFlightData = selector.find((s) => s.flight_no == flightNo);
  const findFlightTiming = findFlightData?.timing.find(
    (t) =>
      new Date(t.source_time).toISOString() ==
      new Date(flightDate!).toISOString()
  );

  // console.log(findFlightData, findFlightTiming);

  const [updateData, setUpdateData] = useState({
    old_source_time: new Date(findFlightTiming?.source_time!).toISOString(),
    old_destination_time: new Date(
      findFlightTiming?.destination_time!
    ).toISOString(),
    new_source_time: "",
    new_destination_time: "",
  });

  useEffect(() => {
    let oldDesTime = new Date(updateData.old_destination_time);
    let oldSourceTime = new Date(updateData.old_source_time);
    oldDesTime.setMinutes(
      oldDesTime.getMinutes() - oldDesTime.getTimezoneOffset()
    );
    oldSourceTime.setMinutes(
      oldSourceTime.getMinutes() - oldSourceTime.getTimezoneOffset()
    );

    setUpdateData({
      ...updateData,
      old_destination_time: oldDesTime.toISOString().slice(0, 16),
      old_source_time: oldSourceTime.toISOString().slice(0, 16),
    });
  }, []);

  const [message, setMessage] = useState("");
  const dispatch = useDispatch<AppThunkDispatch>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const updateFlight = async () => {
    setLoading(true);
    if (
      new Date(updateData.new_destination_time) <=
        new Date(updateData.new_source_time) ||
      updateData.new_source_time == "" ||
      updateData.new_destination_time == ""
    ) {
      console.log(updateData);
      setMessage("Provide proper value!");
      setTimeout(() => {
        setMessage("");
      }, 2000);
      setLoading(false);
    } else {
      try {
        console.log(updateData);
        const res = await putAPI(
          `/flight/reschedule?flightNo=${flightNo}`,
          JSON.stringify(updateData)
        );
        if (res.status == 200) {
          setLoading(false);
          toast.success(`Flight ${flightNo} is reschedulded`);
          setTimeout(() => {
            navigate("/admin/flights");
            dispatch(fetchAirlineFlights());
          }, 3000);
        }
      } catch (e) {
        setLoading(false);
        toast.error("Something bad happen!");
      }
    }
  };

  return (
    <div>
      <Title text={`Reschedule Flight - ${flightNo}`} />
      {loading ? <Loaderdialog /> : ""}
      <div className="w-60 mx-auto my-4">
        <p className="font-qs"> Update the flight </p>
        <div className="my-4">
          <Input
            type="datetime-local"
            label="Old Source Time"
            value={updateData.old_source_time}
          />
        </div>
        <div className="my-4">
          <Input
            type="datetime-local"
            label="Old Destination Time"
            value={updateData.old_destination_time}
          />
        </div>
        <div className="my-4">
          <Input
            type="datetime-local"
            label="New Source Time"
            min={new Date().toISOString().slice(0, -8)}
            onChange={(e) =>
              setUpdateData({ ...updateData, new_source_time: e.target.value })
            }
          />
        </div>
        <div className="my-4">
          <Input
            type="datetime-local"
            label="New Destination Time"
            min={new Date().toISOString().slice(0, -8)}
            onChange={(e) =>
              setUpdateData({
                ...updateData,
                new_destination_time: e.target.value,
              })
            }
          />
        </div>
        <div>
          {message ? (
            <Alert className="text-sm p-2 bg-red-50 text-red-500 my-2">
              {message}
            </Alert>
          ) : (
            ""
          )}
        </div>
        <div>
          <Button onClick={() => updateFlight()}> Reschedule </Button>{" "}
          <Link to="/admin/flights">
            {" "}
            <button> Cancel </button>
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
