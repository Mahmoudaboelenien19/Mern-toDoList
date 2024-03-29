import React, { FC } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import User from "../pages/user/User";
import Home from "../pages/Home";
import Login from "../pages/login";
import SignUp from "../pages/SignUp";
import { AnimatePresence } from "framer-motion";
import Faq from "../pages/Faq";

const NavRoutes: FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location?.pathname}>
        <Route path="/userProfile" element={<User />} />
        {/* <Route path="/setting" element={<Settings />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
};

export default NavRoutes;
