import "./App.css";
import Header from "./Components/Header/Header.components";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/Login/Login.page";
import Homepage from "./Pages/Home/Home.page";
import Profilepage from "./Pages/Profile/Profile.page";
import Flightspage from "./Pages/Flights/FlightsSearch.page";
import Pagenotfound from "./Components/Errors/Pagenotfound";
import Reviewpage from "./Pages/Review/Review.page";
import Protected from "./Protected";
import DepSeatSelectionPage from "./Pages/SeatSelection/DepSeatSelection.page";
import RtnSeatSelectionPage from "./Pages/SeatSelection/RtnSeatSelection.page";
import PaymentPage from "./Pages/Payment/Payment.page";
import Tripspage from "./Pages/Trips/Trips.page";
import TripMorepage from "./Pages/Trips/TripMoreinfo.page";

import AdminProtection from "./AdminProtection";
import Admindashpage from "./Pages/Admin/Admin-dashboard.page";
import AdminRouter from "./Components/Admin/AdminRouter";
import Managementpage from "./Pages/Admin/Management/Managment.page";
import ScheduleFlightpage from "./Pages/Admin/Management/Menus/ScheduleFlight.page";
import Farepage from "./Pages/Admin/Management/Menus/Fare.page";
import LuggagePage from "./Pages/Admin/Management/Menus/Luggage.page";
import Routepage from "./Pages/Admin/Management/Menus/Route.page";
import UnderConstruction from "./Components/Errors/UnderConstruction";
import Footer from "./Components/Footer/Footer";
import Support from "./Pages/Support/Support";
import AboutPage from "./Pages/About/About.page";
import OffersPage from "./Pages/Offers/Offers.page";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
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

        <Route path="/admin" element={<AdminProtection />}>
          <Route path="" element={<AdminRouter />} />
          <Route path="management">
            <Route path="" element={<Managementpage />} />
            <Route path="scheduleflight" element={<ScheduleFlightpage />} />
            <Route path="fare" element={<Farepage />} />
            <Route path="luggage" element={<LuggagePage />} />
            <Route path="route" element={<Routepage />} />
          </Route>
        </Route>

        <Route path="/support" element={<Support />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/hotels" element={<UnderConstruction />} />
        <Route path="/trains" element={<UnderConstruction />} />
        <Route path="/bus" element={<UnderConstruction />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
