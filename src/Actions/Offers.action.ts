import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APICallType, OfferBase } from "../Types";
import axios, { AxiosRequestConfig } from "axios";
import { getAPICallType } from "../Services/APIFetch";

const initialState: Array<OfferBase> = [];

export const fetchOffers = createAsyncThunk("offer fetch", async () => {
  const config: AxiosRequestConfig = {
    method: getAPICallType(APICallType.GET),
    url: `${process.env.REACT_APP_API}/offers/all_offers`,
    headers: {},
  };
  const data = await axios(config);

  return data.data;
});

const offerSlice = createSlice({
  name: "offer",
  initialState: initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(
      fetchOffers.fulfilled,
      (state, action: PayloadAction<Array<OfferBase>>) => {
        state.splice(0, state.length);
        state.push(...action.payload);
      }
    );
  },
});

export const offerActions = offerSlice.actions;
export default offerSlice.reducer;
