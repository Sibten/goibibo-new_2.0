import Cookies from "js-cookie";
import FlightClass from "../Components/FlightSearchBox/MainSubcomponents/FlightClass";
import {
  Flighclass,
  ClassFare,
  AirportType,
  People,
  AvaliableSeat,
} from "../Types";
import store from "../store";


export const time = (time: string) => {
  return new Date(time).toLocaleTimeString(undefined, {
    hourCycle: "h24",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const date = (time: string) => {
  return new Date(time).toLocaleDateString(undefined, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};
export const calDuration = (time1: string, time2: string) => {
  const t1 = new Date(time1).getTime();
  const t2 = new Date(time2).getTime();

  let diff = t2 - t1;
  let hrs = Math.floor(diff / (1000 * 60 * 60));
  let min = Math.ceil(((diff / (1000 * 60 * 60)) % 1) * 60);
  if (hrs >= 24) {
    let day = Math.floor(hrs / 24);
    hrs = hrs - 24 * day;
    return `${day}d ${hrs}h ${min}m`;
  } else return `${hrs}h ${min}m`;
};
export const calFare = (
  totalkm: number,
  fareData: { basicfare: Array<ClassFare>; tax: number },
  fclass: number,
  stops: number,
  seats: Array<AvaliableSeat>,
  calDate: string,
  people?: number
): { basic: number; tax: number } => {
  let bfare: number = 0;

  fareData.tax += 0.15 - stops / 10;

  let incFare = 50;

  let btnDay = Math.ceil(
    (new Date(calDate).getTime() - new Date().getTime()) / (1000 * 86400)
  );

  const avlSeat = seats.find(
    (s) => new Date(s.date).toDateString() == new Date(calDate).toDateString()
  );
  // //  console.log(avlSeat);
  if (btnDay != 0) {
    bfare = bfare + (1 / btnDay) * incFare;
  } else bfare = bfare + incFare * 2;

  switch (fclass) {
    case Flighclass.Economy:
      bfare =
        bfare +
        totalkm *
          fareData.basicfare.find((s) => s.class_type == Flighclass.Economy)
            ?.basic_fare!;

      bfare = bfare + (incFare / (avlSeat?.EC ?? 1)) * 50;
      if (people == People.Infant) {
        bfare = bfare * 0.8;
        return {
          basic: Math.ceil(bfare),
          tax: Math.ceil(bfare * fareData.tax),
        };
      }
      return { basic: Math.ceil(bfare), tax: Math.ceil(bfare * fareData.tax) };
    case Flighclass.Business:
      bfare =
        bfare +
        totalkm *
          fareData.basicfare.find((s) => s.class_type == Flighclass.Business)
            ?.basic_fare!;
      bfare = bfare + (incFare / (avlSeat?.BC ?? 1)) * 50;
      if (people == People.Infant) {
        bfare = bfare * 0.8;
        return {
          basic: Math.ceil(bfare),
          tax: Math.ceil(bfare * fareData.tax),
        };
      }
      return { basic: Math.ceil(bfare), tax: Math.ceil(bfare * fareData.tax) };
    case Flighclass.FirstClass:
      bfare =
        bfare +
        totalkm *
          fareData.basicfare.find((s) => s.class_type == Flighclass.FirstClass)
            ?.basic_fare!;
      bfare = bfare + (incFare / (avlSeat?.FC ?? 1)) * 50;
      if (people == People.Infant) {
        bfare = bfare * 0.8;
        return {
          basic: Math.ceil(bfare),
          tax: Math.ceil(bfare * fareData.tax),
        };
      }
      return { basic: Math.ceil(bfare), tax: Math.ceil(bfare * fareData.tax) };
    case Flighclass.PremiumEconomy:
      bfare =
        bfare +
        totalkm *
          fareData.basicfare.find(
            (s) => s.class_type == Flighclass.PremiumEconomy
          )?.basic_fare!;
      bfare = bfare + (incFare / (avlSeat?.PE ?? 1)) * 50;
      if (people == People.Infant) {
        bfare = bfare * 0.8;
        return {
          basic: Math.ceil(bfare),
          tax: Math.ceil(bfare * fareData.tax),
        };
      }
      return { basic: Math.ceil(bfare), tax: Math.ceil(bfare * fareData.tax) };
    default:
      return { basic: 0, tax: 0 };
  }
};

export const getStops = (stop: Array<AirportType>): string => {
  if (stop.length == 0) return "- Non Stop -";
  let string = ``;
  stop.forEach((s) => {
    string += `- ${s.airport_code} -`;
  });
  return string;
};

export const getLongFormClass = (class_name: string) => {
  switch (class_name) {
    case "BC":
      return `Bussiness`;
    case "EC":
      return "Economy";
    case "FC":
      return "First Class";
    case "PE":
      return "Premium Economy";
  }
};

export const getFlightClass = (class_number: number) => {
  switch (class_number) {
    case Flighclass.Business:
      return "Bussiness";
    case Flighclass.Economy:
      return "Economy";
    case Flighclass.FirstClass:
      return "First Class";
    case Flighclass.PremiumEconomy:
      return "Premium Economy";
  }
};

export const getPeopleType = (type: number) => {
  switch (type) {
    case People.Adult:
      return "Adult";
    case People.Child:
      return "Child";
    case People.Infant:
      return "Infants";
  }
};

