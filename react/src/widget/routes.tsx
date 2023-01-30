import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Settings } from "./../pages/settings";
import User from "../pages/User";
import Home from "../pages/Home";

const NavRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/user" element={<User />} />
      <Route path="/setting" element={<Settings />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default NavRoutes;
