import React, { useRef } from "react";
import { overleyVariant } from "../Variants/user";
import { motion } from "framer-motion";
import { btnHover, popVariant } from "../Variants/globalVariants";
import { useAppDispatch, useAppSelector } from "../customHooks/reduxTypes";
import { addReminder } from "../redux/Taskslice";
import { date as dateFN, time as timeFn } from "../redux/Taskslice";
import { addtoNotificationArr } from "../redux/NotificationSlice";
import useNotification from "../customHooks/useNotification";

interface Props {
  setShowReminder: React.Dispatch<React.SetStateAction<boolean>>;
  reminderIndex: number;
}

const Reminder = ({ setShowReminder, reminderIndex }: Props) => {
  const handleCloseReminder = () => {
    setShowReminder(false);
  };
  const { addNotificationtoDB } = useNotification();

  const { tasks } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  const DateRef = useRef<HTMLInputElement>(null!);
  return (
    <motion.div
      variants={overleyVariant}
      animate="end"
      exit="exit"
      initial="start"
      id="overley"
      key={"overley"}
    >
      <motion.section variants={popVariant} key={"reminder"} id="reminder">
        <h4 className="heading">Add a Reminder</h4>
        <input
          type="datetime-local"
          ref={DateRef}
          min={new Date().toLocaleDateString()}
        />
        <div className="btn-container">
          <motion.button
            onClick={async () => {
              handleCloseReminder();
              dispatch(
                addReminder({
                  ...tasks[reminderIndex],
                  remind: DateRef.current.value,
                })
              );

              const addedNotificationObj = {
                isRead: false,
                state: "added a reminder",
                time: `${dateFN()}-${timeFn()}`,
                content: tasks[reminderIndex].content,
              };
              const newNotification = await addNotificationtoDB(
                addedNotificationObj
              );
              const arr = newNotification.data.result.value.notification;
              dispatch(addtoNotificationArr(arr[arr.length - 1]));
            }}
            whileHover={btnHover}
            className="btn remind"
          >
            remind me
          </motion.button>

          <motion.button
            onClick={handleCloseReminder}
            whileHover={btnHover}
            className="btn cancel"
          >
            cancel
          </motion.button>
        </div>
      </motion.section>
      ;
    </motion.div>
  );
};

export default Reminder;
