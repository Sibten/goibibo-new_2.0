import { Input, Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { emailRegx } from "../../../../Types";
import { postAPI, putAPI } from "../../../../Services/API.services";
import { HiEye } from "react-icons/hi2";
import { HiEyeOff } from "react-icons/hi";

export default function Forgotpage() {
  const [deactive, setDeactive] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [otp, setOTP] = useState("");
  const [otpsent, setSentOTP] = useState(false);
  const [password, setPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const naviagate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validateEmail = (comingEmail: string) => {
    if (emailRegx.test(comingEmail)) {
      setDeactive(false);
      setEmail(comingEmail);
    } else {
      setDeactive(true);
    }
  };
  const OTPRegx = /^\d{6}$/;
  const passwordRegx =
    /^.*(?=.{8,16})(?=.*[a-zA-Z])(?=.*\d)(?=.*[@-_!#$%"']).*$/;
  const validateOTP = (otp: string) => {
    if (OTPRegx.test(otp)) {
      setOTP(otp);
      setDeactive(false);
    } else {
      setDeactive(true);
    }
  };
  const validatePassword = (password: string) => {
    if (passwordRegx.test(password)) {
      setDeactive(false);
      setPassword(password);
    } else {
      setDeactive(true);
    }
  };

  const generateOTP = async () => {
    try {
      toast.success(`OTP is sending to ${email}`);
      const data = { email: email };
      const res = await postAPI(
        "/user/admin/generateotp",
        JSON.stringify(data)
      );

      if (res.data.otp) {
        toast.success("OTP Sent successfully");
        setSentOTP(true);
        setDeactive(true);
      } else throw new Error("");
    } catch (e) {
      toast.error("Unauthorized User!");
    }
  };

  const verifyOTP = async () => {
    try {
      const data = {
        email: email,
        otp: otp,
      };
      const res = await postAPI("/user/admin/verifyotp", JSON.stringify(data));
      if (res.data.valid) {
        toast.success("OTP verification done!");
        setVerified(true);
        setDeactive(true);
      } else throw new Error("");
    } catch (e) {
      toast.error("Somthing bad happen!");
    }
  };

  const changePassword = async () => {
    try {
      const data = {
        email: email,
        password: password,
      };

      const res = await putAPI("/user/admin/changePassword", data);
      if (res.data.update) {
        toast.success("password update sucessfully");
        setTimeout(() => {
          naviagate("/admin");
        }, 1000);
      }
    } catch (e) {
      toast.error("Something bad happen!");
    }
  };

  return (
    <div className="lg:w-96  mx-4 lg:mx-auto bg-white p-4 shadow-md rounded-md font-qs my-[16vh]">
      <div>
        <h1 className="font-bold font-qs text-xl "> Forgot Password </h1>
        <small> Hey! Admin provide your email and continue. </small>
      </div>
      {!verified ? (
        <div className="my-4">
          {otpsent ? (
            <div className="my-4">
              <Input
                type="number"
                label="OTP"
                onChange={(e) => validateOTP(e.target.value)}
              />
            </div>
          ) : (
            <div className="my-4">
              <Input
                type="email"
                label="Email"
                onChange={(e) => validateEmail(e.target.value)}
              />
            </div>
          )}
          <div className="my-2 ">
            <Link to="/admin">
              {" "}
              <p className="text-blue-700 text-sm text-right">
                Password Remebered ?
              </p>{" "}
            </Link>
          </div>
          <div>
            {otpsent ? (
              <Button
                color="orange"
                disabled={deactive}
                onClick={() => verifyOTP()}
              >
                Verify
              </Button>
            ) : (
              <Button
                color="orange"
                disabled={deactive}
                onClick={() => generateOTP()}
              >
                Continue
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="my-4 flex items-center">
            <Input
              type={passwordVisible ? "text" : "password"}
              label="Passsword"
              onChange={(e) => validatePassword(e.target.value)}
            />
            {passwordVisible ? (
              <HiEyeOff
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="text-xl mx-2 cursor-pointer"
              />
            ) : (
              <HiEye
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="text-xl mx-2 cursor-pointer"
              />
            )}
          </div>
          <p className="text-sm">
            {" "}
            Password must be 8 to 16 character long with atleast one special
            character, number and alphabets
          </p>
          <div>
            <Button
              color="orange"
              disabled={deactive}
              onClick={() => changePassword()}
            >
              {" "}
              Change Password
            </Button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
