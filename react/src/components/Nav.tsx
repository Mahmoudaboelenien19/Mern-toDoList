import { NavLink, Link } from "react-router-dom";
import React from "react";
import { IoNotifications } from "react-icons/io5";
import NavRoutes from "../widget/routes";
import { motion } from "framer-motion";

const Nav: React.FC = () => {
  return (
    <div>
      <motion.nav
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <div id="logo">
          <Link to="/">
            <svg
              width="12"
              height="15"
              viewBox="0 0 12 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1, duration: 1, ease: "easeInOut" }}
                d="M11.4318 0.96V3.7H7.7118V15H4.2918V3.7H0.571797V0.96H11.4318Z"
                fill="none"
                stroke={"white"}
              />
            </svg>
          </Link>
        </div>

        <div id="links">
          <NavLink to="/">tasks</NavLink>
          <NavLink to="/user">user</NavLink>
          <NavLink to="/setting">setting</NavLink>
        </div>

        <div id="login-state">
          <Link to="" id="user">
            {" "}
            guest
          </Link>

          <Link className="btn-state" to="/login">
            log in
          </Link>
          <IoNotifications size={20} color={"gray"} />
        </div>
      </motion.nav>
      <NavRoutes />
    </div>
  );
};

export default Nav;
