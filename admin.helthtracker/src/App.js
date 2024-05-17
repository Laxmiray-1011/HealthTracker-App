import React from "react";
import Home from "./landingPage/Pages/Home";
import SignUp from "./landingPage/Pages/SignUp";
import Login from "./landingPage/Pages/Login";
import Dash from "./Dash";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

export default function App() {
  return (
    <div>
      {<Dash />}
      {/* <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/patient/signup" element={<SignUp />} />
        <Route exact path="/patient/login" element={<Login />} />
        <Route exact path="/patient/dash" element={<Dash />} />
      </Routes> */}
    </div>
  );
}
