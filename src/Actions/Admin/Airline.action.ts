import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Airline } from "../../Types";
import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const initialState: Airline = {
  airline_code: "",
  airline_id: "",
  airline_location: "",
  airline_name: "",
  airline_icon: "",
};

export const fetchAirlineDetails = createAsyncThunk("airline", async () => {
  // //  console.log("i'm calling");
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${process.env.REACT_APP_API}/airlines/myairline/getdetails`,
    headers: {
      // token: Cookies.get("token"),
    },
  };
  const data = await axios(config);
  return data.data;
});

const airlineSlice = createSlice({
  name: "Airline",
  initialState: initialState,
  reducers: {
    remove: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (build) => {
    build.addCase(
      fetchAirlineDetails.fulfilled,
      (state, action: PayloadAction<Airline>) => {
        Object.assign(state, action.payload);
      }
    );
  },
});

export const airlineActions = airlineSlice.actions;
export default airlineSlice.reducer;
