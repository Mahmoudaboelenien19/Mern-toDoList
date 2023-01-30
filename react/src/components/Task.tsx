import React from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
const Task = () => {
  return (
    <div className="task">
      <p id="content">hello</p>
      <div id="time-cont">
        <span>created in </span>
        <span>time is : 10:10:10</span>
        <span>date is : 1:10:10</span>
      </div>
      <div id="btns">
        <button>
          <AiOutlineArrowUp />
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

export default Task;
