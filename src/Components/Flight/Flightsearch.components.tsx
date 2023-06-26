import {
  Input,
  Menu,
  MenuHandler,
  MenuList,
  Radio,
} from "@material-tailwind/react";

import FlightInput from "./Subcomponents/FlightInput";
import { BsArrowLeftRight } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  AirportType,
  CallBackType,
  SearchParamsType,
  SearchType,
} from "../../Types";
import { useState } from "react";
import { searchActions } from "../../Actions/Search.action";
import JouernyCalender from "./Subcomponents/JouernyCalender";

export default function Flightsearch() {
  const SearchParams = useSelector((state: RootState) => state.SearchParms);

  const [openMenuFrom, setOpenMenuFrom] = useState(false);
  const [openMenuTo, setOpenMenuTo] = useState(false);

  const [returnDate, setReturnDate] = useState(false);

  const clickCallBack = (type: CallBackType) => {
    setOpenMenuFrom(false);
    setOpenMenuTo(false);
  };

  return (
    <div className="bg-white shadow-md w-max rounded-lg p-8 mx-auto -mt-8 relative">
      <div className="font-qs font-bold text-gray-600">
        <span>
          {" "}
          <Radio
            id="blue"
            name="color"
            color="blue"
            defaultChecked
            onChange={() => setReturnDate(false)}
          />{" "}
          <label className="text-lg">One way</label>
        </span>
        <span>
          {" "}
          <Radio
            id="blue"
            name="color"
            color="blue"
            onChange={() => setReturnDate(true)}
          />{" "}
          <label className="text-lg">Round Trip</label>
        </span>
      </div>
      <div className="flex my-4 flex-wrap">
        <div className="rounded-lg border p-2 px-4 w-60 h-16 font-qs font-bold mx-4">
          <Menu open={openMenuFrom} handler={setOpenMenuFrom}>
            <MenuHandler>
              <div className="text-lg" onClick={() => setOpenMenuFrom(true)}>
                <label className="absolute bg-white mx-2 text-xs -mt-4 px-2 h-max text-gray-500">
                  FROM
                </label>{" "}
                {SearchParams.from.city_name}
                <p className="text-xs text-gray-500 font-arial font-light truncate">
                  {SearchParams.from.airport_code},
                  {SearchParams.from.airport_name}{" "}
                </p>
              </div>
            </MenuHandler>
            <MenuList className="-mt-16">
              <>
                <FlightInput
                  label="From"
                  type={SearchType.From}
                  callback={clickCallBack}
                />
              </>
            </MenuList>
          </Menu>
        </div>
        <div className="relative rounded-lg border p-2 px-4 w-60 h-16 font-qs font-bold">
          <BsArrowLeftRight className="absolute -mx-10 my-1 rounded-full bg-white border p-2 w-max h-max" />
          <Menu open={openMenuTo} handler={setOpenMenuTo}>
            <MenuHandler>
              <div className="text-lg " onClick={() => setOpenMenuTo(true)}>
                <label className="absolute bg-white mx-2 text-xs -mt-4 px-2 h-max text-gray-500">
                  TO
                </label>{" "}
                {SearchParams.to.city_name}
                <p className="text-xs text-gray-500 font-arial font-light truncate">
                  {SearchParams.to.airport_code},{SearchParams.to.airport_name}{" "}
                </p>
              </div>
            </MenuHandler>
            <MenuList className="-mt-20">
              <>
                <FlightInput
                  label="To"
                  type={SearchType.To}
                  callback={clickCallBack}
                />
              </>
            </MenuList>
          </Menu>
        </div>

        <div className="mx-2 rounded-lg border p-2 px-4 w-36 h-16 font-qs font-bold">
          <Menu>
            <MenuHandler>
              <div className="text-lg">
                <label className="absolute bg-white mx-2 text-xs -mt-4 px-2 h-max text-gray-500">
                  Depature
                </label>{" "}
                <h2>
                  {new Date(SearchParams.dept_date).toLocaleDateString(
                    undefined,
                    { year: "2-digit", month: "short", day: "numeric" }
                  )}
                </h2>
                <p className="text-xs text-gray-500 font-arial font-light">
                  {" "}
                  {new Date(SearchParams.dept_date).toLocaleDateString(
                    undefined,
                    { weekday: "long" }
                  )}{" "}
                </p>
              </div>
            </MenuHandler>
            <MenuList className="-mt-16">
              <>
                <JouernyCalender type={SearchType.From}/>
              </>
            </MenuList>
          </Menu>
        </div>

        {returnDate ? (
          <div className="mx-2 rounded-lg border p-2 px-4 w-32 font-qs font-bold">
            <Menu>
              <MenuHandler>
                <div className="text-lg">
                  <label className="absolute bg-white mx-2 text-xs -mt-4 px-2 h-max text-gray-500">
                    Return
                  </label>{" "}
                  <h2>
                    {new Date(SearchParams.return_date!).toLocaleDateString(
                      undefined,
                      { year: "2-digit", month: "short", day: "numeric" }
                    )}
                  </h2>
                  <p className="text-xs text-gray-500 font-arial font-light">
                    {" "}
                    {new Date(SearchParams.return_date!).toLocaleDateString(
                      undefined,
                      { weekday: "long" }
                    )}{" "}
                  </p>
                </div>
              </MenuHandler>
              <MenuList className="-mt-16">
                <>
                  <JouernyCalender type={SearchType.To}/>
                </>
              </MenuList>
            </Menu>
          </div>
        ) : (
          <div className="mx-2 rounded-lg border p-2 px-4 w-32 font-qs font-bold">
            <div className="text-xl ">
              <label className="absolute bg-white mx-2 text-xs -mt-4 px-2 h-max text-gray-500">
                Return
              </label>{" "}
              <p className="text-xs text-gray-500 font-arial font-light">
                Click to return flight for better discount
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
