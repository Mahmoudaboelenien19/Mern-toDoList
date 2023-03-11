import { FC } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Settings } from "./../pages/settings";
import User from "../pages/User";
import Home from "../pages/Home";
import Login from "../pages/login";
import SignUp from "../pages/SignUp";
import { AnimatePresence } from "framer-motion";

const NavRoutes: FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location?.pathname}>
        <Route path="/user" element={<User />} />
        <Route path="/setting" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
};

export default NavRoutes;
