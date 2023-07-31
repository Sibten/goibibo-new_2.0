import React, { useState } from "react";
import Title from "../../Components/Utility/Title";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import {
  MdEmail,
  MdFlight,
  MdPhoneInTalk,
  MdSupportAgent,
} from "react-icons/md";
import { BiLink } from "react-icons/bi";
import { FaPhone, FaSuitcase } from "react-icons/fa";
import { Link } from "react-router-dom";

const Icon = (id: number, open: number) => {
  return id == open ? <BsChevronUp /> : <BsChevronDown />;
};

export default function Support() {
  const [open, setOpen] = useState<number>(1);

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
  return (
    <div>
      <Title text="Customer Help & Support" />
      <div className="w-max mx-auto p-4">
        <div className="my-4">
          <Accordion
            icon={Icon(open, 1)}
            open={open == 1}
            className="bg-white shadow-md rounded-md p-2 h-max my-2"
          >
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="border-none font-qs font-bold text-lg"
            >
              <span className="flex">
                <MdSupportAgent className="mx-2 text-2xl" /> Customer Care{" "}
              </span>{" "}
            </AccordionHeader>
            <AccordionBody>
              <div className="text-base">
                Here is some method you can reach us.
                <ul className="m-4">
                  <li className="flex my-2">
                    <MdPhoneInTalk className="text-xl mx-4" /> 1800357878 (Toll
                    free) ( 9 AM - 7 PM )
                  </li>
                  <li className="flex my-2">
                    <MdEmail className="text-xl mx-4" />{" "}
                    customercare@goibibo.com (Any time)
                  </li>
                </ul>
              </div>
            </AccordionBody>
          </Accordion>
          <Accordion
            icon={Icon(open, 2)}
            open={open == 2}
            className="bg-white shadow-md rounded-md p-2 h-max my-2"
          >
            <AccordionHeader
              onClick={() => handleOpen(2)}
              className="border-none font-qs font-bold text-lg"
            >
              <span className="flex">
                <BiLink className="mx-2 text-2xl" /> Quick Links
              </span>{" "}
            </AccordionHeader>
            <AccordionBody>
              <h1 className="text-base">
                Goibibo is here to support you! We have some quick links below
                which can provide you the fastest resolution to your query.
              </h1>
              <div className="my-2 text-base">
                <ul className="flex">
                  <Link to="/mytrips">
                    {" "}
                    <li className="border p-2 rounded-md flex mx-2">
                      {" "}
                      <FaSuitcase className="text-xl mx-2" /> My Trips{" "}
                    </li>{" "}
                  </Link>
                  <Link to="/flight">
                    {" "}
                    <li className="border p-2 rounded-md flex mx-2">
                      <MdFlight className="text-xl mx-2" /> Flight Search
                    </li>{" "}
                  </Link>
                </ul>
              </div>
            </AccordionBody>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
