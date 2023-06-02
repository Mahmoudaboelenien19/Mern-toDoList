import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { authenticateRoute } from "../../routes.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  btnFormAnimation,
  formTitle,
  formVariants,
  linkFormAnimation,
} from "../Variants/form.js";
import { btnHover, linkHover } from "../Variants/globalVariants.js";
import { routeExitVariant } from "../Variants/routes.js";
import { isAuthContext } from "../context/isAuthcontext.js";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SignUpInput from "../components/SIngUpInp.js";
import { useForm, FormProvider, FieldValues } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();

  const authData = useContext(isAuthContext);
  const { setIsAuth } = authData;
  const schema = yup.object().shape({
    email: yup.string().email("insert a valid email").required(),
    password: yup.string().required(),
  });

  const methods = useForm({ resolver: yupResolver(schema) });
  const {
    formState: { errors },
    handleSubmit,
  } = methods;
  useEffect(() => {
    document.title = "Log In";
  }, []);
  interface userInerface {
    email: string;
    password: string;
  }

  const authenticate = async (user: userInerface) => {
    return await axios
      .post(authenticateRoute, user, { withCredentials: true })
      .then(({ data }) => data)
      .catch((data) => toast.success(data.response.data.message));
  };

  const OnSubmit = async (data: FieldValues) => {
    const { message, status } = await authenticate(data as userInerface);
    if (status === 200) {
      toast.success(message);
      setIsAuth(true);
      navigate("/");
    } else if (status === 404) {
      toast.error(message);
    } else {
      toast.error(message);
    }
  };
  return (
    <motion.div variants={routeExitVariant} exit="exit" className="form-cont">
      <FormProvider {...methods}>
        <motion.form
          variants={formVariants}
          initial="start"
          animate="end"
          id="log-in-form"
          style={{ overflow: "hidden" }}
          onSubmit={handleSubmit(OnSubmit)}
        >
          <motion.h4 variants={formTitle} className="heading">
            log in
          </motion.h4>{" "}
          <SignUpInput
            isPassword={false}
            placeholder="email"
            err={errors.email?.message?.toString()}
          />
          <SignUpInput
            isPassword={true}
            placeholder="password"
            err={errors.password?.message?.toString()}
          />
          <motion.button
            variants={btnFormAnimation}
            whileHover={btnHover}
            id="log-btn"
            className="btn"
          >
            log in
          </motion.button>
          <Link to="/signup" className="link">
            <motion.span variants={linkFormAnimation} whileHover={linkHover}>
              create new account
            </motion.span>
          </Link>
        </motion.form>
      </FormProvider>
    </motion.div>
  );
};

export default Login;
