export interface MyProps {
  label?: string;
  Start?: boolean;
  callback?: Function;
  type?: number;
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
}

export interface SearchParamsType {
  from: AirportType;
  to: AirportType;
  dept_date: string;
  return_date?: string;
}

export enum SearchType {
  From,
  To,
}

export enum CallBackType {
  error,
  success,
}
