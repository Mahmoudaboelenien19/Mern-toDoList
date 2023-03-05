import { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
    name: yup.string().min(6).max(12).required(),
    email: yup.string().email().required(),
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
      <form
        noValidate
        action=""
        id="log-in-form"
        onSubmit={handleSubmit(OnSubmit)}
      >
        <h4 className="heading">sign up</h4>{" "}
        <div id="inp">
          <input type="text" required {...register("name")} />
          <div className="mock-inp"></div>
          <span id="placeholder">username </span>
          {errors.name && (
            <small className="err">{errors?.name?.message?.toString()}</small>
          )}
        </div>
        <div id="inp">
          <input type="text" required {...register("email")} />
          <div className="mock-inp"></div>
          <span id="placeholder">email </span>
          {errors.email && (
            <small className="err">{errors?.email?.message?.toString()}</small>
          )}
        </div>
        <div id="inp">
          <input type="text" required {...register("password")} />
          <div className="mock-inp"></div>
          <span id="placeholder"> password</span>
          {errors.password && (
            <small className="err">
              {errors?.password?.message?.toString()}
            </small>
          )}
        </div>
        <div id="inp">
          <input type="text" required {...register("confirm")} />
          <div className="mock-inp"></div>
          <span id="placeholder">confirm password</span>
          {errors.confirm && (
            <small className="err">
              {errors?.confirm?.message?.toString()}
            </small>
          )}
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
          {errors.phone && (
            <small className="err">{errors?.phone?.message?.toString()}</small>
          )}
        </div>
        <button
          id="log-btn"
          onClick={async () => {
            const data = getValues();
            console.log(data);
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
        </button>
        <Link to="/login" className="link">
          log in
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
