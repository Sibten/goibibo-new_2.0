import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp, FaUser } from "react-icons/fa";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import Form from "./Form";
import { Traveller } from "../../../Types";
export default function Accordian({
  title,
  number,
  type,
  callback,
}: {
  title: string;
  type: number;
  number: number;
  callback: Function;
}) {
  const [open, setOpen] = useState(0);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  const handleCallback = (value: Array<Traveller>) => {
    callback(value);
  };

  return (
    <div className="my-1">
      <Accordion
        className="bg-gray-200"
        open={open == 1}
        icon={
          open ? (
            <FaChevronUp onClick={() => handleOpen(0)} />
          ) : (
            <FaChevronDown
              onClick={() => handleOpen(1)}
              className="text-base"
            />
          )
        }
      >
        <AccordionHeader className="text-base p-1 justify-start">
          <FaUser className="mx-2" /> {title} {number}
        </AccordionHeader>
        <AccordionBody>
          <Form
            name={`${title} Name`}
            number={number}
            type={type}
            callback={handleCallback}
          />
        </AccordionBody>
      </Accordion>
    </div>
  );
}
