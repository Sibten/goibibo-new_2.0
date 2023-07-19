import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { BsArrowLeft, BsArrowRight, BsClock } from "react-icons/bs";
import { FaClock, FaUser } from "react-icons/fa";
import { date, getPeopleType, time } from "../../Helper/Method";
import BillingAddress from "./BillingAddress";
import { BiChat } from "react-icons/bi";

export default function TicketDetails() {
  const bookingDetails = useSelector(
    (state: RootState) => state.BookingDetails
  );

  const flightDetails = useSelector((state: RootState) => state.BookingFlight);
  return (
    <div className="my-8 border border-gray-300 rounded-md font-arial p-2">
      <div>
        {flightDetails.dep ? (
          <div>
            <div className="text-base  flex p-2 items-center border-b">
              <div>
                <img
                  src={flightDetails.dep.airline_id.airline_icon}
                  alt="airline"
                  className="h-16 w-30"
                />
              </div>
              <div className="mx-2">
                <p className="flex">
                  <span className="font-bold text-lg text-gray-900">
                    {" "}
                    {flightDetails.dep.route_id.source_city.city_name}&nbsp;(
                    {flightDetails.dep.route_id.source_city.airport_code})
                  </span>
                  <BsArrowRight className="my-1 mx-2 text-orange-700" />{" "}
                  <span className="font-bold text-lg text-gray-900">
                    {" "}
                    {flightDetails.dep.route_id.destination_city.city_name}
                    &nbsp;(
                    {flightDetails.dep.route_id.destination_city.airport_code})
                  </span>
                </p>
                <p className="flex text-gray-700 text-sm">
                  <BsClock className="mr-2 my-1" />{" "}
                  <span>
                    {" "}
                    {date(bookingDetails.jouerny?.dep.destination_time!)} &nbsp;
                    {time(bookingDetails.jouerny?.dep.destination_time!)}
                  </span>
                  <BsArrowRight className="my-1 mx-2 text-orange-700" />
                  <span>
                    {" "}
                    {date(bookingDetails.jouerny?.dep.source_time!)} &nbsp;
                    {time(bookingDetails.jouerny?.dep.source_time!)}
                  </span>
                </p>
              </div>
            </div>
            <div className="p-2 flex items-center border-b my-2">
              <div>
                <img
                  src="https://res.cloudinary.com/dgsqarold/image/upload/v1689663813/Goibibo/User_ltfrvf.png"
                  alt="user"
                  className="h-10 w-10 mx-4"
                />
              </div>
              <div className="w-full mx-4">
                <ul>
                  {bookingDetails.basic.people.map((s) => (
                    <li
                      key={s.seat_no?.seat_no}
                      className="flex justify-between"
                    >
                      <span> {s.seat_no?.seat_no}</span>
                      <span className="font-bold">
                        {" "}
                        {s.first_name} {s.last_name}{" "}
                      </span>
                      <span className="uppercase">{getPeopleType(s.type)}</span>
                      <span>{s.age} Yrs</span>
                      <span>{s.gender}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="p-2 flex items-center my-2 w-full">
              <div>
                <BiChat />
              </div>
              <div className="flex justify-between w-full mx-2">
                <h1 className="font-bold"> e-Ticket will be send to </h1>
                <p>{bookingDetails.basic.email}</p>
              </div>
            </div>
            <div>
              <BillingAddress />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
