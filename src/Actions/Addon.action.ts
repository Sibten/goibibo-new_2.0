import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AddonBase } from "../Types";

export const fetchAddons = createAsyncThunk("addons", async () => {
  let config = {
    method: "get",
    url: `${process.env.REACT_APP_API}/addons/`,
    headers: {},
  };

  const res = await axios(config);
  return res.data;
});

const initialState: Array<AddonBase> = [];

export const addonSlice = createSlice({
  name: "Addon",
  initialState: initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(
      fetchAddons.fulfilled,
      (state, action: PayloadAction<Array<AddonBase>>) => {
        state.splice(0, state.length);
        state.push(...action.payload);
      }
    );
  },
});

export default addonSlice.reducer;
