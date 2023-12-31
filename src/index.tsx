import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import store from "./store";
import { fetchUser } from "./Actions/User.action";
import Cookies from "js-cookie";
import { fetchAirports } from "./Actions/Airport.action";
import { fetchOffers } from "./Actions/Offers.action";
import { fetchAddons } from "./Actions/Addon.action";
import { fetchTrips } from "./Actions/Trip.action";

store.subscribe(() => console.log(store.getState()));

store.dispatch(fetchAirports());
store.dispatch(fetchOffers());
store.dispatch(fetchAddons());

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(//  console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
