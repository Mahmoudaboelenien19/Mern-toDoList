import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import ClearPopUp from "./ClearPopUp";

const Options: React.FC = () => {
  const [showClearPopUp, setShowClearPopUp] = useState(false);
  return (
    <div id="options">
      <div id="task-state">
        <span className="active">All</span>
        <span>Padding</span>
        <span>completed</span>
        <span>updated</span>
      </div>
      <motion.button
        id="clear"
        whileHover={{ scale: 1.2, boxShadow: "2px 2px 1px black " }}
        transition={{ type: "spring", stiffness: 300 }}
        onClick={() => {
          setShowClearPopUp(true);
        }}
      >
        <AiFillDelete style={{ color: "white" }} />
        Clear All
      </motion.button>
      <AnimatePresence>
        {showClearPopUp && <ClearPopUp setShowClearPopUp={setShowClearPopUp} />}
      </AnimatePresence>
    </div>
  );
};

export default Options;
