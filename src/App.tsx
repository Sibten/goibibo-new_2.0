import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./Components/Header/Header.components";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/Login/Login.page";
import Homepage from "./Pages/Home/Home.page";
import Profilepage from "./Pages/Profile/Profile.page";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/flight" element={<Homepage />} />
        <Route path="/profile" element={<Profilepage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
