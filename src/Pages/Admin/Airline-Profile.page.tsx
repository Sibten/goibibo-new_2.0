import React, { useState } from "react";
import Title from "../../Components/Utility/Title";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Button } from "@material-tailwind/react";
import { FaPen } from "react-icons/fa";
import Editcomponent from "../../Components/Admin/Airline/Edit.component";
import { MdCancel } from "react-icons/md";

export default function AirlineProfilePage() {
  const selector = useSelector((state: RootState) => state.Airline);

  const [visibleForm, setVisibleForm] = useState(false);
  return (
    <div>
      <Title text="Airline Profile" />
      <div className="p-4">
        <div className="border border-gray-300 rounded-md p-1 flex items-center overflow-hidden">
          <div className="rotate-90 ">
            <h1 className="font-bold  text-gray-300 text-2xl -mt-4 w-max left-1/2 right-1/2">
              {" "}
              {selector.airline_code} {selector.airline_id}
            </h1>
          </div>
          <div>
            <img src={selector.airline_icon} alt="Airline" />
          </div>
          <div className="flex justify-between w-full mx-2">
            <div>
              <h1 className="text-xl font-bold text-black">
                {selector.airline_name}
              </h1>
              <p>{selector.airline_location} </p>
            </div>
            <div>
              <Button
                className="flex rounded-full"
                onClick={() => setVisibleForm(!visibleForm)}
                color="indigo"
              >
                {visibleForm ? (
                  <>
                    {" "}
                    <MdCancel className="mx-2 -mt-[1px] text-lg" /> Cancel{" "}
                  </>
                ) : (
                  <>
                    {" "}
                    <FaPen className="mx-2 mt-[1px]" /> Edit{" "}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div>{visibleForm ? <Editcomponent data={selector} /> : ""}</div>
    </div>
  );
}
