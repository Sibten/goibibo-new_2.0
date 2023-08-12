import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import React from "react";
import { IoIosAirplane } from "react-icons/io";
import { RxDotFilled } from "react-icons/rx";
import { LuBaggageClaim } from "react-icons/lu";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { ClassFare, Flighclass, LuggageType, ResultBase, SearchType } from "../../../Types";
import { calDuration, calFare, time } from "../../../Helper/Method";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const findLuggaeInfo = (
  luggage: Array<LuggageType>,
  fclass: number
): LuggageType => {
  switch (fclass) {
    case Flighclass.Business:
      return luggage.find((s) => s.type == Flighclass.Business)!;
    case Flighclass.Economy:
      return luggage.find((s) => s.type == Flighclass.Economy)!;
    case Flighclass.FirstClass:
      return luggage.find((s) => s.type == Flighclass.FirstClass)!;
    case Flighclass.PremiumEconomy:
      return luggage.find((s) => s.type == Flighclass.PremiumEconomy)!;
    default:
      return { type: -1, limit: 0 };
  }
};
export default function ExtraInfo({
  type,
  value,
  fclass,
  id,
}: {
  type: number;
  value: ResultBase;
  fclass: number;
  id: number;
}) {
  const searchParams = useSelector((state: RootState) => state.SearchParms);
  const flightfare = calFare(
    value.route_id.distance,
    { basicfare: value.fare.fare, tax: value.fare.tax },
    fclass,
    value.route_id.stops.length,
    value.available_seats,
    type == SearchType.From ? searchParams.dept_date : searchParams.return_date!
  );

  const findLuggage = findLuggaeInfo(value.rule.luggage, fclass);
  return (
    <div>
      <div>
        <Tabs value={`finfo${id}`}>
          <TabsHeader>
            <Tab id={`info${id}`} key={`info${id}`} value={`finfo${id}`}>
              Flight Information{" "}
            </Tab>
            <Tab id={`fare${id}`} key={`fare${id}`} value={`fdetails${id}`}>
              Fare Details{" "}
            </Tab>
            <Tab id={`bag${id}`} key={`bag${id}`} value={`binfo${id}`}>
              Baggage Rule{" "}
            </Tab>
          </TabsHeader>
          <TabsBody>
            <TabPanel key={`info${id}`} value={`finfo${id}`}>
              <div className="border rounded-lg p-2 my-2 grid grid-cols-4">
                <div className="mx-auto">
                  <img
                    src={value.airline_id.airline_icon}
                    alt="airline"
                    className="w-10 h-10 mx-auto my-2"
                  />{" "}
                  <p className="text-xs"> {value.flight_no}</p>
                </div>
                <div className="text-right my-2">
                  <h1 className="text-sm">
                    {" "}
                    <span className="font-bold text-black">
                      {" "}
                      {value.route_id.source_city.airport_code}{" "}
                    </span>{" "}
                    <span>{time(value.timing[0].source_time)}</span>
                  </h1>
                  <p className="text-xs">
                    {value.route_id.source_city.airport_name}
                  </p>
                </div>
                <div className="flex items-center mx-4">
                  <RxDotFilled className="text-xl text-blue-700" />
                  <p className="w-full text-center border-b h-3 -mt-2 mx-2 border-dashed border-gray-400">
                    <span className="bg-white px-2 text-sm">
                      {" "}
                      {calDuration(
                        value.timing[0].source_time,
                        value.timing[0].destination_time
                      )}
                    </span>
                  </p>
                  <IoIosAirplane className="text-xl text-blue-700" />
                </div>
                <div className="my-2">
                  <h1 className="text-sm">
                    {" "}
                    <span className="font-bold text-black">
                      {value.route_id.destination_city.airport_code}
                    </span>{" "}
                    <span>{time(value.timing[0].destination_time)}</span>
                  </h1>
                  <p className="text-xs">
                    {value.route_id.destination_city.airport_name}
                  </p>
                </div>
              </div>
            </TabPanel>
            <TabPanel key={`fare${id}`} value={`fdetails${id}`}>
              <table className="w-full">
                <caption>Charges </caption>
                <tbody className="text-black">
                  <tr>
                    <td> Base fare (1 Adult)</td>
                    <td>
                      {" "}
                      &#8377;{" "}
                      {flightfare.basic.toLocaleString(
                        process.env.REACT_APP_REGION
                      )}{" "}
                    </td>
                  </tr>
                  <tr>
                    <td> Taxes and Fees (1 Adult) </td>
                    <td>
                      {" "}
                      &#8377;{" "}
                      {flightfare.tax.toLocaleString(
                        process.env.REACT_APP_REGION
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td> Total Fare (1 Adult) </td>
                    <td>
                      {" "}
                      &#8377;{" "}
                      {(flightfare.basic + flightfare.tax).toLocaleString(
                        process.env.REACT_APP_REGION
                      )}{" "}
                    </td>
                  </tr>
                </tbody>
              </table>
            </TabPanel>
            <TabPanel key={`bag${id}`} value={`binfo${id}`}>
              <div>
                <div className="my-2">
                  <img
                    src={value.airline_id.airline_icon}
                    alt="airline"
                    className="w-10 h-10"
                  />{" "}
                  <p className="text-xs"> {value.flight_no}</p>
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
                      <td>{findLuggage.limit} Kg</td>
                      <td>{Math.ceil(findLuggage.limit / 2)} Kg</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
}
