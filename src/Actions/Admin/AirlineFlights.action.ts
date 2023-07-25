import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ResultBase } from "../../Types";
import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const initialState: Array<ResultBase> = [];

export const fetchAirlineFlights = createAsyncThunk(
  "Airline Flights",
  async () => {
    const config: AxiosRequestConfig = {
      method: "get",
      url: "http://localhost:5050/flight/my_airline_flights",
      headers: {
        token: Cookies.get("token"),
      },
    };

    const data = await axios(config);
    return data.data;
  }
);

const AirlineFlightsSlice = createSlice({
  name: "Airline Flight",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.splice(0, state.length);
    },
  },
  extraReducers: (build) => {
    build.addCase(
      fetchAirlineFlights.fulfilled,
      (state, action: PayloadAction<Array<ResultBase>>) => {
        state.splice(0, state.length);
        state.push(...action.payload);
      }
    );
  },
});

export const AirlineFlightAction = AirlineFlightsSlice.actions;
export default AirlineFlightsSlice.reducer;
