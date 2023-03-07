import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { motion } from "framer-motion";
import { useAppDispatch } from "../customHooks/reduxTypes";
import { clearAllTodos } from "../redux/Taskslice";

const Options: React.FC = () => {
  const dispatch = useAppDispatch();
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
        onClick={() => dispatch(clearAllTodos())}
      >
        <AiFillDelete style={{ color: "white" }} />
        Clear All
      </motion.button>
    </div>
  );
};

export default Options;
