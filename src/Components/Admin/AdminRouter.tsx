import { useEffect, useState } from "react";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import Admindashpage from "../../Pages/Admin/Admin-dashboard.page";
import { MdDashboard, MdSettings } from "react-icons/md";
import { FaPlane } from "react-icons/fa";
import AirlineProfilePage from "../../Pages/Admin/Airline-Profile.page";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppThunkDispatch } from "../../store";
import { fetchAirlineDetails } from "../../Actions/Admin/Airline.action";
import { fetchAirlineFlights } from "../../Actions/Admin/AirlineFlights.action";
import { Link } from "react-router-dom";
export default function AdminRouter() {
  const [activeTab, setActiveTab] = useState<number>(1);

  const user = useSelector((state: RootState) => state.User);
  const airline = useSelector((state: RootState) => state.Airline);
  const flight = useSelector((state: RootState) => state.AirlineFlight);

  const dispatch = useDispatch<AppThunkDispatch>();
  return (
    <div className="h-screen">
      <Tabs value="dashboard" orientation="vertical">
        <TabsHeader className="w-48 h-screen sticky top-0">
          <Tab
            value={"dashboard"}
            key={"dashboard"}
            className={`h-max my-2 font-qs font-bold flex justify-start   ${
              activeTab == 1 ? "text-blue-800" : "text-gray-700"
            }`}
            onClick={() => setActiveTab(1)}
          >
            <p className="flex">
              {" "}
              <MdDashboard className="mx-2 my-1" /> Dashboard{" "}
            </p>
          </Tab>
          <Tab
            value={"profile"}
            key={"profile"}
            className={`h-max my-2 font-qs font-bold  flex justify-start ${
              activeTab == 2 ? "text-blue-800" : "text-gray-700"
            }`}
            onClick={() => setActiveTab(2)}
          >
            <p className="flex justify-between ">
              {" "}
              <FaPlane className="mx-2 my-1" /> Airline Profile{" "}
            </p>
          </Tab>
          <Link to="management">
            {" "}
            <Tab
              value={"settings"}
              key={"settings"}
              className={`h-max my-2 font-qs font-bold  flex justify-start ${
                activeTab == 3 ? "text-blue-800" : "text-gray-700"
              }`}
              onClick={() => setActiveTab(3)}
            >
              <p className="flex justify-between ">
                {" "}
                <MdSettings className="mx-2 my-1" /> Management
              </p>
            </Tab>{" "}
          </Link>
        </TabsHeader>
        <TabsBody className="bg-white">
          <TabPanel value={"dashboard"} className="p-0">
            <Admindashpage />
          </TabPanel>
          <TabPanel value={"profile"} className="p-0">
            <AirlineProfilePage />
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
}
