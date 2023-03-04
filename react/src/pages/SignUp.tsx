import React, { useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const SignUp = () => {
  const schema = yup.object().shape({
    name: yup.string().min(6).max(12).required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(6)
      .max(20)
      .required()
      .matches(
        /[^a-zA-Z0-9]\w\d/,
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const OnSubmit = (data: FieldValues) => {
    console.log(data);
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
        <h4>sign up</h4>{" "}
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
        <div id="inp">
          <input type="text" required {...register("phone")} />
          <div className="mock-inp"></div>
          <span id="placeholder">phone</span>
          {errors.phone && (
            <small className="err">{errors?.phone?.message?.toString()}</small>
          )}
        </div>
        <button id="log-btn">sign up</button>
        <Link to="/login" className="link">
          log in
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
