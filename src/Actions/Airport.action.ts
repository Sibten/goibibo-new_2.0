import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AirportType } from "../Types";
import axios from "axios";

const initialState: Array<AirportType> = [];

export const fetchAirports = createAsyncThunk("fetchAirports", async () => {
  // //  console.log("Calling...");
  const config = {
    method: "get",
    url: "http://localhost:5050/city/",
    headers: {},
  };
  const data = await axios(config);
  return data.data;
});

const airportSlice = createSlice({
  name: "airport",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAirports.fulfilled, (state, action) => {
      state.push(...action.payload);
    });
  },
});

export const airportsActions = airportSlice.actions;
export default airportSlice.reducer;
