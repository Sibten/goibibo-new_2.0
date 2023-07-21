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
        <Route element={<AdminProtection />}>
          <Route path="/admin" element={<AdminRouter />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </div>
  );
}

export default App;
