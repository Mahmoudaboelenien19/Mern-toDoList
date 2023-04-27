import React, { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { linkHover } from "../../Variants/globalVariants";
import Cookies from "js-cookie";
import axios from "axios";
import { updateUserRoute } from "../../../routes";
import { isAuthContext } from "../../context/isAuthcontext";
import { opacityVariant } from "../../Variants/options";
import { generateNewToken } from "../../redux/Taskslice";
import { FormProvider, useForm, FieldValues } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/Input";
import SignUpInput from "../../components/SIngUpInp";
import { toast } from "react-toastify";

interface Props {
  span: string;
  value: string;
}

interface updateFnInterface {
  username?: string;
  email?: string;
  password?: string;
  phone?: string;
}

const UpdateUser = ({ span, value }: Props) => {
  const { setIsDataUpdated, isDataUpdated } = useContext(isAuthContext);
  const [updateCLicked, setUpdateCLicked] = useState(false);
  // const inpRef = useRef<HTMLInputElement | null>(null);

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
  };

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema[span]) });

  const { [span]: inpSpanValue } = watch();
  const OnSubmit = async (data: FieldValues) => {
    if (inpSpanValue !== value) {
      const { data: msg } = await updatedata({ [span]: inpSpanValue });
      toast.success(msg.message);
    }
  };

  useEffect(() => {
    if (!isDataUpdated) return;
    setIsDataUpdated(false);
  }, [isDataUpdated]);

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
                  // ref={inpRef}
                  className="update-inp value "
                  type={`${span === "phone" ? "number" : "text"}`}
                  defaultValue={value}
                />
              </>
            )}
          </AnimatePresence>
          {}
          <motion.button
            whileHover={
              span === "gender" || span === "country" || span === "email"
                ? ""
                : linkHover
            }
            className="btn"
            style={{
              marginRight: 10,
              opacity:
                span === "gender" || span === "country" || span === "email"
                  ? 0.4
                  : 1,
            }}
            disabled={
              span === "gender" || span === "country" || span === "email"
                ? true
                : false
            }
            onClick={() => {
              setUpdateCLicked(true);
              if (updateCLicked && isValid) {
                const updatedData = { [span]: inpSpanValue };
                updatedata(updatedData);
                setUpdateCLicked(false);
                setIsDataUpdated(true);
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
