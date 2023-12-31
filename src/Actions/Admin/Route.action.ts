import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { Route } from "../../Types";
import { callAPI } from "../../Services/API.services";

const initialState: Array<Route> = [];

export const fetchRoutes = createAsyncThunk("route", async () => {
  // //  console.log("calling.. route");
  let config: AxiosRequestConfig = {
    method: "get",
    url: `${process.env.REACT_APP_API}/route/getroutes`,
    headers: {
      // token: Cookies.get("token"),
    },
  };
  const data = await axios(config);
  return data.data;
});

const routeSlice = createSlice({
  name: "route",
  initialState: initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(
      fetchRoutes.fulfilled,
      (state, action: PayloadAction<Array<Route>>) => {
        state.splice(0, state.length);
        state.push(...action.payload);
      }
    );
  },
});

export const routeActions = routeSlice.actions;
export default routeSlice.reducer;
