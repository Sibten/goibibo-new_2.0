import React from "react";
import Accordian from "../Review/SubComponents/Accordian";
import { AccordionBody, AccordionHeader } from "@material-tailwind/react";
import Accordion from "@material-tailwind/react/components/Accordion";
import { BiChevronDown, BiDownArrow } from "react-icons/bi";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";

const Icon = (id: number, open: number) => {
  return id == open ? <BsChevronUp /> : <BsChevronDown />;
};

export default function FAQs() {
  const faqData: Array<{ title: string; description: string }> = [
    {
      title: "What are the advantages of online flight booking? ",
      description:
        "Through online air ticket booking you can easily compare prices of multiple airlines to get your air tickets at lowest rates. Also, it is easy to do online flight booking as multiple payment options are available on websites like Goibibo.",
    },
    {
      title: "When should I book to get best flight ticket prices?  ",
      description:
        "For best flight ticket prices and flight ticket offers, it is recommended to book at least 3 to 4 weeks in advance for domestic air tickets. For international flight ticket it is recommended to book at least 7 to 8 weeks in advance, so that you can get the best flight ticket prices.",
    },
    {
      title: "How can I book flight tickets online?   ",
      description:
        "With the help of Goibibo, you can easily book both domestic flight tickets and international air tickets in simple steps within a few seconds.",
    },
    {
      title: "Why should I make a flight booking from Goibibo?   ",
      description:
        "Along with an easy flight booking process, Goibibo offers various discounts, instant EMI options and credit/ debit card related offers on flight booking. By availing such benefits, you can book air tickets at reasonable prices.",
    },
    {
      title: "In how much time, my flight booking will get confirmed? ",
      description:
        "After completing the air ticket booking process on Goibibo, you will get an instant confirmation mail and a message on the registered number and email id respectively.",
    },
  ];

  const [open, setOpen] = React.useState(0);

  const handleOpen = (value: number) => setOpen(open === value ? -1 : value);

  return (
    <div className="lg:w-[60%] mx-auto my-8 ">
      <h1 className="font-bold font-qs lg:text-xl mx-2">Flight Booking FAQs</h1>
      <div className="text-sm mx-1">
        {faqData.map((s, i) => (
          <Accordion
            key={s.title}
            open={open === i}
            className="bg-white rounded-md my-4 px-4 p-2 shadow-md"
            icon={Icon(open, i)}
          >
            <AccordionHeader
              onClick={() => handleOpen(i)}
              className="text-sm border-none"
            >
              {s.title}
            </AccordionHeader>
            <AccordionBody>
              {" "}
              <p className="text-sm"> {s.description} </p>{" "}
            </AccordionBody>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
