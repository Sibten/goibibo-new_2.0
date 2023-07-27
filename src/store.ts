import { AnyAction, ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Actions/User.action";
import AirportReducer from "./Actions/Airport.action";
import SearchReducer from "./Actions/Search.action";
import ResultReducer from "./Actions/Result.action";
import BookingFlightReducer from "./Actions/BookingFlight.action";
import OfferReducer from "./Actions/Offers.action";
import TrackingReducer from "./Actions/Tracking.actions";
import BookingReducer from "./Actions/ConfirmBookingDetails.action";
import AddonReducer from "./Actions/Addon.action";
import TripReducer from "./Actions/Trip.action";
import AirlineReducer from "./Actions/Admin/Airline.action";
import AirlineFlightReducer from "./Actions/Admin/AirlineFlights.action";
import AirbusReducer from "./Actions/Admin/Airbuses.action";
import RouteReducer from "./Actions/Admin/Route.action";
import UtilityReducer from "./Actions/Admin/Utility.action";

const store = configureStore({
  reducer: {
    User: UserReducer,
    Airports: AirportReducer,
    SearchParms: SearchReducer,
    Result: ResultReducer,
    BookingFlight: BookingFlightReducer,
    Offers: OfferReducer,
    Tracking: TrackingReducer,
    BookingDetails: BookingReducer,
    Addons: AddonReducer,
    Trips: TripReducer,
    Airline: AirlineReducer,
    AirlineFlight: AirlineFlightReducer,
    Airbuses: AirbusReducer,
    Routes: RouteReducer,
    Utility: UtilityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
export default store;
