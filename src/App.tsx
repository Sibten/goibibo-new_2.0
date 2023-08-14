import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Modules/User/Pages/Login/Login.page";
import Homepage from "./Modules/User/Pages/Home/Home.page";
import Profilepage from "./Modules/User/Pages/Profile/Profile.page";
import Flightspage from "./Modules/User/Pages/FlightSearch/FlightsSearch.page";
import Pagenotfound from "./Modules/User/Components/Errors/Pagenotfound";
import Reviewpage from "./Modules/User/Pages/Review/Review.page";
import Protected from "./Protected";
import DepSeatSelectionPage from "./Modules/User/Pages/SeatSelection/DepSeatSelection.page";
import RtnSeatSelectionPage from "./Modules/User/Pages/SeatSelection/RtnSeatSelection.page";
import PaymentPage from "./Modules/User/Pages/Payment/Payment.page";
import Tripspage from "./Modules/User/Pages/Trips/Trips.page";
import TripMorepage from "./Modules/User/Pages/Trips/TripMoreinfo.page";
import UnderConstruction from "./Modules/User/Components/Errors/UnderConstruction";
import Support from "./Modules/User/Pages/Support/Support";
import AboutPage from "./Modules/User/Pages/About/About.page";
import OffersPage from "./Modules/User/Pages/Offers/Offers.page";
import axios from "axios";
import Skeleton from "./Skeleton";

import AdminProtection from "./AdminProtection";
import Forgotpage from "./Modules/Admin/Pages/Forgot/Forgot.page";
import AdminProfilepage from "./Modules/Admin/Pages/Profile/AdminProfile.page";
import AirlineProfilePage from "./Modules/Admin/Pages/AirlineProfile/Airline-Profile.page";
import Managementpage from "./Modules/Admin/Pages/Management/Managment.page";
import Admindashpage from "./Modules/Admin/Pages/Dashboard/Admin-dashboard.page";
import ScheduleFlightpage from "./Modules/Admin/Pages/Management/Menus/ScheduleFlight.page";
import Farepage from "./Modules/Admin/Pages/Management/Menus/Fare.page";
import LuggagePage from "./Modules/Admin/Pages/Management/Menus/Luggage.page";
import Routepage from "./Modules/Admin/Pages/Management/Menus/Route.page";
import FlightDashboardPage from "./Modules/Admin/Pages/Flight-Dashboard/Flight-dashboard.page";
import Flightpage from "./Modules/Admin/Pages/Flight-Dashboard/Flight/Flight.page";
import Reschedulepage from "./Modules/Admin/Pages/Flight-Dashboard/Flight/Reschedule.page";
import ViewBookingpage from "./Modules/Admin/Pages/Flight-Dashboard/Flight/ViewBooking.page";

axios.defaults.withCredentials = true;
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/admin" element={<Skeleton isAdmin={true} />}>
          <Route path="forgot" element={<Forgotpage />} />
          <Route element={<AdminProtection />}>
            <Route path="" element={<Admindashpage />} />{" "}
            <Route path="dashboard" element={<Admindashpage />} />{" "}
            <Route path="profile" element={<AdminProfilepage />} />
            <Route path="airline" element={<AirlineProfilePage />} />
            <Route path="management">
              <Route path="" element={<Managementpage />} />
              <Route path="scheduleflight" element={<ScheduleFlightpage />} />
              <Route path="fare" element={<Farepage />} />
              <Route path="luggage" element={<LuggagePage />} />
              <Route path="route" element={<Routepage />} />
            </Route>
            <Route path="flights">
              <Route path="" element={<FlightDashboardPage />} />
              <Route path=":flightno">
                <Route path="" element={<Flightpage />} />
                <Route path=":date">
                  <Route path="manage" element={<Reschedulepage />} />
                  <Route path="viewbooking" element={<ViewBookingpage />} />
                </Route>
              </Route>
            </Route>
            <Route path="*" element={<Pagenotfound />} />
          </Route>
        </Route>
        <Route element={<Skeleton isAdmin={false} />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/flight">
            <Route path="" element={<Homepage />} />
            <Route path="search" element={<Flightspage />} />
            <Route element={<Protected head={true} />}>
              <Route path="review" element={<Reviewpage />} />
              <Route path="seat_selection" element={<DepSeatSelectionPage />} />
              <Route
                path="rtn_seat_selection"
                element={<RtnSeatSelectionPage />}
              />
              <Route path="payment" element={<PaymentPage />} />
            </Route>
          </Route>
          <Route element={<Protected head={false} />}>
            <Route path="/profile" element={<Profilepage />} />
            <Route path="/mytrips" element={<Tripspage />} />
            <Route path="/mytrip/:pnr" element={<TripMorepage />} />
          </Route>

          <Route path="/support" element={<Support />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/hotels" element={<UnderConstruction />} />
          <Route path="/trains" element={<UnderConstruction />} />
          <Route path="/bus" element={<UnderConstruction />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="*" element={<Pagenotfound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
