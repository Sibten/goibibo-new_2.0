export interface MyProps {
  label?: string;
  Start?: boolean;
  callback?: Function;
  type?: number;
  callType?: number;
}

export const emailRegx = /^[A-Za-z0-9_.]+@[a-z.]+\.[a-z]{2,4}$/;

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
  User, // 0
  Admin, // 1
  SuperAdmin, // 2
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

export enum JouernyType {
  Departure,
  Return,
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
export interface AvaliableSeat {
  date: Date;
  BC: number;
  EC: number;
  PE: number;
  FC: number;
}

export interface AvaliableClass {
  BC: boolean;
  EC: boolean;
  PE: boolean;
  FC: boolean;
}

export interface Route {
  route_id: string;
  source_city: AirportType;
  destination_city: AirportType;
  stops: Array<AirportType>;
  added_by?: Airline;
  distance: number;
}

export interface ResultBase {
  timing: [
    {
      source_time: string;
      destination_time: string;
    }
  ];
  available_seats: Array<AvaliableSeat>;
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
  route_id: Route;
  airbus_id: {
    available_class?: AvaliableClass;
    airbus_code: string;
    seat_map: Array<SeatLayout>;
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
  total_add_on: number;
}
export enum AddonType {
  Baggage,
  Seat,
  Insurance,
}

export interface AddonBase {
  _id?: string;
  type: number;
  name: string;
  icon?: string;
  limit?: number;
  price: number;
}

export interface OfferBase {
  offer_name: string;
  referal_code: string;
  offer_discount: number;
  valid_till: Date;
  description: string;
}
export enum SeatType {
  Booked,
  Window,
  Middle,
  Aisle,
}
export interface SeatBase {
  seat_no: string;
  type: number;
  price: number | null;
}
export interface Traveller {
  type: number;
  first_name: string;
  last_name: string;
  age: number;
  seat_no?: SeatBase;
  rtn_seat_no?: SeatBase;
  gender: string;
}
export interface Timing {
  source_time: string | null;
  destination_time: string | null;
}
export interface TravellerDetailsBase {
  jouerny: {
    travel_class: number;
    dep: Timing;
    rtn: Timing;
  };
  basic: {
    people: Array<Traveller>;
    infants: Array<Traveller>;
    email: string;
    address: string;
    state: string;
    pincode: number;
  };
  payment?: TotalPaymentDetails;
  addOnDep?: Array<AddonBase>;
  addOnRtn?: Array<AddonBase>;
}

export interface SeatLayout {
  class_type: number;
  row_start: number;
  row_end: number;
  col_start: string;
  col_gap: string;
  col_end: string;
}

export interface BookedSeat {
  date: Date;
  BC: Array<string>;
  EC: Array<string>;
  PE: Array<string>;
  FC: Array<string>;
}
export interface RZPInfo {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface Flight {
  flight_no: string;
  airline_id: {
    airline_id: string;
    airline_name: string;
    airline_location: string;
    airline_code: string;
    airline_icon: string;
  };
}

export interface PeopleBase {
  type: number;
  first_name: string;
  last_name: string;
  gender: string;
  age: number;
  seat_no?: SeatBase;
  rtn_seat_no?: SeatBase;
}

export interface BookingSendingData {
  rzpinfo: RZPInfo;
  dep_flight_no: string;
  rtn_flight_no: string | null;
  payment: TotalPaymentDetails;
  travel_class: number;
  dep_date: string;
  rtn_date: string | null;
  dep_booking_seat: Array<SeatBase>;
  rtn_booking_seat: Array<SeatBase> | null;
  email: string;
  destn_city_code: string;
  source_city_code: string;
  peoples: Array<Traveller>;
  infants: Array<Traveller>;
  addons: {
    departure_addons: Array<AddonBase>;
    return_addons?: Array<AddonBase> | null;
  };
}

export interface TripData {
  jouerny_info: {
    departure_date: string;
    return_date: string | null;
    destination_city: {
      airport_code: string;
      city_id: number;
      city_name: string;
      country_name: string;
      airport_name: string;
    };
    source_city: {
      airport_code: string;
      city_id: number;
      city_name: string;
      country_name: string;
      airport_name: string;
    };
    departure_flight: Flight;
    return_flight: Flight | null;
    peoples: Array<PeopleBase>;
    address: string;
    pincode: number;
    state: string;
    infants: Array<PeopleBase>;
  };
  addons: {
    departure_addons: Array<AddonBase>;
    return_addons: Array<AddonBase>;
  };
  booking_stamp: string;
  PNR_no: number;
  class_type: number;
  ticket_email: string;
  status: number;
  payment: {
    payment_amount: TotalPaymentDetails;
    order_id: string;
    razor_pay_id: string;
    transaction_stamp: string;
    status: number;
  };
}

export enum BookingStatus {
  Upcoming,
  Completed,
  Closed,
}
export enum payment {
  Completed,
  Pending,
  Rejected,
  Refunded,
}

// Admins
export interface Airline {
  airline_id: string;
  airline_name: string;
  airline_location: string;
  airline_code: string;
  airline_icon: string;
}

export interface Airbus {
  available_class: AvaliableClass;
  airbus_code: string;
  seat_map: Array<SeatLayout>;
}
export interface Fare {
  airline_id: Airline;
  fare: Array<ClassFare>;
  tax: number;
}
export interface Luggage {
  airline_id: Airline;
  luggage: Array<LuggageType>;
}
export interface Utility {
  fare: Fare | null;
  luggage: Luggage | null;
}
export interface FareUpdate {
  EC_fare: number;
  BC_fare: number;
  PE_fare: number;
  FC_fare: number;
  tax: number;
}
export interface LuggageUpdate {
  EC: number;
  BC: number;
  PE: number;
  FC: number;
}

export interface UserBookingBase {
  bookings: Array<{
    date: string;
    booking: [
      {
        mail: string;
        id: {
          jouerny_info: {
            departure_date: string;
            return_date: string | null;
            destination_city: AirportType;
            source_city: AirportType;
            isRtn: boolean;
            peoples: Array<PeopleBase>;
            address: string;
            pincode: number;
            state: string;
            infants: [];
          };
          addons: {
            departure_addons: Array<AddonBase>;
            return_addons: Array<AddonBase>;
          };
          class_type: number;
          status: number;
          payment: {
            payment_amount: TotalPaymentDetails;
            order_id: string;
            razor_pay_id: string;
            transaction_stamp: string;
            status: number;
          };
        };
      }
    ];
  }>;
}
