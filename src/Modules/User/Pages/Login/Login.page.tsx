import { Alert, Button, Input } from "@material-tailwind/react";
import axios, { AxiosRequestConfig } from "axios";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Timer from "../../../../Helper/Timer";
import { useSelector, useDispatch } from "react-redux";
import { AppThunkDispatch, RootState } from "../../../../store";
import { fetchUser, userActions } from "../../../../Actions/User.action";
import Cookies from "js-cookie";
import { fetchOffers } from "../../../../Actions/Offers.action";
import { fetchTrips } from "../../../../Actions/Trip.action";
import { Roles, emailRegx } from "../../../../Types";
import { ToastContainer, toast } from "react-toastify";
import { postAPI } from "../../../../Services/API.services";
const makeSecrete = (data: string) => {
  let part = data.slice(2, data.length - 4);
  part = part.replaceAll(/\w/g, "*");
  return data.slice(0, 2) + part + data.slice(data.length - 4);
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");

  const OTPRegx = /^\d{6}$/;

  const [OTPBoxOpen, setOTPBoxOpen] = useState(0);
  const [OTPSendingMessage, setOTPSendingMessage] = useState("");
  const [resendOTP, setResendOTP] = useState(0);
  const [deactive, setDeactive] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppThunkDispatch>();

  const validateEmail = (comingEmail: string) => {
    if (emailRegx.test(comingEmail)) {
      setDeactive(false);
      setEmail(comingEmail);
    } else {
      setDeactive(true);
    }
  };

  const sendOTP = async () => {
    setResendOTP(1);
    setDeactive(true);
    setOTPBoxOpen(1);
    setOTPSendingMessage("Sending OTP...");
    // //  console.log(email);
    toast.success(`OTP is sending to ${email}`);

    const data = JSON.stringify({
      email: email,
    });

    try {
      const res = await postAPI("/user/generateotp", data);
      if (res.status == 200) {
        let email = makeSecrete(res.data.email);
        setOTPSendingMessage(`OTP sent to ${email}`);
        toast.success("OTP Successfully Sent!");
      }
    } catch (e) {
      toast.error("Something bad happen!");
    }
  };

  const checkOTP = (comingOTP: string) => {
    if (OTPRegx.test(comingOTP)) {
      setDeactive(false);
      setOTP(comingOTP);
    } else {
      setDeactive(true);
    }
  };

  const handleTimerComplete = () => {
    setResendOTP(0);
    // //  console.log("Timer Complete");
  };
  const [error, setError] = useState("");
  const verifyOTP = async () => {
    const data = JSON.stringify({
      email: email,
      otp: OTP,
    });
    // //  console.log(data);
    try {
      const res = await postAPI("/user/validateotp", data);
      if (res.data.login) {
        dispatch(fetchUser(email));
        dispatch(fetchOffers());
        dispatch(fetchTrips());
        navigate("/profile");
      } else {
        setError("Verification failed");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } catch (e) {
      setError("Verification failed");
      setTimeout(() => {
        setError("");
      }, 3000);
      toast.error("OTP verfication failed");
    }
  };

  return (
    <div className="flex my-32 ">
      <img
        className="absolute right-0 bottom-0 opacity-10"
        src="https://res.cloudinary.com/dgsqarold/image/upload/v1687350557/Goibibo/landscape-159294_1280_veiwja.png"
        alt=""
      />
      <div className="bg-white sm:shadow-lg w-full min-h-[28rem] sm:w-96  sm:mx-auto p-4 rounded-lg relative">
        <Link to="/">
          {" "}
          <div className="flex">
            <FaArrowLeft className="text-sm my-1 mx-2" />{" "}
            <p className="font-qs text-sm">Back to Home</p>
          </div>{" "}
        </Link>{" "}
        <h1 className="font-qs font-bold text-xl my-8 text-center">
          {" "}
          Login / Signup{" "}
        </h1>
        <div className="mt-8">
          {OTPBoxOpen ? (
            <>
              {" "}
              <p className="text-sm font-light font-qs my-2 italic">
                {OTPSendingMessage}{" "}
              </p>
              <Input label="OTP" onChange={(e) => checkOTP(e.target.value)} />{" "}
              <div className="my-4">
                <Button
                  className="w-full bg-orange-700"
                  disabled={deactive}
                  onClick={() => verifyOTP()}
                >
                  Verify
                </Button>
                <div>
                  <p className="text-orange-700 font-qs text-sm text-right mt-2 mx-2">
                    Some time OTP might be delay
                  </p>
                  {resendOTP ? (
                    <Timer
                      Start={true}
                      Callback={handleTimerComplete}
                      InComingMinute={0}
                      InComingSecond={30}
                    />
                  ) : (
                    <p
                      onClick={() => sendOTP()}
                      className="text-sm font-qs text-orange-700 mx-2 text-right"
                    >
                      Resend OTP
                    </p>
                  )}
                </div>
              </div>
              <div>
                {error ? (
                  <Alert className="bg-red-50 text-red-500 text-sm font-arial">
                    {error}
                  </Alert>
                ) : (
                  ""
                )}
              </div>
            </>
          ) : (
            <>
              <Input
                label="Email"
                onChange={(e) => validateEmail(e.target.value)}
              />
              <div className="my-4">
                <Button
                  className="w-full bg-orange-700"
                  disabled={deactive}
                  onClick={() => sendOTP()}
                >
                  Continue
                </Button>
              </div>
            </>
          )}
        </div>
        <div className="font-arial text-sm mt-4 bottom-4 mr-4 absolute">
          By proceeding, you agree to GoIbibo's Privacy Policy, User Agreement
          and Terms of Service
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
