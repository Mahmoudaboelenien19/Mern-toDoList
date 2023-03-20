import { useContext, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { authenticateRoute } from "../../routes.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppDispatch } from "../customHooks/reduxTypes.js";
import {
  btnFormAnimation,
  formTitle,
  formVariants,
  linkFormAnimation,
} from "../Variants/form.js";
import { btnHover, linkHover } from "../Variants/globalVariants.js";
import Input from "../components/Input.js";
import { routeExitVariant } from "../Variants/routes.js";
import { isAuthContext } from "../context/isAuthcontext.js";

const Login = () => {
  const navigate = useNavigate();

  const authData = useContext(isAuthContext);
  const { setIsAuth } = authData;

  useLayoutEffect(() => {
    document.title = "Listify | Log In";
  }, []);
  interface userInerface {
    email: string;
    password: string;
  }
  const [passInp, setPassInp] = useState("");
  const [emailInp, setEmailInp] = useState("");

  const handleEmailInp = (val: string) => setEmailInp(val);
  const handlePassInp = (val: string) => setPassInp(val);
  const authenticate = async (user: userInerface) => {
    return await axios
      .post(authenticateRoute, user, { withCredentials: true })
      .then(({ data }) => data)
      .catch((data) => console.log(data));
  };

  return (
    <motion.div variants={routeExitVariant} exit="exit">
      <motion.form
        variants={formVariants}
        initial="start"
        animate="end"
        id="log-in-form"
        style={{ overflow: "hidden" }}
        onSubmit={(e) => e.preventDefault()}
      >
        <motion.h4 variants={formTitle} className="heading">
          log in
        </motion.h4>{" "}
        <Input
          isPassword={false}
          placeholder="email"
          onChange={handleEmailInp}
        />
        <Input
          isPassword={true}
          placeholder="password"
          onChange={handlePassInp}
        />
        <motion.button
          variants={btnFormAnimation}
          whileHover={btnHover}
          id="log-btn"
          onClick={async () => {
            const email = emailInp;
            const password = passInp;

            const userData = {
              email,
              password,
            };
            if (email && password) {
              const { message, status } = await authenticate(userData);
              if (status === 200) {
                toast.success(message);
                setIsAuth(true);
                navigate("/");
              } else if (status === 404) {
                toast.error(message);
              } else {
                toast.error(message);
              }
            }
          }}
        >
          log in
        </motion.button>
        <Link to="/signup" className="link">
          <motion.span variants={linkFormAnimation} whileHover={linkHover}>
            create new account
          </motion.span>
        </Link>
      </motion.form>
    </motion.div>
  );
};

export default Login;
