import React from "react";
import Options from "./Options";
import { motion } from "framer-motion";

const Tasks: React.FC = () => {
  interface tasksState {
    tasks: any;
  }

  return (
    <motion.div
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      transition={{ stiffness: 200, type: "spring", delay: 2 }}
    >
      <div className="tasks-cont">
        <Options />

        <div id="tasks"></div>
      </div>
    </motion.div>
  );
};

export default Tasks;
