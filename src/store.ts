import { AnyAction, ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Actions/User.action";
import AirportReducer from "./Actions/Airport.action";
import SearchReducer from "./Actions/Search.action";
import ResultReducer from "./Actions/Result.action";
import BookingFlightReducer from "./Actions/BookingFlight.action";

const store = configureStore({
  reducer: {
    User: UserReducer,
    Airports: AirportReducer,
    SearchParms: SearchReducer,
    Result: ResultReducer,
    BookingFlight: BookingFlightReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
export default store;
