import React from "react";
import {
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaYoutubeSquare,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-white p-8 font-arial relative print:hidden">
      <div className="absolute -mt-8 right-0">
        <img
          src="https://res.cloudinary.com/dgsqarold/image/upload/v1690806386/Goibibo/awards_vtycwk.png"
          alt="award"
        />
      </div>
      <div className="w-max mx-auto">
        <div className="grid grid-cols-3 gap-[16rem] font-arial">
          <div>
            <h1 className="font-bold uppercase text-sm"> Our Products</h1>
            <ul className="my-2 text-sm text-gray-600">
              <Link to="/flight">
                {" "}
                <li> Domestic Flight Booking</li>{" "}
              </Link>
              <Link to="/flight">
                {" "}
                <li> Inetrnational Flight Booking</li>{" "}
              </Link>
              <Link to="/trains">
                {" "}
                <li> Train Booking</li>{" "}
              </Link>
              <Link to="/bus">
                {" "}
                <li> Bus Booking</li>{" "}
              </Link>
              <Link to="/hotels">
                {" "}
                <li> Hotels Booking</li>{" "}
              </Link>
            </ul>
          </div>
          <div>
            <h1 className="font-bold uppercase text-sm"> About Us</h1>
            <ul className="my-2 text-sm text-gray-600">
              <Link to="/about">
                {" "}
                <li> About us</li>{" "}
              </Link>
              <li> Investor Relation</li>
              <li> Management</li>
              <Link to="/support">
                {" "}
                <li> Customer Support</li>{" "}
              </Link>
            </ul>
          </div>
          <div>
            <h1 className="font-bold uppercase text-sm"> More links</h1>
            <ul className="my-2 text-sm text-gray-600">
              <Link to="/mytrips">
                {" "}
                <li> My Bookings</li>{" "}
              </Link>
              <Link to="/profile">
                {" "}
                <li>My Account</li>{" "}
              </Link>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-400 w-max grid grid-cols-3 gap-[14rem] my-4 py-2">
          <div>
            <h1 className="text-sm font-bold uppercase"> Follow Us</h1>
            <div className="flex my-2">
              <FaFacebook className="text-2xl mx-2" />
              <FaTwitter className="text-2xl mx-2" />
              <FaLinkedin className="text-2xl mx-2" />
              <FaYoutubeSquare className="text-2xl mx-2" />
            </div>
          </div>
          <div>
            <h1 className="text-sm font-bold uppercase">Download Our App</h1>
            <div className="flex my-2">
              <img
                src="https://res.cloudinary.com/dgsqarold/image/upload/v1690804040/Goibibo/PlayStore_em9auu.png"
                alt="gp"
                className="w-24 h-8"
              />
              <img
                src="https://res.cloudinary.com/dgsqarold/image/upload/v1690804031/Goibibo/App_Store_ofpgfl.png"
                alt="as"
                className="w-24 h-10 -mt-1 mx-2"
              />
            </div>
          </div>
          <div>
            <h1 className="text-sm font-bold uppercase">
              {" "}
              Secure Payment Powered By
            </h1>
            <div className="my-2">
              <img
                src="https://res.cloudinary.com/dgsqarold/image/upload/v1690803289/Goibibo/razorpay_uvtmdu.png"
                alt="rzpay"
                className="scale-75 mx-auto"
              />
            </div>
          </div>
        </div>
        <div className="border-t border-gray-400 w-full flex justify-between gap-[14rem] my-4 py-2 text-xs">
          <span>
            <img
              src="https://res.cloudinary.com/dgsqarold/image/upload/v1690806628/Goibibo/Logo_100x75_transparent_erayr8.png"
              alt="radix"
            />{" "}
            Powerd By Radixweb{" "}
          </span>
          <span>
            {" "}
            &copy; {new Date().getFullYear()} Makemytrip (India) Private
            Limited. All rights reserved
          </span>
        </div>
      </div>
    </div>
  );
}
