import React, { useState } from "react";
import { FaLuggageCart } from "react-icons/fa";
import Baggage from "./SubComponents/Baggage";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { AddonBase, SearchType } from "../../../../Types";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";

export default function AddOns({
  callback,
  addOnDisable,
}: {
  callback: Function;
  addOnDisable: boolean;
}) {
  const selector = useSelector((state: RootState) => state.BookingFlight);

  return (
    <div className="my-4">
      <div className="bg-white shadow-md w-[48rem] rounded-md py-4 mx-8 h-max font-arial">
        <h1 className="font-qs font-bold p-2 text-lg px-4 uppercase">
          {" "}
          Add ons{" "}
        </h1>
        <Tabs value={"dep"}>
          <TabsHeader>
            <Tab value={"dep"} key={"dep"}>
              {" "}
              <h2 className="font-bold flex">
                {" "}
                <FaLuggageCart className="text-xl mx-2 my-1" /> Departure
                Baggage Addons{" "}
              </h2>{" "}
            </Tab>
            {selector.rtn ? (
              <Tab value={"rtn"} key={"rtn"}>
                {" "}
                <h2 className="font-bold flex">
                  {" "}
                  <FaLuggageCart className="text-xl mx-2 my-1" /> Return Baggage
                  Addons{" "}
                </h2>{" "}
              </Tab>
            ) : (
              ""
            )}
          </TabsHeader>
          <TabsBody>
            <TabPanel value={"dep"} key={"dep"}>
              <Baggage
                callback={callback}
                type={SearchType.From}
                addOnDisable={addOnDisable}
              />
            </TabPanel>
            <TabPanel value={"rtn"} key={"rtn"}>
              <Baggage
                callback={callback}
                type={SearchType.To}
                addOnDisable={addOnDisable}
              />
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
}
