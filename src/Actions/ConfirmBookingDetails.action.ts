import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { TotalPaymentDetails, Traveller, TravellerDetailsBase } from "../Types";

const initialState: TravellerDetailsBase = {
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
  },
};

const BookingSlice = createSlice({
  name: "Booking Details",
  initialState: initialState,
  reducers: {
    addBasic: (state, action: PayloadAction<TravellerDetailsBase>) => {
      state.basic = action.payload.basic;
    },
    addPayment: (state, action: PayloadAction<TotalPaymentDetails>) => {
      state.payment = action.payload;
    },
    updatePeople: (state, action: PayloadAction<Array<Traveller>>) => {
      state.basic.people = action.payload;
    },
  },
});

export const BookingActions = BookingSlice.actions;
export default BookingSlice.reducer;