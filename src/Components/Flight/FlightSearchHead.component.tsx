import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { RootState, AppThunkDispatch } from "../../store";
import { SearchParamsType, SearchType, callTypes } from "../../Types";
import { initialState, searchActions } from "../../Actions/Search.action";
import FlightInput from "./MainSubcomponents/CityInput";
import { Menu, MenuHandler, MenuList, Radio } from "@material-tailwind/react";
import { HiOutlineArrowsRightLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import FlightClass from "./MainSubcomponents/FlightClass";
import { URL } from "url";
import { fetchResult } from "../../Actions/Result.action";

export default function FlightSearchHead() {
  const location = useLocation();
  const url = new URLSearchParams(location.search);
  const SearchParams = useSelector((state: RootState) => state.SearchParms);
  const Airports = useSelector((state: RootState) => state.Airports);
  const dispatch = useDispatch();

  const dispatchThunk = useDispatch<AppThunkDispatch>();
  let [URLSearchParamsData, setURLSearchParamsData] =
    useState<SearchParamsType>({
      ...SearchParams,
      pepoles: {
        adults: parseInt(url.get("adults") ?? "1"),
        children: parseInt(url.get("child") ?? "0"),
        infants: parseInt(url.get("infants") ?? "0"),
      },
      dept_date: url.get("dep_date") ?? new Date().toISOString(),
      return_date: url.get("rtn_date") ?? null,
      class: parseInt(url.get("class") ?? "0"),
    });

  useEffect(() => {
    if (
      SearchParams != URLSearchParamsData &&
      Airports &&
      url.get("from") != url.get("to")
    ) {
      URLSearchParamsData.from =
        Airports.find((s) => s.airport_code === url.get("from")) ??
        SearchParams.from;
      URLSearchParamsData.to =
        Airports.find((s) => s.airport_code === url.get("to")) ??
        SearchParams.to;
      dispatch(searchActions.setParams(URLSearchParamsData));
    }
  }, [Airports]);

  const [openReturn, setOpenReturn] = useState(
    url.get("rtn_date") ? true : false
  );
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const [openClass, setOpenClass] = useState(false);

  const clickCallback = (data: SearchParamsType) => {
    setURLSearchParamsData({ ...data });
    setOpenFrom(false);
    setOpenTo(false);
    setOpenClass(false);
  };

  const returnDateDef = () => {
    if (!URLSearchParamsData.return_date) {
      return new Date(
        new Date(URLSearchParamsData.dept_date).setDate(
          new Date(URLSearchParamsData.dept_date).getDate() + 1
        )
      )
        .toISOString()
        .split("T")[0];
    } else {
      return new Date(URLSearchParamsData.return_date)
        .toISOString()
        .split("T")[0];
    }
  };

  useEffect(() => {
    if (openReturn) {
      setURLSearchParamsData({
        ...URLSearchParamsData,
        return_date: new Date(
          new Date(URLSearchParamsData.dept_date).setDate(
            new Date(URLSearchParamsData.dept_date).getDate() + 1
          )
        )
          .toISOString()
          .split("T")[0],
      });
    }
  }, [URLSearchParamsData.dept_date]);

  const navigate = useNavigate();
  const updateSearch = () => {
    dispatch(searchActions.setParams(URLSearchParamsData));
    let url = ``;
    if (openReturn) {
      url = `?from=${URLSearchParamsData.from.airport_code}&to=${URLSearchParamsData.to.airport_code}&dep_date=${URLSearchParamsData.dept_date}&rtn_date=${URLSearchParamsData.return_date}&class=${URLSearchParamsData.class}&adults=${URLSearchParamsData.pepoles.adults}&child=${URLSearchParamsData.pepoles.children}&infants=${URLSearchParamsData.pepoles.infants}`;
    } else {
      url = `?from=${URLSearchParamsData.from.airport_code}&to=${URLSearchParamsData.to.airport_code}&dep_date=${URLSearchParamsData.dept_date}&class=${URLSearchParamsData.class}&adults=${URLSearchParamsData.pepoles.adults}&child=${URLSearchParamsData.pepoles.children}&infants=${URLSearchParamsData.pepoles.infants}`;
    }

    navigate(`/flight/search/${url}`);
  };

  return (
    <div className="bg-blue-700 sticky top-0 text-white  p-4 z-10">
      <div className="flex">
        {/* Dep : url  */}
        <div className="mx-2 ">
          <input
            type="radio"
            name="trip"
            id="oneway"
            className="p-4 mx-2"
            defaultChecked={url.get("rtn_date") ? false : true}
            onChange={() => {
              setOpenReturn(false);
              setURLSearchParamsData({
                ...URLSearchParamsData,
                return_date: null,
              });
            }}
          />
          <label className="font-qs font-bold">One way</label>
        </div>
        <div className="mx-2">
          <input
            type="radio"
            name="trip"
            id="roundtrip"
            className="p-4 mx-2"
            defaultChecked={url.get("rtn_date") ? true : false}
            onChange={() => {
              setOpenReturn(true);
              setURLSearchParamsData({
                ...URLSearchParamsData,
                return_date:
                  url.get("rtn_date") ??
                  new Date(
                    new Date(URLSearchParamsData.dept_date).setDate(
                      new Date(URLSearchParamsData.dept_date).getDate() + 1
                    )
                  )
                    .toISOString()
                    .split("T")[0],
              });
            }}
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
                  value={URLSearchParamsData.from.airport_code}
                  readOnly
                />
              </div>
            </MenuHandler>
            <MenuList className="-mt-16">
              <>
                {" "}
                <FlightInput
                  label="From"
                  callback={clickCallback}
                  type={SearchType.From}
                  callType={callTypes.JustReturn}
                />{" "}
              </>
            </MenuList>
          </Menu>
        </div>
        <div
          className="mt-4 text-xl"
          onClick={() => {
            [URLSearchParamsData.from, URLSearchParamsData.to] = [
              URLSearchParamsData.to,
              URLSearchParamsData.from,
            ];
            setURLSearchParamsData({ ...URLSearchParamsData });
          }}
        >
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
                  value={URLSearchParamsData.to.airport_code}
                  readOnly
                />
              </div>
            </MenuHandler>
            <MenuList className="-mt-16">
              <>
                {" "}
                <FlightInput
                  label="To"
                  callback={clickCallback}
                  type={SearchType.To}
                  callType={callTypes.JustReturn}
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
            onKeyDown={(e) => e.preventDefault()}
            min={new Date().toISOString().split("T")[0]}
            className="block bg-indigo-500 p-2 w-30 rounded-lg font-qs font-bold"
            defaultValue={
              new Date(URLSearchParamsData.dept_date)
                .toISOString()
                .split("T")[0]
            }
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
          {openReturn ? (
            <input
              type="date"
              name="retn_date"
              id="retn_date"
              min={
                new Date(URLSearchParamsData.dept_date)
                  .toISOString()
                  .split("T")[0]
              }
              onKeyDown={(e) => e.preventDefault()}
              value={URLSearchParamsData.return_date?.split("T")[0]}
              defaultValue={returnDateDef()}
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
              className="block disabled:bg-indigo-400 disabled:text-gray-500 bg-indigo-500 p-2 w-30 rounded-lg font-qs font-bold"
              disabled
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
                  {URLSearchParamsData.pepoles.adults +
                    URLSearchParamsData.pepoles.children!}{" "}
                  Traveller(s)
                </div>
              </div>
            </MenuHandler>
            <MenuList className="-mt-16">
              <>
                <FlightClass
                  callback={clickCallback}
                  callType={callTypes.JustReturn}
                />
              </>
            </MenuList>
          </Menu>
        </div>
        <div className="mt-6">
          <button
            type="button"
            className="uppercase tracking-wider bg-white text-indigo-500 p-2 rounded-lg font-qs font-bold"
            onClick={() => updateSearch()}
          >
            {" "}
            Update Search{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
