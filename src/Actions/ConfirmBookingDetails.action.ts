import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  AddonBase,
  SearchType,
  Timing,
  TotalPaymentDetails,
  Traveller,
  TravellerDetailsBase,
} from "../Types";

const initialState: TravellerDetailsBase = {
  jouerny: {
    travel_class: 0,
    dep: { source_time : null, destination_time : null},   
    rtn : { source_time : null, destination_time : null}
  },
  basic: {
    people: [],
    infants: [],
    address: "",
    state: "def",
    pincode: 0,
    email: "",
  },
  payment: {
    basic_total: 0,
    tax_total: 0,
    original_total: 0,
    discount: 0,
    promotion: 0,
    total_add_on: 0,
  },
  addOnDep: [],
  addOnRtn: [],
};

const BookingSlice = createSlice({
  name: "Booking Details",
  initialState: initialState,
  reducers: {
    addTiming: (
      state,
      action: PayloadAction<{ data: Timing; type: number; class: number }>
    ) => {
      // console.log("class", action.payload.class);
      state.jouerny.travel_class = action.payload.class;
      if (action.payload.type == SearchType.From) {
        Object.assign(state.jouerny.dep, action.payload.data);
        console.log("state", state);
      } else {
        Object.assign(state.jouerny.rtn as any, action.payload.data);
        console.log("state", state);
      }
    },
    addBasic: (state, action: PayloadAction<TravellerDetailsBase>) => {
      state.basic = action.payload.basic;
    },
    addPayment: (state, action: PayloadAction<TotalPaymentDetails>) => {
      state.payment = action.payload;
    },
    addAddon: (
      state,
      action: PayloadAction<{ type: number; data?: AddonBase }>
    ) => {
      if (action.payload.type == SearchType.From && action.payload.data) {
        state.addOnDep?.push(action.payload.data);
      } else if (action.payload.data) {
        state.addOnRtn?.push(action.payload.data);
      }
    },
    addAddOnPayment: (state, action: PayloadAction<number>) => {
      state.payment!.total_add_on += action.payload;
    },
    updatePeople: (state, action: PayloadAction<Array<Traveller>>) => {
      state.basic.people = action.payload;
    },
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const BookingActions = BookingSlice.actions;
export default BookingSlice.reducer;
