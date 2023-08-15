import React from "react";
import { TripData } from "../../../../../Types";
import { Button, Tooltip } from "@material-tailwind/react";
import { FaDownload, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Card({
  data,
  disable,
}: {
  data: TripData;
  disable?: boolean;
}) {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-md p-2 flex items-center my-2">
      <div>
        <img
          src="https://res.cloudinary.com/dgsqarold/image/upload/v1689846803/Goibibo/5190199_vstzha.png"
          alt="trip"
        />
      </div>
      <div className="mx-4 text-black font-qs">
        <div className="flex">
          <div className="mx-4">
            <h1 className="text-gray-700 text-sm"> PNR No</h1>
            <p className="text-sm font-bold tracking-wider"> {data.PNR_no} </p>
          </div>
          <div className="mx-4">
            <h1 className="text-gray-700 text-sm"> From </h1>
            <p className="font-bold text-sm">
              {data.jouerny_info.source_city.city_name} (
              {data.jouerny_info.source_city.airport_code}){" "}
            </p>
          </div>
          <div className="mx-4">
            <h1 className="text-gray-700 text-sm"> To </h1>
            <p className="font-bold text-sm">
              {data.jouerny_info.destination_city.city_name} (
              {data.jouerny_info.destination_city.airport_code}){" "}
            </p>
          </div>
          <div className="mx-4">
            <h1 className="text-gray-700 text-sm"> Departure Date </h1>
            <p className="font-bold text-sm">
              {new Date(data.jouerny_info.departure_date).toDateString()}
            </p>
          </div>
          <div className="mx-4">
            <h1 className="text-gray-700 text-sm"> Passangers </h1>
            <p className="font-bold text-sm">
              {data.jouerny_info.peoples.length}
            </p>
          </div>
        </div>
      </div>
      {disable ? (
        ""
      ) : (
        <div>
          <Button
            variant="outlined"
            size="sm"
            color="blue"
            onClick={() => navigate(`/mytrip/${data.PNR_no}`)}
            className="text-xs flex"
          >
            <FaInfoCircle className="mr-1 mt-[1px]" />
            More Info
          </Button>
        </div>
      )}
    </div>
  );
}
