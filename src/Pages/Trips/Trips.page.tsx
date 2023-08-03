import React, { useState } from "react";
import Title from "../../Components/Utility/Title";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { FaSuitcase } from "react-icons/fa";
import {
  MdDoneOutline,
  MdFreeCancellation,
  MdOutlineDone,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch, RootState } from "../../store";
import UpcomingTrips from "../../Components/Trips/Upcoming.components";
import { BookingStatus } from "../../Types";
import { BiReset } from "react-icons/bi";
import { fetchTrips } from "../../Actions/Trip.action";
import CancelTrip from "../../Components/Trips/Cancel.components";
import Completedtrip from "../../Components/Trips/Completed.component";

export default function Tripspage() {
  const [currentTab, setCurrentTab] = useState<number>(1);

  const selector = useSelector((state: RootState) => state.Trips);
  const dispatch = useDispatch<AppThunkDispatch>();

  const upcoming = selector.filter(
    (s) =>
      s.status == BookingStatus.Upcoming &&
      new Date(s.jouerny_info.departure_date) >= new Date()
  );
  const cancel = selector.filter((s) => s.status == BookingStatus.Closed);
  const completed = selector.filter(
    (s) => new Date(s.jouerny_info.departure_date) < new Date()
  );

  return (
    <div className="bg-[#e9eef7] bg-fixed h-[51rem] w-full overflow-auto">
      <div>
        <Title text="My Trips" />
        <div className="w-[60rem] mx-auto relative">
          <div className=" flex absolute -mt-8 font-arial text-white">
            <BiReset onClick={() => dispatch(fetchTrips())} className="mt-1" />
            <span className="mx-2">Refresh</span>
          </div>
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
            <TabsBody>
              <TabPanel key={"upcoming"} value={"upcoming"}>
                <UpcomingTrips data={upcoming} />
              </TabPanel>
              <TabPanel key={"cancelled"} value={"cancelled"}>
                <CancelTrip data={cancel} />
              </TabPanel>
              <TabPanel key={"completed"} value={"completed"}>
                <Completedtrip data={completed} />
              </TabPanel>
            </TabsBody>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
