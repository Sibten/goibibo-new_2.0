import { Button, Input } from "@material-tailwind/react";
import React, { useState } from "react";
import { emailRegx } from "../../../../Types";
import { postAPI } from "../../../../Services/API.services";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userActions } from "../../../../Actions/User.action";
import { Link, useNavigate } from "react-router-dom";
import { fetchAdmin } from "../../../../Actions/Admin/AdminDetails.action";
import { AppThunkDispatch } from "../../../../store";
import { HiEye } from "react-icons/hi2";
import { HiEyeOff } from "react-icons/hi";
import { fetchAirlineDetails } from "../../../../Actions/Admin/Airline.action";
import { fetchAirlineFlights } from "../../../../Actions/Admin/AirlineFlights.action";

export default function AdminLoginpage() {
  const [deactive, setDeactive] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const validateEmail = (comingEmail: string) => {
    if (emailRegx.test(comingEmail)) {
      setDeactive(false);
      setEmail(comingEmail);
    } else {
      setDeactive(true);
    }
  };
  const dispatch = useDispatch();
  const thunkDispatch = useDispatch<AppThunkDispatch>();
  const navigate = useNavigate();
  const login = async () => {
    try {
      dispatch(userActions.remove());
      const res = await postAPI("/user/admin/login", {
        email: email,
        password: password,
      });
      if (res.data.login) {
        thunkDispatch(fetchAirlineDetails());
        thunkDispatch(fetchAirlineFlights());

        thunkDispatch(fetchAdmin(email));
        toast.success("Successfully login");
        navigate("/admin");
      }
    } catch (e) {
      toast.error("Something bad happen");
    }
  };

  return (
    <div className="lg:w-96  mx-4 lg:mx-auto bg-white p-4 shadow-md rounded-md font-qs my-[16vh]">
      <div>
        <h1 className="font-bold font-qs text-xl "> Admin Login </h1>
        <small> Hey! Admin provide your credential and continue. </small>
      </div>
      <div className="my-4">
        <div className="my-4">
          <Input
            type="email"
            label="Email"
            onChange={(e) => validateEmail(e.target.value)}
          />
        </div>
        <div className="my-4 flex items-center">
          <Input
            type={passwordVisible ? "text" : "password"}
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordVisible ? (
            <HiEyeOff
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="text-xl mx-2 cursor-pointer text-gray-700"
            />
          ) : (
            <HiEye
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="text-xl mx-2 cursor-pointer text-gray-700"
            />
          )}
        </div>
        <div className="my-2 w-max ml-auto">
          <Link to="/admin/forgot">
            {" "}
            <p className="text-blue-700 w-max text-sm text-right">
              Forgot Password ?
            </p>{" "}
          </Link>
        </div>
        <div>
          <Button color="orange" disabled={deactive} onClick={() => login()}>
            Continue
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
