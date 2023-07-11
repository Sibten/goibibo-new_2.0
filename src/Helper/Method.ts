import FlightClass from "../Components/Flight/MainSubcomponents/FlightClass";
import { Flighclass, ClassFare, AirportType, People } from "../Types";

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
  return `${hrs}h ${min}m`;
};
export const calFare = (
  totalkm: number,
  basicfare: Array<ClassFare>,
  tax: number,
  fclass: number,
  stops: number,
  people?: number
): { basic: number; tax: number } => {
  let bfare: number = 0;

  if (stops == 0) {
    tax = tax + 0.15;
  } else if (stops == 1) {
    tax = tax + 0.05;
  } else {
    tax = tax + 0.02;
  }

  switch (fclass) {
    case Flighclass.Economy:
      bfare =
        totalkm *
        basicfare.find((s) => s.class_type == Flighclass.Economy)?.basic_fare!;
      if (people == People.Infant) {
        bfare = bfare * 0.8;
        return { basic: Math.ceil(bfare), tax: Math.ceil(bfare * tax) };
      }
      return { basic: Math.ceil(bfare), tax: Math.ceil(bfare * tax) };
    case Flighclass.Business:
      bfare =
        totalkm *
        basicfare.find((s) => s.class_type == Flighclass.Business)?.basic_fare!;
      if (people == People.Infant) {
        bfare = bfare * 0.8;
        return { basic: Math.ceil(bfare), tax: Math.ceil(bfare * tax) };
      }
      return { basic: Math.ceil(bfare), tax: Math.ceil(bfare * tax) };
    case Flighclass.FirstClass:
      bfare =
        totalkm *
        basicfare.find((s) => s.class_type == Flighclass.FirstClass)
          ?.basic_fare!;
      if (people == People.Infant) {
        bfare = bfare * 0.8;
        return { basic: Math.ceil(bfare), tax: Math.ceil(bfare * tax) };
      }
      return { basic: Math.ceil(bfare), tax: Math.ceil(bfare * tax) };
    case Flighclass.PremiumEconomy:
      bfare =
        totalkm *
        basicfare.find((s) => s.class_type == Flighclass.PremiumEconomy)
          ?.basic_fare!;
      if (people == People.Infant) {
        bfare = bfare * 0.8;
        return { basic: Math.ceil(bfare), tax: Math.ceil(bfare * tax) };
      }
      return { basic: Math.ceil(bfare), tax: Math.ceil(bfare * tax) };
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
