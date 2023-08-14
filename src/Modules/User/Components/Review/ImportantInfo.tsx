import React from "react";

export default function ImportantInfo() {
  const data = [
    "Remember to web check-in before arriving at the airport; carry a printed or soft copy of the boarding pass.",
    "Wearing masks/face covers is no longer mandatory. However, all travellers are advised to wear them, in view of the threat posed by COVID-19.",
    "One hand bag up to 7 kgs and 55x35x25cm, is allowed per traveller as cabin baggage. Certain personal articles like a lady's purse, laptop bags, etc. can be carried additionally.",
    "Check the detailed list of travel guidelines issued by Indian States and UTs.",
    "If you have arrived on any international flight and are taking a connecting domestic flight, please check the 'Travelling to India' Guideline.",
  ];

  const DISCLAIMER =
    "The information provided above is only for ready reference and convenience of customers, and may not be exhaustive. We strongly recommend that you check the full text of the guidelines issued by the State Governments and Airlines before travelling to ensure smooth travel. We accept no liability in this regard. In case you do not meet the required guidelines, the airline or state authorities can stop you from travelling.";

  return (
    <div className="bg-white shadow-md w-[48rem] rounded-md p-4 mx-8 h-max font-arial my-8">
      <h1 className="bg-pink-600 text-white p-1 font-bold font-qs rounded-md -mt-8 w-max text-sm uppercase">
        Important Information
      </h1>
      <ul className="text-sm text-gray-600 list-disc mx-4 text-justify">
        {data.map((s) => (
          <li key={s} className="my-2 ">
            {s}
          </li>
        ))}
      </ul>
      <p className="text-xs text-justify italic">
        {" "}
        <span className="uppercase font-bold">Disclaimer :</span> {DISCLAIMER}
      </p>
    </div>
  );
}
