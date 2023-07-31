import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Flighclass, SearchParamsType } from "../Types";
const today = new Date();

export const initialState: SearchParamsType = {
  from: {
    city_id: 1,
    city_name: "Delhi",
    airport_name: "Indira Gandhi International Airport",
    airport_code: "DEL",
    country_name: "India",
  },
  to: {
    city_id: 2,
    city_name: "Mumbai",
    airport_name: "Chhatrapati Shivaji Maharaj International Airport",
    airport_code: "BOM",
    country_name: "India",
  },
  dept_date: new Date().toISOString().split("T")[0],

  class: Flighclass.Economy,
  pepoles: {
    adults: 1,
    children: 0,
    infants: 0,
  },
};


const searchSlice = createSlice({
  name: "Search",
  initialState: initialState,
  reducers: {
    setParams: (state, action: PayloadAction<SearchParamsType>) => {
      Object.assign(state, action.payload);
    },
    swap: (state) => {
      [state.from, state.to] = [state.to, state.from];
    },
  },
});

export const searchActions = searchSlice.actions;
export default searchSlice.reducer;
