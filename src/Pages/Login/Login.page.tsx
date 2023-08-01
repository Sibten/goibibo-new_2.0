import { Alert, Button, Input } from "@material-tailwind/react";
import axios from "axios";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Timer from "../../Helper/Timer";
import { useSelector, useDispatch } from "react-redux";
import { AppThunkDispatch, RootState } from "../../store";
import { fetchUser, userActions } from "../../Actions/User.action";
import Cookies from "js-cookie";
import { fetchOffers } from "../../Actions/Offers.action";
import { fetchTrips } from "../../Actions/Trip.action";
import { Roles } from "../../Types";
const makeSecrete = (data: string) => {
  let part = data.slice(2, data.length - 4);
  part = part.replaceAll(/\w/g, "*");
  return data.slice(0, 2) + part + data.slice(data.length - 4);
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const emailRegx = /^[A-Za-z0-9_.]+@[a-z.]+\.[a-z]{2,4}$/;
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

  const sendOTP = () => {
    setResendOTP(1);
    setDeactive(true);
    setOTPBoxOpen(1);
    setOTPSendingMessage("Sending OTP...");
    console.log(email);

    const data = JSON.stringify({
      email: email,
    });
    const config = {
      method: "post",
      url: "http://localhost:5050/user/generateotp",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        if (response.data.found) {
          let email = makeSecrete(response.data.email);
          setOTPSendingMessage(`OTP sent to ${email}`);
        }
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
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
    console.log("Timer Complete");
  };
  const [error, setError] = useState("");
  const verifyOTP = () => {
    const data = JSON.stringify({
      email: email,
      otp: OTP,
    });
    console.log(data);
    const config = {
      method: "post",
      url: "http://localhost:5050/user/validateotp",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.data.login) {
          Cookies.set("token", response.data.token);
          Cookies.set("email", email);
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
      })
      .catch(function (error) {
        setError("Verification failed");
        setTimeout(() => {
          setError("");
        }, 3000);
        console.log(error);
      });
  };

  return (
    <div className="flex my-32">
      <img
        className="absolute right-0 bottom-0 opacity-10"
        src="https://res.cloudinary.com/dgsqarold/image/upload/v1687350557/Goibibo/landscape-159294_1280_veiwja.png"
        alt=""
      />
      <div className="sm:bg-gray-50 sm:shadow-lg mx-4 w-full min-h-[28rem] sm:w-96  sm:mx-auto p-4 rounded-lg relative">
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
    </div>
  );
}
