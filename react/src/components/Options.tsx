import React, { useContext, useEffect, useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { ClearContext } from "../App";
import { useAppSelector } from "../customHooks/reduxTypes";
import { Task } from "../redux/Taskslice";
interface OptionsProps {
  setOption: React.Dispatch<React.SetStateAction<string>>;
  option: string;
}
const Options = ({ option, setOption }: OptionsProps) => {
  const { setShowClearPopUp } = useContext(ClearContext);

  const { tasks } = useAppSelector((state) => state.tasks);

  return (
    <div id="options">
      <div id="task-state">
        <span
          className={option === "all" ? "active" : ""}
          onClick={() => {
            setOption("all");
          }}
        >
          All ({tasks.length})
        </span>
        <span
          className={option === "pending" ? "active" : ""}
          onClick={() => {
            setOption("pending");
          }}
        >
          Pendding ({tasks?.filter((e) => e.isCompleted === false).length})
        </span>
        <span
          className={option === "completed" ? "active" : ""}
          onClick={() => {
            setOption("completed");
          }}
        >
          completed ({tasks?.filter((e) => e.isCompleted).length})
        </span>
        <span
          className={option === "updated" ? "active" : ""}
          onClick={() => {
            setOption("updated");
          }}
        >
          updated({tasks?.filter((e) => e.state === "updated").length})
        </span>
      </div>

      <AnimatePresence>
        {tasks.length >= 2 ? (
          <motion.button
            animate={{
              opacity: 1,
              background: "var(--delete)",
              transition: { delay: 0.5, duration: 1 },
            }}
            initial={{ opacity: 0, background: "black" }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            id="clear"
            whileHover={{
              scale: 1.2,
              boxShadow: "2px 2px 1px black ",
              transition: { type: "spring", stiffness: 300 },
            }}
            whileTap={{
              scale: 1.5,
            }}
            onClick={() => {
              setShowClearPopUp(true);
            }}
          >
            <AiFillDelete style={{ color: "white" }} />
            Clear All ({tasks.length})
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default Options;
