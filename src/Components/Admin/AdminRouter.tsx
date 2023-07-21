import React, { useState } from "react";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import Admindashpage from "../../Pages/Admin/Admin-dashboard.page";
import AdminManagementPage from "../../Pages/Admin/Admin-management.page";
import { MdDashboard } from "react-icons/md";
import { BsTools } from "react-icons/bs";
import { FaPlane, FaUser } from "react-icons/fa";
import AirlineProfilePage from "../../Pages/Admin/Airline-Profile.page";
import { GrSettingsOption } from "react-icons/gr";
import { AiFillSetting } from "react-icons/ai";
export default function AdminRouter() {
  const [activeTab, setActiveTab] = useState<number>(1);
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
        </TabsHeader>
        <TabsBody>
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
