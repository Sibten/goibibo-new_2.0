import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TripData } from "../Types";
import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const initialState: Array<TripData> = [];

export const fetchTrips = createAsyncThunk("Trips", async () => {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${process.env.REACT_APP_API}/user/my_trips`,
    headers: {},
  };

  const data = await axios(config);

  return data.data;
});

const TripSlice = createSlice({
  name: "Trip",
  initialState: initialState,
  reducers: {
    remove: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (build) => {
    build.addCase(
      fetchTrips.fulfilled,
      (state, action: PayloadAction<Array<TripData>>) => {
        state.splice(0, state.length);
        state.push(...action.payload);
      }
    );
  },
});

export const TripActions = TripSlice.actions;
export default TripSlice.reducer;
