import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ResultBase } from "../Types";
import axios, { AxiosRequestConfig } from "axios";
import { initialState } from "./Search.action";

const initalState: Array<ResultBase> = [];

export const fetchResult = createAsyncThunk(
  "fetchResult",
  async (config: AxiosRequestConfig) => {
    const data = await axios(config);
    console.log("-->", data.data);
    return data.data;
  }
);
const ResultSlice = createSlice({
  name: "Result",
  initialState: { data: initalState, loader: true },
  reducers: {
    add: (state, action: PayloadAction<Array<ResultBase>>) => {
      state.data.splice(0, state.data.length);
      state.data.push(...action.payload);
      state.loader = false;
    },
    setLoader: (state) => {
      state.loader = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchResult.fulfilled,
      (state, action: PayloadAction<Array<ResultBase>>) => {
        state.data.splice(0, state.data.length);
        state.data.push(...action.payload);
        state.loader = false;
      }
    );
  },
});

export const ResultActions = ResultSlice.actions;
export default ResultSlice.reducer;
