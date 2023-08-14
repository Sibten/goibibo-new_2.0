import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../Types";
import { getAPI } from "../../Services/API.services";

const initialState: UserType = {
  email: "",
};

export const fetchAdmin = createAsyncThunk(
  "fetch admin",
  async (email: string) => {
    const res = await getAPI(`/user/mydetails?email=${email}`);
    return res.data;
  }
);

const adminSlice = createSlice({
  name: "Admin",
  initialState: initialState,
  reducers: {
    remove: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (build) => {
    build.addCase(
      fetchAdmin.fulfilled,
      (state, action: PayloadAction<UserType>) => {
        Object.assign(state, action.payload);
      }
    );
  },
});

export const adminAction = adminSlice.actions;
export default adminSlice.reducer;
