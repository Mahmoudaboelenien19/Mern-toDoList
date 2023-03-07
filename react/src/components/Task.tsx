import React, { useContext } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { inpContext } from "../context/inpContext";
import { motion, useIsPresent } from "framer-motion";
import { useAppDispatch } from "../customHooks/reduxTypes";
import { checkTodo, deleteTodo } from "../redux/Taskslice";

interface Prop {
  _id?: string;
  content: string;
  date: string;
  time: string;
  isCompleted: boolean;
  state: string;
  index: number;
}

const Todo: React.FC<Prop> = ({
  _id,
  content,
  date,
  time,
  state,
  isCompleted,
  index,
}) => {
  const taskVariants = {
    hidden: {
      opacity: 0,
    },
    visible: (index: number) => ({
      opacity: 1,
      transition: {
        delay: 2 + 0.4 * index,
      },
    }),
  };

  const focus = useContext(inpContext);
  const { setIsInpFocus, setInpValue, setUpdatedTaskId, setMode } = focus;

  const dispatch = useAppDispatch();
  const isPresent = useIsPresent();

  return (
    <motion.div
      style={{ position: isPresent ? "static" : "absolute" }}
      whileHover={{ x: 10, scale: 1.02, boxShadow: "1px 1px 1.5px grey " }}
      // transition={{ type: "spring", stiffness: 300 }}
      variants={taskVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      // exit={{ opacity: 0 }}
      className="task"
    >
      <p id="content" className={isCompleted ? "checked" : ""}>
        {content}
      </p>
      <div id="time-cont">
        <span>{state} in </span>
        <span>{time}</span>
        <span> && </span>
        <span>{date}</span>
      </div>
      <div id="btns">
        <motion.button
          whileHover={{ scale: 1.2, boxShadow: "1px 1px .5px black " }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <AiOutlineArrowUp
            onClick={() => {
              setIsInpFocus(true);
              setInpValue(content);
              setUpdatedTaskId(_id!);
              setMode("update");
            }}
          />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.2, boxShadow: "1px 1px .5px black " }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={() =>
            dispatch(checkTodo({ id: _id!, isChecked: !isCompleted, content }))
          }
        >
          <IoCheckmarkDoneOutline />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.2, boxShadow: "1px 1px .5px black " }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={() => dispatch(deleteTodo(_id!))}
        >
          <MdDeleteOutline />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Todo;
