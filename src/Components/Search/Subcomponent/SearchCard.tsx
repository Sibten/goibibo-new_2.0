import React, { useState } from "react";
import { IoIosAirplane } from "react-icons/io";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { RxDotFilled } from "react-icons/rx";
import { LuBaggageClaim } from "react-icons/lu";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
export default function SearchCard() {
  const [openDetails, setOpenDetails] = useState(false);
  return (
    <div>
      <div className="bg-white my-4 p-2 mx-4 rounded-md shadow-md">
        <div className="flex">
          {" "}
          <img
            src="https://res.cloudinary.com/dgsqarold/image/upload/v1688368494/Goibibo/IndiGo-Logo-2048x1288_cqedfq.png"
            alt="airline"
            className="w-16 h-10"
          />
          <span className="mt-2 mx-2">Indigo</span>
        </div>
        <div className="flex justify-between mx-8 my-4">
          <div>
            <p className="text-gray-600 font-bold text-xs">
              BLR{" "}
              <span className="text-gray-500 font-normal">
                Bengaluru, India
              </span>
            </p>
            <h3 className="font-bold text-xl mx-2 mt-2"> 21 : 45</h3>
            <span className="text-xs text-gray-500 mx-1">04 June 2023</span>
          </div>
          <div>
            <p className="text-gray-500 text-xs"> - NON STOP - </p>
            <h3 className="font-bold text-xl mt-2"> 4h 00m </h3>
          </div>
          <div>
            <p className="text-gray-600 font-bold text-xs">
              BOM{" "}
              <span className="text-gray-500 font-normal">Mumbai, India</span>
            </p>
            <h3 className="font-bold text-xl mx-2 mt-2"> 01 : 45 </h3>
            <span className="text-xs text-gray-500 mx-1">04 June 2023</span>
          </div>
          <div>
            <p className="text-gray-500 text-xs"> Fare </p>
            <h1 className="text-xl font-bold mt-2"> &#8377; 4182 </h1>
          </div>
          <div>
            <button className="font-bold uppercase bg-blue-700 rounded-md text-white px-6 p-2 text-xs shadow-md">
              Book
            </button>
          </div>
        </div>
        <div className="w-max ml-auto">
          <button onClick={() => setOpenDetails(!openDetails)}>
            {" "}
            <small className="flex capitalize text-blue-700 font-bold">
              {" "}
              Flight details{" "}
              {openDetails ? (
                <BiChevronUp className="mt-1 mx-1" />
              ) : (
                <BiChevronDown className="mt-1 mx-1" />
              )}
            </small>{" "}
          </button>
        </div>
        {openDetails ? (
          <div>
            <Tabs>
              <TabsHeader>
                <Tab key="info" value="finfo">
                  Flight Information{" "}
                </Tab>
                <Tab key="fare" value="fdetails">
                  Fare Details{" "}
                </Tab>
                <Tab key="bag" value="binfo">
                  Baggage Rule{" "}
                </Tab>
              </TabsHeader>
              <TabsBody>
                <TabPanel key="info" value="finfo">
                  <div className="border rounded-lg p-2 my-2 flex justify-evenly items-center">
                    <div>
                      <img
                        src="https://res.cloudinary.com/dgsqarold/image/upload/v1688368494/Goibibo/IndiGo-Logo-2048x1288_cqedfq.png"
                        alt="airline"
                        className="w-16 h-10 mx-auto"
                      />{" "}
                      <p className="text-xs"> IG-AMD-BOM-0-AB-203</p>
                    </div>
                    <div className="text-right my-2 w-48">
                      <h1 className="text-lg">
                        {" "}
                        <span className="font-bold text-black"> BLR </span>{" "}
                        <span>21:45</span>
                      </h1>
                      <p className="text-sm">
                        Bengaluru International Airport, India
                      </p>
                    </div>
                    <div className="w-48 flex items-center">
                      <RxDotFilled className="text-xl text-blue-700" />
                      <p className="w-full text-center border-b h-3 -mt-2 mx-2 border-dashed border-gray-400">
                        <span className="bg-white px-2"> 4h 00m </span>
                      </p>
                      <IoIosAirplane className="text-xl text-blue-700" />
                    </div>
                    <div className="my-2 w-48">
                      <h1 className="text-lg">
                        {" "}
                        <span className="font-bold text-black"> BOM </span>{" "}
                        <span>01:45</span>
                      </h1>
                      <p className="text-sm">
                        Chhatrapati Shivaji Maharaj Internation Airoprt
                      </p>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel key="fare" value="fdetails">
                  <table className="w-full">
                    <caption>Charges </caption>
                    <tbody className="text-black">
                      <tr>
                        <td> Base fare (1 Adult)</td>
                        <td> &#8377; 3152 </td>
                      </tr>
                      <tr>
                        <td> Taxes and Fees (1 Adult) </td>
                        <td> &#8377; 1030 </td>
                      </tr>
                      <tr>
                        <td> Total Fare (1 Adult) </td>
                        <td> &#8377; 4182 </td>
                      </tr>
                    </tbody>
                  </table>
                </TabPanel>
                <TabPanel key="bag" value="binfo">
                  <div>
                    <div className="my-2">
                      <img
                        src="https://res.cloudinary.com/dgsqarold/image/upload/v1688368494/Goibibo/IndiGo-Logo-2048x1288_cqedfq.png"
                        alt="airline"
                        className="w-16 h-10"
                      />{" "}
                      <p className="text-xs"> IG-AMD-BOM-0-AB-203</p>
                    </div>
                    <table className="w-full text-black">
                      <caption></caption>
                      <thead>
                        <tr>
                          <th className="text-left px-2">Baggage Type</th>
                          <th>
                            <h3 className="flex">
                              <span>
                                {" "}
                                <LuBaggageClaim className="mt-1 mx-2" />
                              </span>
                              <span>Check-In</span>
                            </h3>
                          </th>
                          <th>
                            <h3 className="flex">
                              <span>
                                <MdOutlineAirlineSeatReclineNormal className="mt-1 mx-2" />
                              </span>
                              <span> Cabin</span>
                            </h3>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>ADULT</td>
                          <td>15kg</td>
                          <td>7kg</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TabPanel>
              </TabsBody>
            </Tabs>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
