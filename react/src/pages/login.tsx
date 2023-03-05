import React, { useLayoutEffect } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const email = new URLSearchParams(location.search).get("email") || "";

  useLayoutEffect(() => {
    document.title = "Log In";
  }, []);

  return (
    <div>
      <form action="" id="log-in-form">
        <h4 className="heading">log in</h4>{" "}
        <div id="inp">
          <input type="text" required defaultValue={email} />
          <div className="mock-inp"></div>
          <span id="placeholder"> log in </span>
        </div>
        <div id="inp">
          <input type="password" required />
          <div className="mock-inp"></div>
          <span id="placeholder"> password</span>
        </div>
        <button id="log-btn">log in</button>
        <Link to="/signup" className="link">
          create new account
        </Link>
      </form>
    </div>
  );
};

export default Login;
