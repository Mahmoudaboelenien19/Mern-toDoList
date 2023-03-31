import React, { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { linkHover } from "../Variants/globalVariants";
import Cookies from "js-cookie";
import axios from "axios";
import { updateUserRoute } from "../../routes";
import { isAuthContext } from "../context/isAuthcontext";
import { opacityVariant } from "../Variants/options";
import { generateNewToken } from "../redux/Taskslice";

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

  const inpRef = useRef<HTMLInputElement | null>(null);

  const updatedata = async (obj: updateFnInterface) => {
    const userId = Cookies.get("user-id");
    const { accessToken } = await generateNewToken();

    const url = updateUserRoute(userId as string);
    return await axios.patch(url, obj, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  useEffect(() => {
    if (!isDataUpdated) return;
    setIsDataUpdated(false);
  }, [isDataUpdated]);
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
              const updatedData = { [span]: inpRef.current?.value };
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
