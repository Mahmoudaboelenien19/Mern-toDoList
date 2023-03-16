import { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { routeExitVariant } from "../Variants/routes";
import {
  btnFormAnimation,
  formTitle,
  formVariants,
  // inputParentAnimation,
  linkFormAnimation,
} from "../Variants/form";
import SignUpInput from "../components/SIngUpInp";
import { btnHover, linkHover } from "../Variants/globalVariants";
import { opacityVariant } from "../Variants/options";

const SignUp = () => {
  const navigate = useNavigate();

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

  const methods = useForm({ resolver: yupResolver(schema) });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = methods;

  const OnSubmit = (data: FieldValues) => {
    console.log(data);
    console.log({ data });
  };

  const createUser = async (data: FieldValues) => {
    return await Axios.post("http://localhost:3000/user", data)
      .then(({ data }) => data)
      .catch((err) => err.response.data);
  };

  useLayoutEffect(() => {
    document.title = "Listify | Sign Up";
  }, []);

  return (
    <motion.div variants={routeExitVariant} exit="exit">
      <FormProvider {...methods}>
        <motion.form
          variants={formVariants}
          animate="end"
          initial="start"
          action=""
          id="log-in-form"
          style={{ overflow: "hidden" }}
          onSubmit={handleSubmit(OnSubmit)}
        >
          <motion.h4 variants={formTitle} className="heading">
            {" "}
            sign up
          </motion.h4>

          <SignUpInput
            isPassword={false}
            placeholder="username"
            err={errors.username?.message?.toString()}
          />

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
          <SignUpInput
            isPassword={true}
            placeholder="confirm"
            err={errors.confirm?.message?.toString()}
          />

          {/* gender */}
          <motion.div
            id="radio"
            variants={opacityVariant}
            transition={{ delay: 0.5, duration: 0.2 }}
          >
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
          </motion.div>

          <motion.div
            variants={opacityVariant}
            transition={{ delay: 0.5, duration: 0.2 }}
            className="inp"
          >
            <motion.select {...register("country")}>
              {countries.map((e, i) => {
                return (
                  <option key={Math.random()} value={e.name.common}>
                    {e.name.common}
                  </option>
                );
              })}
            </motion.select>
          </motion.div>

          <SignUpInput
            isPassword={false}
            placeholder="phone"
            err={errors.phone?.message?.toString()}
          />

          <motion.button
            variants={btnFormAnimation}
            whileHover={btnHover}
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
            <motion.span variants={linkFormAnimation} whileHover={linkHover}>
              log in
            </motion.span>
          </Link>
        </motion.form>
      </FormProvider>
    </motion.div>
  );
};

export default SignUp;
