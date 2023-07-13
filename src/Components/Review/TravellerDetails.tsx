import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Alert, Button, Input } from "@material-tailwind/react";
import Accordian from "./SubComponents/Accordian";
import { People, Traveller, TravellerDetailsBase } from "../../Types";

export default function TravellerDetails() {
  const selector = useSelector((state: RootState) => state.SearchParms);

  const adultSpelling = selector.pepoles.adults > 1 ? "Adults" : "Adult";
  const childSpelling =
    selector.pepoles.children && selector.pepoles.children > 1
      ? "Childeren"
      : "Child";

  const [TravellerDetails, setTravellerDetails] =
    useState<TravellerDetailsBase>({ adults: [], children: [], infants: [] });

  useEffect(() => {
    console.log(TravellerDetails);
  }, [TravellerDetails]);

  const [email, setEmail] = useState("");
  const emailRegx = /^[A-Za-z0-9_.]+@[a-z.]+\.[a-z]{2,4}$/;
  const [deactive, setDeactive] = useState<boolean>(true);
  const validateEmail = (comingEmail: string) => {
    if (emailRegx.test(comingEmail)) {
      setDeactive(false);
      setEmail(comingEmail);
    } else {
      setDeactive(true);
    }
  };

  const [Message, setMessage] = useState<string>("");

  const navigateSeatSelection = () => {
    if (
      TravellerDetails.adults.length == selector.pepoles.adults &&
      TravellerDetails.children?.length == selector.pepoles.children &&
      TravellerDetails.infants?.length == selector.pepoles.infants
    ) {
      setMessage("");
    } else {
      setMessage("Please Provide Details Properly");
    }
  };

  return (
    <div className="my-2">
      <div className="bg-white shadow-md w-[48rem] rounded-md py-4 mx-8 h-max font-arial">
        <div className="p-4 border-b">
          <h1 className="font-bold font-qs text-lg"> Traveller Details </h1>
        </div>
        <div className="mx-4 text-xs my-2">
          <Alert className="bg-blue-50 text-blue-800 border-l-4  p-2 border-blue-800 rounded-none text-xs">
            Please make sure you enter the Name as per your govt. photo id.
          </Alert>
        </div>
        <div className="mx-4 text-base">
          <Accordian
            title={adultSpelling}
            number={selector.pepoles.adults}
            type={People.Adult}
            callback={(value: Array<Traveller>) =>
              setTravellerDetails({ ...TravellerDetails, adults: value })
            }
          />
          {selector.pepoles.children && selector.pepoles.children > 0 ? (
            <Accordian
              title={childSpelling}
              type={People.Child}
              number={selector.pepoles.children}
              callback={(value: Array<Traveller>) =>
                setTravellerDetails({ ...TravellerDetails, children: value })
              }
            />
          ) : (
            ""
          )}
          {selector.pepoles.infants && selector.pepoles.infants > 0 ? (
            <Accordian
              title="Infants"
              type={People.Infant}
              number={selector.pepoles.infants}
              callback={(value: Array<Traveller>) =>
                setTravellerDetails({ ...TravellerDetails, infants: value })
              }
            />
          ) : (
            ""
          )}
        </div>
        <div className="flex mx-4 my-4 w-[30rem]">
          <p className="text-xs text-gray-500 my-1 mx-2">Email Address</p>{" "}
          <Input
            type="Email"
            label="Email"
            className="w-10"
            onChange={(e) => validateEmail(e.target.value)}
          />
          <p className="w-max mx-4 text-xs text-gray-700">
            Your ticket will be sent to this email address
          </p>
        </div>
        <div className="w-max ml-auto m-4 h-max">
          <p className="text-sm text-red-500">{Message}</p>
          <Button
            className="bg-orange-600 p-2 shadow-md rounded-md font-qs font-bold text-sm text-white"
            disabled={deactive}
            onClick={() => navigateSeatSelection()}
          >
            Proceed to Seat Selection
          </Button>
        </div>
      </div>
    </div>
  );
}
