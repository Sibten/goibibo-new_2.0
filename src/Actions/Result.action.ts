import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ResultBase } from "../Types";
import axios, { AxiosRequestConfig } from "axios";
import { initialState } from "./Search.action";

const initalState: Array<ResultBase> = [];

export const fetchResult = createAsyncThunk(
  "fetchResult",
  async (config: AxiosRequestConfig) => {
    const data = await axios(config);
    return data.data;
  }
);
const ResultSlice = createSlice({
  name: "Result",
  initialState: initalState,
  reducers: {
    add: (state, action: PayloadAction<Array<ResultBase>>) => {
      state.splice(0, state.length);
      state.push(...action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchResult.fulfilled,
      (state, action: PayloadAction<Array<ResultBase>>) => {
        state.splice(0, state.length);
        state.push(...action.payload);
      }
    );
  },
});

export const ResultActions = ResultSlice.actions;
export default ResultSlice.reducer;
