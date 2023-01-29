import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Settings } from "./../pages/settings";
import Tasks from "../pages/tasks";
import User from "../pages/User";

const NavRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/user" element={<User />} />
      <Route path="/setting" element={<Settings />} />
      <Route path="/" element={<Tasks />} />
    </Routes>
  );
};

export default NavRoutes;
