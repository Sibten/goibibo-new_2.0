import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Button, Radio } from "@material-tailwind/react";
import { AddonBase, SearchType } from "../../../Types";

export default function Baggage({
  callback,
  type,
  addOnDisable,
}: {
  callback: Function;
  type: number;
  addOnDisable: boolean;
}) {
  const selector = useSelector((state: RootState) => state.Addons);

  const [selectAddon, setAddon] = useState<AddonBase>();
  const [disable, setDisable] = useState<boolean>(addOnDisable);

  const [radioDisable, setRadioDisable] = useState(false);

  useEffect(() => {
    if (addOnDisable) {
      setDisable(addOnDisable);
      setRadioDisable(true);
    }
  }, [addOnDisable]);

  return (
    <div>
      <form>
        <div className="h-[16rem] overflow-y-auto overflow-x-hidden">
          {selector.map((s) => (
            <div
              className="border rounded-md p-2 text-sm flex justify-between"
              key={s.name}
            >
              <div className="flex">
                <div>
                  <img src={s.icon ?? ""} alt="addon" className="w-12 h-12" />
                </div>
                <div className="mx-4 items-center">
                  <h1 className="font-bold text-base"> {s.name}</h1>
                  <p className="text-gray-600"> {s.limit} Kg </p>
                </div>
              </div>
              <div className="m-4 flex items-center">
                <p className="mx-2">
                  &#8377; {s.price.toLocaleString(process.env.REACT_APP_REGION)}{" "}
                </p>
                <Radio
                  name={`baggage-${type}`}
                  color="pink"
                  onClick={() => {
                    setAddon(s);
                    setDisable(false);
                  }}
                  disabled={radioDisable}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="ml-auto w-max m-2">
          <button
            className="bg-pink-700 rounded-md p-1 px-2 text-white font-qs font-bold disabled:bg-pink-200"
            disabled={disable}
            onClick={(e) => {
              e.preventDefault();
              callback({ data: selectAddon, type: type });
            }}
          >
            Add
          </button>
          <button
            type="reset"
            className=" p-1 px-2 text-black font-qs font-bold"
            onClick={() => {
              setDisable(true);
              callback({ data: undefined, type: type });
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
