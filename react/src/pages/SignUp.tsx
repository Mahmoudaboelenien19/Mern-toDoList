import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SignUp = () => {
  const navigate = useNavigate();
  const emailInp = useRef<HTMLInputElement>(null!);

  //get all countries
  const [countries, setCountries] = useState([
    {
      name: {
        common: "",
      },
    },
  ]);

  useEffect(() => {
    Axios.get("https://restcountries.com/v3.1/all")
      .then(({ data }) => setCountries(data))
      .catch((err) => err.message);
  }, []);

  const schema = yup.object().shape({
    username: yup.string().min(6).max(12).required(),
    email: yup.string().email().required("insert a vaild email"),
    password: yup
      .string()
      .min(6)
      .max(20)
      .required()
      .matches(
        /\w+\d+[^a-zA-Z0-9]+/,
        "password must contain at least 1 number,1 number and 1 character"
      ),
    confirm: yup
      .string()
      .oneOf([yup.ref("password")])
      .required(),
    phone: yup.string().min(10).required(),
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const OnSubmit = (data: FieldValues) => {
    console.log(data);
  };

  const createUser = async (data: FieldValues) => {
    return await Axios.post("http://localhost:3000/user", data)
      .then(({ data }) => data)
      .catch((err) => err.response.data);
  };

  useLayoutEffect(() => {
    document.title = "Sign Up";
  }, []);

  return (
    <div>
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, type: "tween" }}
        noValidate
        action=""
        id="log-in-form"
        onSubmit={handleSubmit(OnSubmit)}
      >
        <motion.h4
          transition={{ delay: 1.5, duration: 1 }}
          initial={{ fontSize: "16px" }}
          animate={{ fontSize: "20px" }}
          className="heading"
        >
          sign up
        </motion.h4>{" "}
        <div id="inp">
          <input type="text" required {...register("username")} />
          <div className="mock-inp"></div>
          <span id="placeholder">username </span>
          <AnimatePresence>
            {errors.username && (
              <motion.small
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="err"
              >
                {errors?.username?.message?.toString()}
              </motion.small>
            )}
          </AnimatePresence>
        </div>
        <div id="inp">
          <input type="text" required {...register("email")} />
          <div className="mock-inp"></div>
          <span id="placeholder">email </span>
          <AnimatePresence>
            {errors.email && (
              <motion.small
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="err"
              >
                {errors.email?.message?.toString()}
              </motion.small>
            )}
          </AnimatePresence>
        </div>
        <div id="inp">
          <input type="text" required {...register("password")} />
          <div className="mock-inp"></div>
          <span id="placeholder"> password</span>
          <AnimatePresence>
            {errors.password && (
              <motion.small
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="err"
              >
                {errors?.password?.message?.toString()}
              </motion.small>
            )}
          </AnimatePresence>
        </div>
        <div id="inp">
          <input type="text" required {...register("confirm")} />
          <div className="mock-inp"></div>
          <span id="placeholder">confirm password</span>
          <AnimatePresence>
            {errors.confirm && (
              <motion.small
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="err"
              >
                {errors?.confirm?.message?.toString()}
              </motion.small>
            )}
          </AnimatePresence>
        </div>
        <div id="radio">
          <label htmlFor="gender">Gender</label>
          <div className="radios">
            <div className="label">
              <input
                type="radio"
                {...register("gender")}
                id="male"
                value={"male"}
                checked
              />
              <label htmlFor="male">Male</label>
            </div>
            <div className="label">
              <input
                type="radio"
                {...register("gender")}
                id="female"
                value={"female"}
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
        </div>
        <select {...register("country")}>
          {countries.map((e, i) => {
            return (
              <option key={Math.random()} value={e.name.common}>
                {e.name.common}
              </option>
            );
          })}
        </select>
        <div id="inp">
          <input type="text" required {...register("phone")} />
          <div className="mock-inp"></div>
          <span id="placeholder">phone</span>
          <AnimatePresence>
            {errors.phone && (
              <motion.small
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="err"
              >
                {errors?.phone?.message?.toString()}
              </motion.small>
            )}
          </AnimatePresence>
        </div>
        <motion.button
          whileHover={{ scale: 1.2, boxShadow: "2px 2px 2px black " }}
          transition={{ type: "spring", stiffness: 300 }}
          id="log-btn"
          onClick={async () => {
            const data = getValues();
            if (isValid) {
              const { message, status } = await createUser(data);
              if (status == 200) {
                toast.success(message);
              } else {
                toast.warning(message);
              }
              navigate(`/login?email=${data.email}`);
            }
          }}
        >
          sign up
        </motion.button>
        <Link to="/login" className="link">
          <motion.span
            whileHover={{ fontSize: "18px", color: "white" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            log in
          </motion.span>
        </Link>
      </motion.form>
    </div>
  );
};

export default SignUp;
