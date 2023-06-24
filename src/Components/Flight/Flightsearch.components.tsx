import {
  Input,
  Menu,
  MenuHandler,
  MenuList,
  Radio,
} from "@material-tailwind/react";

import FlightInput from "./Subcomponents/FlightInput";
import { BsArrowLeftRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { SearchParamsType, SearchType } from "../../Types";

export default function Flightsearch() {
  const SearchParams = useSelector((state: RootState) => state.SearchParms);
  return (
    <div className="bg-white shadow-md w-max rounded-lg p-8 mx-auto -mt-8 relative">
      <div className="font-qs font-bold text-gray-600">
        <span>
          {" "}
          <Radio id="blue" name="color" color="blue" defaultChecked />{" "}
          <label className="text-lg">One way</label>
        </span>
        <span>
          {" "}
          <Radio id="blue" name="color" color="blue" />{" "}
          <label className="text-lg">Round Trip</label>
        </span>
      </div>
      <div className="flex my-4 flex-wrap">
        <div className="rounded-lg border p-2 px-4 w-80 font-qs font-bold mx-4">
          <Menu>
            <MenuHandler>
              <div className="text-xl">
                <label className="absolute bg-white mx-2 text-xs -mt-4 px-2 h-max text-gray-500">
                  FROM
                </label>{" "}
                {SearchParams.from}
                <p className="text-xs text-gray-500 font-arial font-light">
                  Indira Ghandi International Airport{" "}
                </p>
              </div>
            </MenuHandler>
            <MenuList className="-mt-16">
              <>
                <FlightInput label="FROM" type={SearchType.From} />
              </>
            </MenuList>
          </Menu>
        </div>
        <div className="relative rounded-lg border p-2 px-4 w-80 font-qs font-bold">
          <BsArrowLeftRight className="absolute -mx-10 my-1 rounded-full bg-white border p-2 w-max h-max" />
          <Menu>
            <MenuHandler>
              <div className="text-xl">
                <label className="absolute bg-white mx-2 text-xs -mt-4 px-2 h-max text-gray-500">
                  TO
                </label>{" "}
                {SearchParams.to}
                <p className="text-xs text-gray-500 font-arial font-light">
                  Sardar Vallabhbhai Patel International Airpot{" "}
                </p>
              </div>
            </MenuHandler>
            <MenuList className="-mt-16">
              <>
                <FlightInput label="TO" type={SearchType.To} />
              </>
            </MenuList>
          </Menu>
        </div>
        <div>
          <Input label="Departure Date" className="p-4" />
        </div>
      </div>
    </div>
  );
}
