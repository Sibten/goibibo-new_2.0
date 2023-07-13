import { toast } from "react-toastify";
export interface MyProps {
  label?: string;
  Start?: boolean;
  callback?: Function;
  type?: number;
  callType?: Number;
}

export enum APICallType {
  POST,
  GET,
  DELETE,
  PUT,
}
export enum callTypes {
  UpdateStore,
  JustReturn,
}
export interface Config {
  method: string;
  url: string;
  headers: Object;
  data?: string;
}

export interface UserType {
  profile_photo?: string;
  role?: {
    role_id: number;
    role_name: string;
  };
  user_name?: string;
  first_name?: string;
  last_name?: string;
  email: string;
  password?: string;
  gender?: string;
  date_of_birth?: string;
  billing_address?: string;
  city?: string;
  nationality?: string;
  state?: string;
  pincode?: number;
}

export enum Roles {
  SuperAdmin,
  Admin,
  User,
  Default,
}

export const indianStates: string[] = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
];

export interface AirportType {
  city_id: number;
  city_name: string;
  airport_name: string;
  airport_code: string;
  country_name: string;
}

export enum Flighclass {
  Economy,
  PremiumEconomy,
  Business,
  FirstClass,
}

export interface SearchParamsType {
  from: AirportType;
  to: AirportType;
  dept_date: string;
  return_date?: string | null;
  class: number;
  pepoles: { adults: number; children?: number; infants?: number };
}

export enum SearchType {
  From,
  To,
}

export enum People {
  Adult,
  Child,
  Infant,
}

export enum CallBackType {
  error,
  success,
}

export interface LuggageType {
  type: number;
  limit: number;
}
export interface ClassFare {
  class_type: number;
  basic_fare: number;
}

export interface Filter {
  dep: {
    time1: number;
    time2: number;
    stops: number;
    airline: Array<string>;
    min: number;
    max: number;
  };
  rtn: {
    time1: number;
    time2: number;
    stops: number;
    airline: Array<string>;
    min: number;
    max: number;
  };
}

export interface Airline {
  airline_id: string;
  airline_name: string;
  airline_icon: string;
  airline_code: string;
}

export interface ResultBase {
  timing: [
    {
      source_time: string;
      destination_time: string;
    }
  ];
  available_seats: [
    {
      date: Date;
      BC: number;
      EC: number;
      PE: number;
      FC: number;
    }
  ];
  booked_seats: [
    {
      date: Date;
      BC: Array<string>;
      EC: Array<string>;
      PE: Array<string>;
      FC: Array<string>;
    }
  ];
  flight_no: string;
  airline_id: Airline;
  route_id: {
    route_id: string;
    source_city: AirportType;
    destination_city: AirportType;
    stops: Array<AirportType>;
    distance: number;
  };
  airbus_id: {
    airbus_code: string;
  };
  status: number;
  fare: {
    fare: Array<ClassFare>;
    tax: number;
    total?: number;
  };
  rule: {
    luggage: Array<LuggageType>;
  };
}
export interface ResultData {
  dep: Array<ResultBase>;
  rtn?: Array<ResultBase>;
}

export interface TravellerIndiPayment {
  no_people: number;
  type: number;
  fare: {
    dep: { basic: number; tax: number };
    rtn: { basic: number; tax: number };
  };
  basic_total: number;
  tax_total: number;
}

export interface TotalPaymentDetails {
  basic_total: number;
  tax_total: number;
  original_total: number;
  discount: number;
  promotion: number;
}

export interface OfferBase {
  offer_name: string;
  referal_code: string;
  offer_discount: number;
  valid_till: Date;
  description: string;
}

export interface Traveller {
  first_name: string;
  last_name: string;
  age: number;
  gender: string;
}

export interface TravellerDetailsBase {
  adults: Array<Traveller>;
  children?: Array<Traveller>;
  infants?: Array<Traveller>;
}