import React, { useContext, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { linkHover } from "../Variants/globalVariants";
import Cookies from "js-cookie";
import axios from "axios";
import { updateUserRoute } from "../../routes";
import { useAppSelector } from "../customHooks/reduxTypes";
import { isAuthContext } from "../context/isAuthcontext";
import { opacityVariant } from "../Variants/options";

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
  const { setIsDataUpdated } = useContext(isAuthContext);
  const [updateCLicked, setUpdateCLicked] = useState(false);

  const inpRef = useRef<HTMLInputElement>(null!);
  const updatedata = async (obj: updateFnInterface) => {
    const userId = Cookies.get("user-id");
    return await axios.patch(updateUserRoute(userId as string), obj);
  };

  //todo make setupdate in isauth to refetch and set it here
  return (
    <>
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
            <motion.input
              key={"update-input"}
              variants={opacityVariant}
              initial="start"
              animate="end"
              exit="exit"
              transition={{ duration: 1 }}
              ref={inpRef}
              className="value update-inp "
              defaultValue={value}
            />
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
            if (updateCLicked) {
              const updatedData = { [span]: inpRef.current.value };
              console.log(updatedData);
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

      <span className=" hr"></span>
    </>
  );
};

export default UpdateUser;
