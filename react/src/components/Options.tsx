import React from "react";
import { AiFillDelete } from "react-icons/ai";
const Options: React.FC = () => {
  return (
    <div id="options">
      <div id="task-state">
        <span className="active">All</span>
        <span>Padding</span>
        <span>completed</span>
        <span>updated</span>
      </div>
      <button id="clear">
        <AiFillDelete style={{ color: "white" }} />
        Clear All
      </button>
    </div>
  );
};

export default Options;
