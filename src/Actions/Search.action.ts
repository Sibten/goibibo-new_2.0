import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchParamsType } from "../Types";

const initialState: SearchParamsType = {
  from: "Delhi",
  from_airport: "Indira Gandhi International Airport",
  to: "Mumbai",
  to_airport: "Chhatrapati Shivaji Maharaj International Airport",
  dept_date: new Date().toISOString(),
};

const searchSlice = createSlice({
  name: "Search",
  initialState: initialState,
  reducers: {
    setParams: (state, action: PayloadAction<SearchParamsType>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const searchActions = searchSlice.actions;
export default searchSlice.reducer;
