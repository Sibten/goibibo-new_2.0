import { useEffect, useState } from "react";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import Admindashpage from "../Pages/Admin-dashboard.page";
import { MdDashboard, MdFlight, MdSettings } from "react-icons/md";
import { FaPlane } from "react-icons/fa";
import AirlineProfilePage from "../Pages/Airline-Profile.page";

import { Link } from "react-router-dom";
export default function AdminRouter() {
  const [activeTab, setActiveTab] = useState<number>(1);
  return (
    <div className="h-max">
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
          <TabPanel value={"dashboard"} className="p-0 h-max pb-8">
            <Admindashpage />
          </TabPanel>
          <TabPanel value={"profile"} className="p-0 h-max">
            <AirlineProfilePage />
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
}
