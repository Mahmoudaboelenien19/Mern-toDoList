import React from "react";
import { overleyVariant } from "../Variants/user";
import { motion } from "framer-motion";
import { btnHover, popVariant } from "../Variants/globalVariants";

interface Props {
  setShowReminder: React.Dispatch<React.SetStateAction<boolean>>;
}

const Reminder = ({ setShowReminder }: Props) => {
  const handleCloseReminder = () => {
    setShowReminder(false);
  };
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
        <input type="datetime-local" />
        <div className="btn-container">
          <motion.button
            onClick={handleCloseReminder}
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
