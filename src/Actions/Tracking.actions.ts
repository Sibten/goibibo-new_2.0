import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  booking: boolean;
  dep_seat_selection: boolean;
  rtn_seat_selection?: boolean;
  payment: boolean;
} = {
  booking: false,
  dep_seat_selection: false,
  rtn_seat_selection: false,
  payment: false,
};

const trackingSlice = createSlice({
  name: "tracking",
  initialState: initialState,
  reducers: {
    activeBookig: (state) => {
      state.booking = true;
    },
    activeDepSeat: (state) => {
      state.dep_seat_selection = true;
    },
    activeRtnSeat: (state) => {
      state.rtn_seat_selection = true;
    },
    activePayment: (state) => {
      state.payment = true;
    },
    disableAll: (state) => {
      state.booking = false;
      state.dep_seat_selection = false;
      state.payment = false;
      state.rtn_seat_selection = false;
    },
  },
});

export const trackingActions = trackingSlice.actions;
export default trackingSlice.reducer;
