import React from "react";
import { Route, Routes } from "react-router-dom";
import Hero from "../pages/hero/hero";
import "./layout.css";
const Layout = () => {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Hero />} />
      </Routes>
    </div>
  );
};

export default Layout;
