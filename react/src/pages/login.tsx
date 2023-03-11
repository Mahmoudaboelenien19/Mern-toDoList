import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { authenticateRoute } from "../../routes.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useAppDispatch } from "../customHooks/reduxTypes.js";
import { handleAuth } from "../redux/isAuthSlice.js";
import { BsFillEyeFill } from "react-icons/bs";
import usePassword from "../customHooks/usePassword.js";
import useInp from "../customHooks/useInp.js";
import useReset from "../customHooks/useResetInp.js";
import {
  btnFormAnimation,
  formTitle,
  formVariants,
  hidePasswordVariant,
  inputParentAnimation,
  inpVariant,
  linkFormAnimation,
  placeholderVariant,
  ResetSpanVariant,
  xSpanVariant,
} from "../Variants/form.js";
import { btnHover, linkHover } from "../Variants/globalVariants.js";

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null!);
  const passRef = useRef<HTMLInputElement>(null!);
  const email = new URLSearchParams(location.search).get("email") || "";
  const [isFocus, handleUnfocus, handleOnFocus, handleOnBlur] = useInp();
  const [
    showResetPassSpan,
    setShowResetPass,
    handlePassReset,
    isResetSpanCLicked,
    handleIsResetCLicked,
  ] = useReset();
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    document.title = "Listify | Log In";
  }, []);

  const [showPass, handleShowPass] = usePassword();

  interface userInerface {
    email: string;
    password: string;
  }

  console.log({ isFocus });
  const authenticate = async (user: userInerface) => {
    return await axios
      .post(authenticateRoute, user, { withCredentials: true })
      .then(({ data }) => data)
      .catch((data) => console.log(data));
  };

  return (
    <motion.div exit={{ opacity: 0, x: -100, transition: { duration: 0.4 } }}>
      <motion.form
        variants={formVariants}
        initial="start"
        animate="end"
        id="log-in-form"
        onSubmit={(e) => e.preventDefault()}
      >
        <motion.h4 variants={formTitle} className="heading">
          log in
        </motion.h4>{" "}
        <motion.div id="inp" variants={inputParentAnimation}>
          <input type="text" required defaultValue={email} ref={emailRef} />
          <div className="mock-inp"></div>
          <span id="placeholder"> email </span>
        </motion.div>
        <motion.div id="inp" variants={inputParentAnimation}>
          <motion.input
            type={showPass ? "password" : "text"}
            required
            ref={passRef}
            onFocus={() => {
              handleOnFocus();
            }}
            onBlur={(e) => {
              handleOnBlur(e.target.value);
            }}
            onChange={(e) => {
              if (e.target.value.length >= 1) {
                setShowResetPass(true);
              } else {
                setShowResetPass(false);
              }
            }}
          />

          <motion.div
            className="mock-inp"
            custom={{ isFocus, isResetSpanCLicked }}
            variants={inpVariant}
            animate="end"
            initial="start"
          >
            <AnimatePresence>
              {showResetPassSpan && (
                <motion.span
                  className="reset"
                  variants={ResetSpanVariant}
                  animate="end"
                  initial="start"
                  exit="exit"
                  onClick={() => {
                    handlePassReset(passRef);
                    handleUnfocus();
                    setShowResetPass(false);
                    handleIsResetCLicked();
                  }}
                >
                  <motion.span variants={xSpanVariant}>X</motion.span>
                </motion.span>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showResetPassSpan && (
                <motion.span className="eye" variants={hidePasswordVariant}>
                  <BsFillEyeFill onClick={handleShowPass} />
                </motion.span>
              )}
            </AnimatePresence>
            <motion.span
              variants={placeholderVariant}
              custom={isFocus}
              id="placeholder"
            >
              {" "}
              password
            </motion.span>
          </motion.div>
        </motion.div>
        <motion.button
          variants={btnFormAnimation}
          whileHover={btnHover}
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
                dispatch(handleAuth(true));
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
