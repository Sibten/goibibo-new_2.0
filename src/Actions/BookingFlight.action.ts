import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { callTypes, ResultBase, SearchType } from "../Types";
import axios, { AxiosRequestConfig } from "axios";
import { callAPI } from "../Services/APIFetch";

let initalState: { dep?: ResultBase; rtn?: ResultBase } = {
  dep: undefined,
  rtn: undefined,
};

export const fetchFlight = createAsyncThunk(
  "fetchFlight",
  async (call: { config: AxiosRequestConfig; type: number }) => {
    const data = await axios(call.config);
    if (call.type == SearchType.From) {
      return { data: data.data, type: SearchType.From };
    } else {
      return { data: data.data, type: SearchType.To };
    }
  }
);

const BookingFlightSlice = createSlice({
  name: "Booking Flight",
  initialState: initalState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initalState);
    },
  },
  extraReducers: (build) => {
    build.addCase(
      fetchFlight.fulfilled,
      (state, action: PayloadAction<{ data: ResultBase; type: number }>) => {
        if (action.payload.type == SearchType.From) {
          state.dep = action.payload.data;
          state.rtn = undefined;
        } else {
          state.rtn = action.payload.data;
        }
      }
    );
  },
});

export const BookingFlightActions = BookingFlightSlice.actions;
export default BookingFlightSlice.reducer;
