import { motion } from "framer-motion";
import { clearAllTodos } from "../redux/Taskslice";
import { useAppDispatch } from "../customHooks/reduxTypes";
import React, { useContext } from "react";
import { ClearContext } from "../App";
import { overleyVariant } from "../Variants/user";
import { popVariant } from "../Variants/globalVariants";
import { date as dateFN, time as timeFn } from "../redux/Taskslice";
import { addtoNotificationArr } from "../redux/NotificationSlice";
import useNotification from "../customHooks/useNotification";

const ClearPopUp = () => {
  const { setShowClearPopUp } = useContext(ClearContext);
  const dispatch = useAppDispatch();
  const { addNotificationtoDB } = useNotification();

  return (
    <motion.div
      id="overley"
      variants={overleyVariant}
      animate="end"
      exit="exit"
      initial="start"
      key={"overley"}
    >
      <motion.section variants={popVariant} key={"reminder"} id="clr-pop">
        <h3>Are you sure to clear All todos ?!</h3>
        <motion.button
          className="btn btn-x cancel"
          transition={{ duration: 1 }}
          onClick={() => setShowClearPopUp(false)}
        >
          X
        </motion.button>

        <div className="btn-container">
          <motion.button
            whileHover={{ scale: 1.2, boxShadow: "2px 2px 1px rgb(0,0,0) " }}
            transition={{ type: "spring", stiffness: 300 }}
            className="btn clear"
            onClick={async () => {
              dispatch(clearAllTodos());
              setShowClearPopUp(false);
              const addedNotificationObj = {
                isRead: false,
                state: "cleared ALl todos",
                time: `${dateFN()}-${timeFn()}`,
                content: "",
              };
              const newNotification = await addNotificationtoDB(
                addedNotificationObj
              );
              const arr = newNotification.data.result.value.notification;
              dispatch(addtoNotificationArr(arr[arr.length - 1]));
            }}
          >
            clear
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.2, boxShadow: "2px 2px 1px rgb(0,0,0) " }}
            transition={{ type: "spring", stiffness: 300 }}
            className="btn cancel"
            onClick={() => setShowClearPopUp(false)}
          >
            cancel
          </motion.button>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default ClearPopUp;
