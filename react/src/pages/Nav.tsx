import { NavLink, Link } from "react-router-dom";
import React from "react";
import { IoNotifications } from "react-icons/io5";
import NavRoutes from "../widget/routes";

const Nav: React.FC = () => {
  return (
    <div>
      <nav>
        <div id="logo">
          <Link to="/">
            <span>ToDo</span>
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
      </nav>
      <NavRoutes />
    </div>
  );
};

export default Nav;
