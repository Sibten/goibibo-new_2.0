import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppThunkDispatch } from "../../../../store";
import Cookies from "js-cookie";
import { userActions, fetchUser } from "../../../../Actions/User.action";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Alert, Button, Input, Radio, Select } from "@material-tailwind/react";
import { BiLogOut } from "react-icons/bi";
import { UserType, indianStates } from "../../../../Types";
import axios, { AxiosRequestConfig } from "axios";
import { airlineActions } from "../../../../Actions/Admin/Airline.action";
import { BookingFlightActions } from "../../../../Actions/BookingFlight.action";
import { BookingActions } from "../../../../Actions/ConfirmBookingDetails.action";
import { ResultActions } from "../../../../Actions/Result.action";
import Title from "../Utility/Title";
import TrackingActions, {
  trackingActions,
} from "../../../../Actions/Tracking.actions";
import { getAPI, postAPI, putAPI } from "../../../../Services/API.services";

export default function UserProfile() {
  const User = useSelector((state: RootState) => state.User);

  const dispatch = useDispatch<AppThunkDispatch>();

  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await getAPI("/user/logout");
      if (res.status == 200) {
        toast.success("Successfully Logged out");
        dispatch(userActions.remove());
        dispatch(airlineActions.remove());
        dispatch(BookingFlightActions.reset());
        dispatch(BookingActions.reset());
        dispatch(ResultActions.reset());
        dispatch(trackingActions.disableAll());
        navigate("/");
      } else {
        toast.error("Unable to log out!");
      }
    } catch (e) {
      toast.error("Something bad happen! Unable to log out.");
    }
  };
  const [userData, setUserData] = useState<UserType>(User);
  useEffect(() => {
    setUserData({ ...User });
  }, [User]);
  const email = Cookies.get("email");
  const [message, setMessage] = useState<string>("");
  const uploadPhoto = (e: any) => {
    //  console.log(e.target.files[0]);

    const formdata = new FormData();
    formdata.append("email", email!);
    formdata.append("file", e.target.files[0]);
    axios
      .post(
        `${process.env.REACT_APP_API}/user/updateprofile/uploadphoto`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // token: Cookies.get("token"),
          },
        }
      )
      .then((d) => {
        toast.success("Successfully Updated Profile Photo", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        if (email) dispatch(fetchUser(email));
      })
      .catch((e) => {
        toast.error("Unable to Update Profile Photo", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
    dispatch(fetchUser(email!));
  };
  const updateProfile = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    delete userData.role;
    const data = JSON.stringify(userData);

    if (userData.state == "def") {
      setMessage("State Should be valid!");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } else if (userData.pincode?.toString().length != 6) {
      setMessage("Pincode must be 6 digit long!");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } else {
      const config = {
        method: "put",
        url: `${process.env.REACT_APP_API}`,
        headers: {
          "Content-Type": "application/json",
          // token: Cookies.get("token"),
        },
        data: data,
      };
      try {
        const res = await putAPI("/user/updateprofile", data);
        if (res.status == 200) {
          toast.success("Profile Updated Sucessfully", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          //  console.log(response.data);

          dispatch(fetchUser(email!));
        }
      } catch (e) {
        toast.error("Unable to Update Profile!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    }
    //  console.log(userData);
  };

  return (
    <div className="bg-[#eef2f8] h-max">
      <Title text="My Profile" />
      <div className="md:mx-auto md:w-[48rem] bg-white shadow-md m-2 rounded-md p-4 flex -mt-3">
        <div>
          <img
            src={userData.profile_photo}
            alt="User_img"
            className="w-24 h-24"
          />
          <input
            type="file"
            name="profilePhoto"
            className="text-xs w-24 my-1  font-arial"
            id="pf"
            onChange={(e) => uploadPhoto(e)}
          />
        </div>

        <div className="mx-4 my-2">
          <h1 className="font-qs font-bold text-lg">{userData.user_name} </h1>
          <p className="text-xs md:text-sm text-gray-700 font-arial">
            {userData.email}{" "}
          </p>
          <p className="text-xs md:text-sm text-gray-700 font-arial capitalize">
            {userData.gender}{" "}
          </p>
        </div>
      </div>
      <div className="md:mx-auto md:w-[48rem] bg-white shadow-md m-2 rounded-md p-4  ">
        <h1 className="font-arial font-bold text-lg my-2 mx-2">
          {" "}
          Personal Information{" "}
        </h1>
        <form>
          <div className="flex flex-wrap my-2 font-qs font-bold">
            <div className="my-2 md:w-80 mx-2  w-full">
              <Input
                label="User name"
                value={userData.user_name ? userData.user_name : ""}
                onChange={(e) =>
                  setUserData({ ...userData, user_name: e.target.value })
                }
              />
            </div>
            <div className="my-2 md:w-80 mx-2  w-full">
              <Input
                label="First name"
                value={userData.first_name ? userData.first_name : ""}
                onChange={(e) =>
                  setUserData({ ...userData, first_name: e.target.value })
                }
              />
            </div>
            <div className="my-2 md:w-80 mx-2  md:text-lg  w-full">
              <Input
                label="Last name"
                value={userData.last_name ? userData.last_name : ""}
                onChange={(e) =>
                  setUserData({ ...userData, last_name: e.target.value })
                }
              />
            </div>
            <div className="my-2 md:w-80 mx-2 md:text-lg   w-full">
              <Input
                type="date"
                label="Date of Birth"
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    date_of_birth: new Date(e.target.value).toISOString(),
                  })
                }
                value={
                  userData.date_of_birth
                    ? userData.date_of_birth?.toString().split("T")[0]
                    : ""
                }
              />
            </div>
            <div className="my-2 md:w-full mx-2 md:text-lg block  w-full font-arial text-sm font-normal">
              <input
                type="radio"
                checked={userData.gender?.toLowerCase() == "male"}
                id="Male"
                className="mx-2"
                onChange={(e) =>
                  setUserData({ ...userData, gender: e.target.id })
                }
                name="Gender"
              />{" "}
              <label className="-mt-4">Male </label>
              <input
                type="radio"
                checked={userData.gender?.toLowerCase() == "female"}
                id="Female"
                className="mx-2"
                onChange={(e) =>
                  setUserData({ ...userData, gender: e.target.id })
                }
                name="Gender"
              />{" "}
              Female
            </div>
          </div>
        </form>
      </div>
      <div className="md:mx-auto md:w-[48rem] bg-white shadow-md m-2 rounded-md p-4  ">
        <h1 className="font-arial font-bold text-lg my-2 mx-2">
          {" "}
          Billing Information{" "}
        </h1>
        <Alert className="bg-[#2ec946]/10 text-[#647a97]  rounded-none font-arial ">
          As per government directive Billing address is compulsory for all
          bookings.{" "}
        </Alert>
        <div className="my-4 font-qs flex flex-wrap">
          <div className="my-2 w-full md:w-80 mx-2">
            <Input
              type="text"
              label="Billing Address"
              onChange={(e) =>
                setUserData({
                  ...userData,
                  billing_address: e.target.value,
                })
              }
              value={userData.billing_address ? userData.billing_address : ""}
            />
          </div>
          <div className="my-2 w-full md:w-80 mx-2">
            <Input
              type="number"
              label="Pincode *"
              value={userData.pincode ? userData.pincode : ""}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  pincode: parseInt(e.target.value),
                })
              }
            />
          </div>
          <div className="my-2 w-full mx-2 block font-arial">
            <select
              value={userData.state}
              className=" p-2 w-full md:w-80 rounded-md focus:outline-blue-500 focus:outline-1"
              onChange={(e) =>
                setUserData({ ...userData, state: e.target.value })
              }
            >
              <option value="def"> -- Select State -- </option>
              {indianStates.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="block w-full">
            {message ? (
              <Alert className="bg-red-50 text-red-500  text-sm font-arial">
                {message}
              </Alert>
            ) : (
              ""
            )}
          </div>
          <div className="flex font-arial font-bold">
            <button
              type="submit"
              className="rounded-md p-2 px-4 text-white font-bold font-arial bg-indigo-600 my-2 block text-base"
              onClick={(e) => updateProfile(e)}
            >
              Save
            </button>
            <button
              type="reset"
              className="rounded-md p-2 px-4  my-2 block text-base"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div className="w-max mx-auto m-4">
        <button
          onClick={() => logout()}
          className="flex justify-center bg-blue-100 font-bold font-qs tracking-widest uppercase w-full md:w-96 p-2 mx-auto text-blue-700 rounded-lg"
        >
          <BiLogOut className="mx-2 text-lg my-1" /> Logout
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
