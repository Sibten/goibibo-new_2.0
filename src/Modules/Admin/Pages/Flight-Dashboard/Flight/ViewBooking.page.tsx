import React, { useEffect, useState } from "react";
import {
  Flighclass,
  People,
  PeopleBase,
  ResultBase,
  UserBookingBase,
} from "../../../../../Types";
import { getAPI } from "../../../../../Services/API.services";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";

export default function ViewBookingpage() {
  const [bookingdata, setBookingData] = useState<UserBookingBase>();
  const [categoryWiseData, setCategoryWiseData] = useState<{
    BC: Array<PeopleBase>;
    EC: Array<PeopleBase>;
    FC: Array<PeopleBase>;
    PE: Array<PeopleBase>;
  }>({ EC: [], BC: [], PE: [], FC: [] });
  const params = useParams();
  const flightNo = params.flightno;
  const selector = useSelector((state: RootState) => state.AirlineFlight);

  const [flight, setFlight] = useState<ResultBase | undefined>();

  const flightDate = params.date ?? "";

  useEffect(() => {
    setFlight(selector.find((s) => s.flight_no == flightNo));

    const fetchData = async () => {
      return new Promise(async (res, rej) => {
        try {
          const response = await getAPI(
            `/flight/getbookings?flightNo=${flightNo}&date=${flightDate}`
          );
          return res(response.data);
        } catch (e) {
          return rej(e);
        }
      });
    };

    fetchData()
      .then((d: any) => setBookingData(d))
      .catch((e) => {
        toast.error("unable to load");
      });
  }, []);

  // const [filterData, setFilterData] = useState();
  // if (
  //   s.id.jouerny_info.source_city.airport_code ==
  //   flight?.route_id.source_city.airport_code
  // ) {
  // }
  useEffect(() => {
    bookingdata?.bookings[0]?.booking.forEach((s) => {
      switch (s.id.class_type) {
        case Flighclass.Business:
          categoryWiseData?.BC.push(...s.id.jouerny_info.peoples);
          break;
        case Flighclass.Economy:
          categoryWiseData?.EC.push(...s.id.jouerny_info.peoples);
          break;
        case Flighclass.FirstClass:
          categoryWiseData?.FC.push(...s.id.jouerny_info.peoples);
          break;
        case Flighclass.PremiumEconomy:
          categoryWiseData?.PE.push(...s.id.jouerny_info.peoples);
          break;
      }
    });
    setCategoryWiseData({ ...categoryWiseData });
    // setFilterData(filterData);
  }, [bookingdata]);

  return (
    <div>
      <div>
        <h1> Economy </h1>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Age</td>
              <td>Gender</td>
              <td>Seat No</td>
            </tr>
          </thead>
          <tbody>
            {categoryWiseData?.EC.map((d) => (
              <tr>
                {" "}
                <td>
                  {" "}
                  {d.first_name} {d.last_name}
                </td>
                <td>{d.age}</td>
                <td>{d.gender}</td>
                <td>{d.seat_no?.seat_no}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}
