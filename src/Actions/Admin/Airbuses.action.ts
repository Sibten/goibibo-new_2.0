import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Airbus } from "../../Types";
import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const initialState: Array<Airbus> = [];

export const fetchAirbus = createAsyncThunk("airbuses", async () => {
  let config: AxiosRequestConfig = {
    method: "get",
    url: `${process.env.REACT_APP_API}/airbus/`,
    headers: {
      // token: Cookies.get("token"),
    },
  };
  const res = await axios(config);
  return res.data;
});

const airbusSlice = createSlice({
  name: "airbus",
  initialState: initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(
      fetchAirbus.fulfilled,
      (state, action: PayloadAction<Array<Airbus>>) => {
        state.splice(0, state.length);
        state.push(...action.payload);
      }
    );
  },
});

export const airbusActions = airbusSlice.actions;
export default airbusSlice.reducer;
