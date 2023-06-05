import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { linkHover } from "../../Variants/globalVariants";
import Cookies from "js-cookie";
import axios from "axios";
import { updateUserRoute } from "../../../routes";
import { opacityVariant } from "../../Variants/options";
import { generateNewToken } from "../../redux/Taskslice";
import { useForm, FieldValues } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

interface Props {
  span: string;
  value: string;
  setUserData: React.Dispatch<
    React.SetStateAction<{
      phone: string;
      username: string;
    }>
  >;
}

interface updateFnInterface {
  username?: string;
  email?: string;
  password?: string;
  phone?: string;
}

const UpdateUser = ({ span, value, setUserData }: Props) => {
  const [updateCLicked, setUpdateCLicked] = useState(false);

  const updatedata = async (obj: updateFnInterface) => {
    const userId = Cookies.get("user-id");
    const { accessToken } = await generateNewToken();

    const url = updateUserRoute(userId as string);
    return await axios.patch(url, obj, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  const schema: { [key: string]: any } = {
    username: yup.object().shape({
      username: yup.string().min(6).max(12).required("insert a name"),
    }),
    phone: yup.object().shape({
      phone: yup
        .string()
        .min(6)
        .max(16, "you can't exceed 16 number")
        .required("insert a phone number"),
    }),
    //i write these unnessery valiations as i get errs in console
    country: yup.object().shape({
      country: yup.string().notRequired(),
    }),
    gender: yup.object().shape({
      gender: yup.string().notRequired(),
    }),
    password: yup.object().shape({
      password: yup.string().notRequired(),
    }),
    email: yup.object().shape({
      email: yup.string().notRequired(),
    }),
  };

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema[span]),
  });

  const { [span]: inpSpanValue } = watch();
  const OnSubmit = async (data: FieldValues) => {
    if (inpSpanValue !== value) {
      const { data: msg } = await updatedata({ [span]: inpSpanValue });
      setUserData((cur) => ({ ...cur, [span]: inpSpanValue }));
      toast.success(msg.message);
    }
  };

  const check =
    span === "gender" ||
    span === "country" ||
    span === "email" ||
    span === "password";

  return (
    <>
      <form
        onSubmit={handleSubmit(OnSubmit)}
        style={{ height: "40px", margin: 0, padding: 0 }}
      >
        <div className="detail-parent">
          <span className="span detail">{span}</span>
          <AnimatePresence mode="wait">
            {!updateCLicked ? (
              <motion.span
                variants={opacityVariant}
                initial="start"
                animate="end"
                exit="exit"
                transition={{ duration: 1 }}
                className="span value"
              >
                {value}
              </motion.span>
            ) : (
              <>
                <AnimatePresence mode="wait">
                  {(errors as { [key: string]: any })[
                    span
                  ]?.message.toString() && (
                    <motion.small
                      exit={{ opacity: 0 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="err"
                    >
                      {(errors as { [key: string]: any })[
                        span
                      ]?.message.toString()}
                    </motion.small>
                  )}
                </AnimatePresence>
                <motion.input
                  {...register(span)}
                  key={"update-input "}
                  variants={opacityVariant}
                  initial="start"
                  animate="end"
                  exit="exit"
                  transition={{ duration: 1 }}
                  className="update-inp value "
                  type={`${span === "phone" ? "number" : "text"}`}
                  defaultValue={value}
                />
              </>
            )}
          </AnimatePresence>
          {}
          <motion.button
            whileHover={check ? "" : linkHover}
            className="btn"
            style={{
              marginRight: 10,
              opacity: check ? 0.4 : 1,
            }}
            disabled={check ? true : false}
            onClick={() => {
              setUpdateCLicked(true);
              if (updateCLicked && isValid) {
                const updatedData = { [span]: inpSpanValue };
                updatedata(updatedData);
                setUpdateCLicked(false);
              }
            }}
          >
            update
          </motion.button>

          <AnimatePresence mode="wait">
            {updateCLicked && (
              <motion.button
                whileHover={linkHover}
                variants={opacityVariant}
                initial="start"
                animate="end"
                exit="exit"
                transition={{ delay: 1, duration: 1 }}
                className="btn"
                onClick={() => setUpdateCLicked(false)}
                key={"update-btn"}
              >
                cancel
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </form>

      <span id=" hr"></span>
    </>
  );
};

export default UpdateUser;
