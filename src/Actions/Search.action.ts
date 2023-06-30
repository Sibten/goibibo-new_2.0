import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Flighclass, SearchParamsType } from "../Types";
const today = new Date();

const initialState: SearchParamsType = {
  from: {
    city_id: 1,
    city_name: "Delhi",
    airport_name: "Indira Gandhi International Airport",
    airport_code: "DEL",
  },
  to: {
    city_id: 2,
    city_name: "Mumbai",
    airport_name: "Chhatrapati Shivaji Maharaj International Airport",
    airport_code: "BOM",
  },
  dept_date: new Date().toISOString(),

  class: Flighclass.Economy,
  pepoles: {
    adults: 1,
    children: 0,
    infants: 0,
  },
};
console.log(initialState.pepoles.children);

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
