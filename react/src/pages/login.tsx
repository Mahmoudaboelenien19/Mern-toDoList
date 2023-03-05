import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { authenticateRoute } from "../../routes.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
      <form action="" id="log-in-form" onSubmit={(e) => e.preventDefault()}>
        <h4 className="heading">log in</h4>{" "}
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
        <button
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
                navigate("/");
              } else {
                toast.error(message);
              }
              console.log({ message });
            }
          }}
        >
          log in
        </button>
        <Link to="/signup" className="link">
          create new account
        </Link>
      </form>
    </div>
  );
};

export default Login;
