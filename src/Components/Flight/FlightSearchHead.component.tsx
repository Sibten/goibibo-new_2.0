import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { RootState } from "../../store";
import { SearchParamsType, SearchType } from "../../Types";
import { searchActions } from "../../Actions/Search.action";
import FlightInput from "./Subcomponents/CityInput";
import { Menu, MenuHandler, MenuList, Radio } from "@material-tailwind/react";
import { HiOutlineArrowsRightLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import FlightClass from "./Subcomponents/FlightClass";
import { FaLastfm } from "react-icons/fa";

export default function FlightSearchHead() {
  const location = useLocation();
  const url = new URLSearchParams(location.search);

  const SearchParams = useSelector((state: RootState) => state.SearchParms);
  const Airports = useSelector((state: RootState) => state.Airports);
  const dispatch = useDispatch();

  let [URLSearchParamsData, setURLSearchParamsData] =
    useState<SearchParamsType>({ ...SearchParams });

  const [openReturnDate, setopenReturnDate] = useState(
    SearchParams.return_date ? true : false
  );
  useEffect(() => {
    if (Airports) {
      URLSearchParamsData.from =
        Airports.find((s) => s.airport_code === url.get("from")) ??
        SearchParams.from;
      URLSearchParamsData.to =
        Airports.find((s) => s.airport_code === url.get("to")) ??
        SearchParams.to;
      URLSearchParamsData.dept_date =
        url.get("dep_date") ?? new Date().toISOString();
      URLSearchParamsData.return_date = url.get("rtn_date") ?? undefined;
      if (URLSearchParamsData.return_date) setopenReturnDate(true);
      dispatch(searchActions.setParams(URLSearchParamsData));
    }
  }, [Airports]);

  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const [openClass, setOpenClass] = useState(false);

  const clickCallBack = () => {
    setOpenFrom(false);
    setOpenTo(false);
    setOpenClass(false);
  };
  const navigate = useNavigate();

  const retnDateDef = () => {
    return new Date(
      new Date(URLSearchParamsData.dept_date).setDate(
        new Date(URLSearchParamsData.dept_date).getDate() + 1
      )
    )
      .toISOString()
      .split("T")[0];

    // setURLSearchParamsData({ ...URLSearchParamsData, return_date: val });
  };
  useEffect(() => {
    URLSearchParamsData.pepoles = SearchParams.pepoles;
  }, [SearchParams.pepoles]);
  const updateSearch = () => {
    if (openReturnDate && !URLSearchParamsData.return_date) {
      URLSearchParamsData.return_date = retnDateDef();
    }
    dispatch(searchActions.setParams(URLSearchParamsData));
    let url = "";
    if (openReturnDate) {
      url = `?from=${URLSearchParamsData.from.airport_code}&to=${URLSearchParamsData.to.airport_code}&dep_date=${URLSearchParamsData.dept_date}&rtn_date=${URLSearchParamsData.return_date}&class=${URLSearchParamsData.class}&adults=${URLSearchParamsData.pepoles.adults}&child=${URLSearchParamsData.pepoles.children}&infants=${URLSearchParamsData.pepoles.infants}`;
    } else {
      url = `?from=${URLSearchParamsData.from.airport_code}&to=${URLSearchParamsData.to.airport_code}&dep_date=${URLSearchParamsData.dept_date}&class=${URLSearchParamsData.class}&adults=${URLSearchParamsData.pepoles.adults}&child=${URLSearchParamsData.pepoles.children}&infants=${URLSearchParamsData.pepoles.infants}`;
    }
    navigate(`/flight/search/${url}`);
  };

  return (
    <div className="bg-blue-700 sticky top-0 text-white  p-4">
      <div className="w-full flex justify-center">
        <div className="mx-4">
          <div className="flex">
            <div className="mx-2 ">
              <input
                type="radio"
                name="trip"
                id="oneway"
                className="p-4 mx-2"
                defaultChecked={SearchParams.return_date ? false : true}
                onChange={() => setopenReturnDate(false)}
              />
              <label className="font-qs font-bold">One way</label>
            </div>
            <div className="mx-2">
              <input
                type="radio"
                name="trip"
                id="roundtrip"
                className="p-4 mx-2"
                defaultChecked={SearchParams.return_date ? true : false}
                onChange={() => setopenReturnDate(true)}
              />
              <label className="font-qs font-bold">Round trip</label>
            </div>
          </div>
          <div className="flex items-center flex-wrap">
            <div className="mx-2">
              <Menu open={openFrom} handler={setOpenFrom}>
                <MenuHandler>
                  <div>
                    <label
                      htmlFor=""
                      className="font-arial uppercase text-gray-200 text-xs my-2"
                    >
                      From
                    </label>
                    <input
                      type="text"
                      name="from"
                      id="from"
                      className="block bg-indigo-500 p-2 w-60 rounded-lg font-qs font-bold"
                      value={SearchParams.from.airport_code}
                      readOnly
                    />
                  </div>
                </MenuHandler>
                <MenuList className="-mt-16">
                  <>
                    {" "}
                    <FlightInput
                      label="From"
                      callback={clickCallBack}
                      type={SearchType.From}
                    />{" "}
                  </>
                </MenuList>
              </Menu>
            </div>
            <div className="mt-4 text-xl">
              <HiOutlineArrowsRightLeft />
            </div>
            <div className="mx-2">
              <Menu open={openTo} handler={setOpenTo}>
                <MenuHandler>
                  <div>
                    <label
                      htmlFor=""
                      className="font-arial uppercase text-gray-200 text-xs my-2"
                    >
                      To
                    </label>
                    <input
                      type="text"
                      name="to"
                      id="to"
                      className="block bg-indigo-500 p-2 w-60 rounded-lg font-qs font-bold"
                      value={SearchParams.to.airport_code}
                      readOnly
                    />
                  </div>
                </MenuHandler>
                <MenuList className="-mt-16">
                  <>
                    {" "}
                    <FlightInput
                      label="To"
                      callback={clickCallBack}
                      type={SearchType.To}
                    />{" "}
                  </>
                </MenuList>
              </Menu>
            </div>
            <div className="mx-2">
              <label
                htmlFor=""
                className="font-arial uppercase text-gray-200 text-xs my-2"
              >
                Departure Date
              </label>
              <input
                type="date"
                name="dep_date"
                id="dep_date"
                min={new Date().toISOString().split("T")[0]}
                defaultValue={
                  new Date(URLSearchParamsData.dept_date)
                    .toISOString()
                    .split("T")[0]
                }
                className="block bg-indigo-500 p-2 w-30 rounded-lg font-qs font-bold"
                onChange={(e) =>
                  setURLSearchParamsData({
                    ...URLSearchParamsData,
                    dept_date: e.target.value,
                  })
                }
              />
            </div>
            <div className="mx-2">
              <label
                htmlFor=""
                className="font-arial uppercase text-gray-200 text-xs my-2"
              >
                Return Date
              </label>
              {openReturnDate ? (
                <input
                  type="date"
                  name="retn_date"
                  id="retn_date"
                  min={
                    new Date(URLSearchParamsData.dept_date)
                      .toISOString()
                      .split("T")[0]
                  }
                  defaultValue={
                    SearchParams.return_date
                      ? new Date(SearchParams.return_date)
                          .toISOString()
                          .split("T")[0]
                      : retnDateDef()
                  }
                  className="block bg-indigo-500 p-2 w-30 rounded-lg font-qs font-bold"
                  onChange={(e) => {
                    setURLSearchParamsData({
                      ...URLSearchParamsData,
                      return_date: e.target.value,
                    });
                  }}
                />
              ) : (
                <input
                  type="date"
                  disabled
                  className="disabled:bg-indigo-400 block disabled:text-gray-400 bg-indigo-500 p-2 w-30 rounded-lg font-qs font-bold"
                />
              )}
            </div>
            <div className="mx-2">
              <Menu open={openClass} handler={setOpenClass}>
                <MenuHandler>
                  <div>
                    <label
                      htmlFor=""
                      className="font-arial uppercase text-gray-200 text-xs my-2"
                    >
                      Return Date
                    </label>
                    <div className="block bg-indigo-500 p-2 w-48 rounded-lg font-qs font-bold">
                      {SearchParams.pepoles.adults +
                        SearchParams.pepoles.children!}{" "}
                      Traveller(s)
                    </div>
                  </div>
                </MenuHandler>
                <MenuList className="-mt-16">
                  <>
                    <FlightClass callback={clickCallBack} />
                  </>
                </MenuList>
              </Menu>
            </div>
            <div className="mt-6">
              <button
                className="uppercase tracking-wider bg-white text-indigo-500 p-2 rounded-lg font-qs font-bold"
                onClick={() => updateSearch()}
              >
                {" "}
                Update Search{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
