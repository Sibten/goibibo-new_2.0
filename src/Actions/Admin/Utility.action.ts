import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Fare, Luggage, Utility } from "../../Types";
import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
export const initialState: Utility = {
  fare: null,
  luggage: null,
};

export const fetchFare = createAsyncThunk("fare", async () => {
  let config: AxiosRequestConfig = {
    method: "get",
    url: `${process.env.REACT_APP_API}/airlines/myairline/fare`,
    headers: {
      token: Cookies.get("token"),
    },
  };

  const res = await axios(config);

  return res.data;
});

export const fetchLuggage = createAsyncThunk("Luggage", async () => {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${process.env.REACT_APP_API}/airlines/myairline/rule`,
    headers: {
      token: Cookies.get("token"),
    },
  };
  const res = await axios(config);
  return res.data;
});

const utilitySlice = createSlice({
  name: "Utility",
  initialState: initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchFare.fulfilled, (state, action: PayloadAction<Fare>) => {
      state.fare = action.payload;
    });
    build.addCase(
      fetchLuggage.fulfilled,
      (state, action: PayloadAction<Luggage>) => {
        state.luggage = action.payload;
      }
    );
  },
});

export const utilityAction = utilitySlice.actions;
export default utilitySlice.reducer;
