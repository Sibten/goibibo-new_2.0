import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Alert, Button, Input } from "@material-tailwind/react";
import Accordian from "./SubComponents/Accordian";
import {
  People,
  Traveller,
  TravellerDetailsBase,
  indianStates,
} from "../../Types";
import { BookingActions } from "../../Actions/ConfirmBookingDetails.action";
import { trackingActions } from "../../Actions/Tracking.actions";
import { useNavigate } from "react-router-dom";

export default function TravellerDetails() {
  const selector = useSelector((state: RootState) => state.SearchParms);

  const UserData = useSelector((state: RootState) => state.User);

  const adultSpelling = selector.pepoles.adults > 1 ? "Adults" : "Adult";
  const childSpelling =
    selector.pepoles.children && selector.pepoles.children > 1
      ? "Childeren"
      : "Child";

  const [TravellerDetails, setTravellerDetails] =
    useState<TravellerDetailsBase>({
      basic: {
        people: [],
        infants: [],
        email: "",
        address: UserData.billing_address ?? "",
        state: UserData.state ?? "",
        pincode: UserData.pincode ?? 0,
      },
    });

  useEffect(() => {
    console.log(TravellerDetails);
  }, [TravellerDetails]);

  const emailRegx = /^[A-Za-z0-9_.]+@[a-z.]+\.[a-z]{2,4}$/;
  const [deactive, setDeactive] = useState<boolean>(true);
  const validateEmail = (comingEmail: string) => {
    if (emailRegx.test(comingEmail)) {
      setDeactive(false);

      setTravellerDetails({
        ...TravellerDetails,
        basic: { ...TravellerDetails.basic, email: comingEmail },
      });
    } else {
      setDeactive(true);
    }
  };

  const [Message, setMessage] = useState<string>("");
  const dispatch = useDispatch();

  const bookingDetails = useSelector(
    (state: RootState) => state.BookingDetails
  );
  const bookingFlight = useSelector((state: RootState) => state.BookingFlight);
  const navigate = useNavigate();

  const navigateSeatSelection = () => {
    if (
      bookingDetails.payment?.basic_total != 0 &&
      bookingDetails.payment?.tax_total != 0 &&
      bookingDetails.payment?.original_total != 0
    ) {
      if (
        TravellerDetails.basic &&
        TravellerDetails.basic.people.length ==
          selector.pepoles.adults + (selector.pepoles.children ?? 0) &&
        TravellerDetails.basic.infants.length == selector.pepoles.infants &&
        TravellerDetails.basic.address != "" &&
        TravellerDetails.basic.email != "" &&
        TravellerDetails.basic.pincode != 0 &&
        TravellerDetails.basic.state != "def"
      ) {
        setMessage("");
        TravellerDetails.payment = bookingDetails.payment;
        dispatch(BookingActions.addBasic(TravellerDetails));
        dispatch(trackingActions.activeSeat());
        navigate(
          `/flight/seat_selection/?dep_flight_no=${bookingFlight.dep?.flight_no}`
        );
      } else {
        setMessage("Please Provide Details Properly");
        setTimeout(() => {
          setMessage("");
        }, 2000);
      }
    } else {
      setMessage("Please lock the payment first");
      setTimeout(() => {
        setMessage("");
      }, 2000);
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
              setTravellerDetails({
                ...TravellerDetails,
                basic: {
                  ...TravellerDetails.basic,
                  people: [...TravellerDetails.basic.people, ...value],
                },
              })
            }
          />
          {selector.pepoles.children && selector.pepoles.children > 0 ? (
            <Accordian
              title={childSpelling}
              type={People.Child}
              number={selector.pepoles.children}
              callback={(value: Array<Traveller>) =>
                setTravellerDetails({
                  ...TravellerDetails,
                  basic: {
                    ...TravellerDetails.basic,
                    people: [...TravellerDetails.basic.people, ...value],
                  },
                })
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
                setTravellerDetails({
                  ...TravellerDetails,
                  basic: {
                    ...TravellerDetails.basic,
                    infants: [...value],
                  },
                })
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
        <div className="mx-4">
          <div className="">
            <h1 className="font-arial font-bold text-lg my-2 mx-2">
              {" "}
              Billing Address{" "}
            </h1>
            <div className="my-4 font-qs flex flex-wrap">
              <div className="my-2 w-full md:w-80 mx-2">
                <Input
                  type="text"
                  label="Billing Address"
                  value={TravellerDetails.basic.address}
                  onChange={(e) =>
                    setTravellerDetails({
                      ...TravellerDetails,
                      basic: {
                        ...TravellerDetails.basic,
                        address: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="my-2 w-full md:w-80 mx-2">
                <Input
                  type="number"
                  label="Pincode"
                  value={TravellerDetails.basic.pincode}
                  onChange={(e) =>
                    setTravellerDetails({
                      ...TravellerDetails,
                      basic: {
                        ...TravellerDetails.basic,
                        pincode: parseInt(e.target.value),
                      },
                    })
                  }
                />
              </div>
              <div className="my-2 w-full mx-2 block font-arial">
                <select
                  className=" p-2 w-full md:w-80 rounded-md focus:outline-blue-500 focus:outline-1"
                  value={TravellerDetails.basic.state}
                  onChange={(e) => {
                    if (e.target.value == "def") setMessage("Invalid State");
                    else
                      setTravellerDetails({
                        ...TravellerDetails,
                        basic: {
                          ...TravellerDetails.basic,
                          state: e.target.value,
                        },
                      });
                  }}
                >
                  <option value="def"> -- Select State -- </option>
                  {indianStates.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4">
          {Message && (
            <Alert className="bg-red-50">
              {" "}
              <p className="text-sm text-red-500">{Message}</p>{" "}
            </Alert>
          )}
        </div>
        <div className="w-max ml-auto m-4 h-max">
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
