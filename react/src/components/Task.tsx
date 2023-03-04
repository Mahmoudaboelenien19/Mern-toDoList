import React, { useContext } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { updateTask } from "../redux/Taskslice";
import { inpContext } from "../context/inpContext";

interface Prop {
  task: string;
  date: string;
  time: string;
  isChecked: boolean;
  state: string;
}

const Todo: React.FC<Prop> = ({ task, date, time, isChecked, state }) => {
  const focus = useContext(inpContext);
  const { setIsInpFocus } = focus;
  return (
    <div className="task">
      <p id="content">{task}</p>
      <div id="time-cont">
        <span>{state} in </span>
        <span>{time}</span>
        <span> && </span>
        <span>{date}</span>
      </div>
      <div id="btns">
        <button>
          <AiOutlineArrowUp
            onClick={() => {
              setIsInpFocus(true);
            }}
          />
        </button>
        <button>
          <IoCheckmarkDoneOutline />
        </button>
        <button>
          <MdDeleteOutline />
        </button>
      </div>
    </div>
  );
};

export default Todo;
