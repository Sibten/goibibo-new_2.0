import React, { useState } from "react";
import Title from "../../Components/Utility/Title";
import { Tab, Tabs, TabsHeader } from "@material-tailwind/react";
import { FaSuitcase } from "react-icons/fa";
import {
  MdDoneOutline,
  MdFreeCancellation,
  MdOutlineDone,
} from "react-icons/md";

export default function Tripspage() {
  const [currentTab, setCurrentTab] = useState<number>();

  return (
    <div>
      <div className="bg-[#e9eef7]">
        <Title text="My Trips" />
        <div className="w-[60rem] mx-auto">
          <Tabs value="upcoming">
            <TabsHeader>
              <Tab
                key={"upcoming"}
                value="upcoming"
                className={
                  currentTab == 1
                    ? "font-qs font-bold"
                    : " font-qs font-bold opacity-60"
                }
                onClick={() => setCurrentTab(1)}
              >
                <p className="flex">
                  <FaSuitcase className="mx-2 my-1" /> Upcoming Trip
                </p>
              </Tab>

              <Tab
                key={"cancelled"}
                value="cancelled"
                className={
                  currentTab == 2
                    ? "font-qs font-bold"
                    : " font-qs font-bold opacity-60"
                }
                onClick={() => setCurrentTab(2)}
              >
                <p className="flex">
                  <MdFreeCancellation className="mx-2 my-1" />
                  Cancelled
                </p>
              </Tab>
              <Tab
                key={"completed"}
                value="completed"
                className={
                  currentTab == 3
                    ? "font-qs font-bold"
                    : " font-qs font-bold opacity-60"
                }
                onClick={() => setCurrentTab(3)}
              >
                <p className="flex">
                  <MdDoneOutline className="mx-2 my-1" /> Completed Trip
                </p>
              </Tab>
            </TabsHeader>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
