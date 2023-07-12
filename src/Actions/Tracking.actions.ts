import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  booking: boolean;
  seat_selection: boolean;
  payment: boolean;
} = {
  booking: false,
  seat_selection: false,
  payment: false,
};

const trackingSlice = createSlice({
  name: "tracking",
  initialState: initialState,
  reducers: {
    activeBookig: (state) => {
      state.booking = true;
    },
    activeSeat: (state) => {
      state.seat_selection = true;
    },
    activePayment: (state) => {
      state.payment = true;
    },
  },
});

export const trackingActions = trackingSlice.actions;
export default trackingSlice.reducer;
