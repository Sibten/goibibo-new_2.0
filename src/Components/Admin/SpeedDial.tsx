import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
  Typography,
} from "@material-tailwind/react";

import { MdFlightTakeoff, MdSettings } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AdminManagementSpeedDial() {
  const labelProps = {
    variant: "small",
    color: "blue-gray",
    className:
      "bg-white text-sm absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal",
  };

  return (
    <div className="fixed bottom-8 right-8">
      <SpeedDial>
        <Link to="/admin/management">
          <SpeedDialHandler className="bg-[#2176e3]">
            <IconButton size="lg" className="rounded-full">
              <FaPlus className="h-5 w-5 transition-transform group-hover:rotate-45" />
            </IconButton>
          </SpeedDialHandler>
        </Link>
        <SpeedDialContent>
          <Link to="management/scheduleflight">
            {" "}
            <SpeedDialAction className="relative">
              <MdFlightTakeoff />
              <Typography {...labelProps}>Schedule Flight</Typography>
            </SpeedDialAction>
          </Link>

          <Link to="/admin/management">
            <SpeedDialAction className="relative">
              <MdSettings className="h-5 w-5" />
              <Typography {...labelProps}>Management</Typography>
            </SpeedDialAction>
          </Link>
        </SpeedDialContent>
      </SpeedDial>
    </div>
  );
}
