import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ResultBase, ResultData } from "../Types";
import axios, { AxiosRequestConfig } from "axios";
import { initialState } from "./Search.action";

const initalState: ResultData = { dep: [], rtn: [] };

export const fetchResult = createAsyncThunk(
  "fetchResult",
  async (config: AxiosRequestConfig) => {
    const data = await axios(config);

    return data.data;
  }
);
const ResultSlice = createSlice({
  name: "Result",
  initialState: { data: initalState, loader: true },
  reducers: {
    setLoader: (state) => {
      state.loader = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchResult.fulfilled,
      (state, action: PayloadAction<ResultData>) => {
        state.data = action.payload;

        state.loader = false;
      }
    );
  },
});

export const ResultActions = ResultSlice.actions;
export default ResultSlice.reducer;
