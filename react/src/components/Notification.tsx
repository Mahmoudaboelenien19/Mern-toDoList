import React from "react";
import { motion } from "framer-motion";
import { dropDownVariant } from "../Variants/nav";
const Notification = () => {
  return (
    <motion.div
      key={"notification"}
      className="dropdown notification"
      variants={dropDownVariant}
      initial="start"
      exit="exit"
      animate="end"
    >
      <span className="nodata">no reminders to show</span>
    </motion.div>
  );
};

export default Notification;
