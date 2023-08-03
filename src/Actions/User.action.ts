import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Roles, UserType } from "../Types";
import axios from "axios";
import Cookies from "js-cookie";

const initalState: UserType = {
  role: {
    role_id: Roles.Default,
    role_name: "",
  },
  email: "",
};

export const fetchUser = createAsyncThunk(
  "fetchUser",
  async (email: string) => {
    const config = {
      method: "get",
      url: `${process.env.REACT_APP_API}/user/mydetails?email=${email}`,
      headers: {
        token: Cookies.get("token"),
      },
    };

    const data = await axios(config);
    return data.data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: initalState,
  reducers: {
    remove: (state) => {
      Object.assign(state, initalState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      Object.assign(state, initalState);
      // //  console.log(action.payload);
      Object.assign(state, action.payload);
    });
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
