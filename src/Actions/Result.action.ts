import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ResultBase } from "../Types";
import axios, { AxiosRequestConfig } from "axios";

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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchResult.fulfilled, (state, action) => {
      state.splice(0, state.length);
      state.push(...action.payload);
    });
  },
});

export const ResultActions = ResultSlice.actions;
export default ResultSlice.reducer;
