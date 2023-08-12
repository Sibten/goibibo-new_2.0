import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/Login/Login.page";
import Homepage from "./Pages/Home/Home.page";
import Profilepage from "./Pages/Profile/Profile.page";
import Flightspage from "./Pages/FlightSearch/FlightsSearch.page";
import Pagenotfound from "./Components/Errors/Pagenotfound";
import Reviewpage from "./Pages/Review/Review.page";
import Protected from "./Protected";
import DepSeatSelectionPage from "./Pages/SeatSelection/DepSeatSelection.page";
import RtnSeatSelectionPage from "./Pages/SeatSelection/RtnSeatSelection.page";
import PaymentPage from "./Pages/Payment/Payment.page";
import Tripspage from "./Pages/Trips/Trips.page";
import TripMorepage from "./Pages/Trips/TripMoreinfo.page";
import UnderConstruction from "./Components/Errors/UnderConstruction";
import Support from "./Pages/Support/Support";
import AboutPage from "./Pages/About/About.page";
import OffersPage from "./Pages/Offers/Offers.page";
import axios from "axios";
import Skeleton from "./Skeleton";

import AdminProtection from "./AdminProtection";
import AdminHomepage from "./Admin/Pages/AdminHome.page";

axios.defaults.withCredentials = true;
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/admin" element={<Skeleton isAdmin={true} />}>
          <Route element={<AdminProtection />}>
            <Route path="" element={<AdminHomepage />} />{" "}
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
