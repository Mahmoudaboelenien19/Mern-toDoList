import React from "react";
import Options from "./Options";
import Task from "./Task";

const Tasks: React.FC = () => {
  return (
    <div>
      <div className="tasks-cont">
        <Options />

        <div id="tasks">
          <Task />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
