import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { authenticateRoute } from "../../routes.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null!);
  const passRef = useRef<HTMLInputElement>(null!);

  const email = new URLSearchParams(location.search).get("email") || "";

  useLayoutEffect(() => {
    document.title = "Log In";
  }, []);

  interface userInerface {
    email: string;
    password: string;
  }

  const authenticate = async (user: userInerface) => {
    return await axios
      .post(authenticateRoute, user)
      .then(({ data }) => data)
      .catch(({ response: { data } }) => data);
  };

  return (
    <div>
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, type: "tween" }}
        action=""
        id="log-in-form"
        onSubmit={(e) => e.preventDefault()}
      >
        <motion.h4
          transition={{ delay: 1.5, duration: 1 }}
          initial={{ fontSize: "16px" }}
          animate={{ fontSize: "20px" }}
          className="heading"
        >
          log in
        </motion.h4>{" "}
        <div id="inp">
          <input type="text" required defaultValue={email} ref={emailRef} />
          <div className="mock-inp"></div>
          <span id="placeholder"> log in </span>
        </div>
        <div id="inp">
          <input type="password" required ref={passRef} />
          <div className="mock-inp"></div>
          <span id="placeholder"> password</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.2, boxShadow: "2px 2px 2px black " }}
          transition={{ type: "spring", stiffness: 300 }}
          id="log-btn"
          onClick={async () => {
            const email = emailRef.current.value;
            const password = passRef.current.value;

            const userData = {
              email,
              password,
            };
            if (email && password) {
              const { message, status } = await authenticate(userData);
              if (status === 200) {
                toast.success(message);
                navigate("/git ad");
              } else {
                toast.error(message);
              }
            }
          }}
        >
          log in
        </motion.button>
        <Link to="/signup" className="link">
          <motion.span
            whileHover={{ fontSize: "18px", color: "white" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            create new account
          </motion.span>
        </Link>
      </motion.form>
    </div>
  );
};

export default Login;
