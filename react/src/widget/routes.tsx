import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Settings } from "./../pages/settings";
import User from "../pages/User";
import Home from "../pages/Home";
import Login from "../pages/login";
import SignUp from "../pages/SignUp";

const NavRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/user" element={<User />} />
      <Route path="/setting" element={<Settings />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default NavRoutes;
