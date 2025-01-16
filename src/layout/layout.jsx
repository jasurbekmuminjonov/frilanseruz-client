import React from "react";
import { Route, Routes } from "react-router-dom";
import Hero from "../pages/hero/hero";
import "./layout.css";
import Edit from "../pages/edit/edit";
import Profile from "../pages/profile/profile";
const Layout = () => {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/:id" element={<Profile />} />

      </Routes>
    </div>
  );
};

export default Layout;
