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
  time1: number;
  time2: number;
  stops: number;
  airline: Array<string>;
  min: number;
  max: number;
}

export interface Airline {
  airline_id: string;
  airline_name: string;
  airline_icon: string;
  airline_code: string;
}

export interface ResultBase {
  timing: {
    source_time: string;
    destination_time: string;
  };
  available_seats: {
    BC: number;
    EC: number;
    PE: number;
    FC: number;
  };
  booked_seats: {
    BC: Array<string>;
    EC: Array<string>;
    PE: Array<string>;
    FC: Array<string>;
  };
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
  loader: boolean;
}
