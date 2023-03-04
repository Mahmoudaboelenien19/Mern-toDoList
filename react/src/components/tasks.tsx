import React from "react";
import Options from "./Options";
import Todo from "./Task";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { updateTask, tasksState, Task } from "../redux/Taskslice";

const Tasks: React.FC = () => {
  interface tasksState {
    tasks: any;
  }
  const { tasks } = useSelector((state) => (state as tasksState).tasks);
  console.log(tasks);

  return (
    <div>
      <div className="tasks-cont">
        <Options />

        <div id="tasks">
          {tasks?.map((ele: Task) => {
            return <Todo key={ele.id} {...ele} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
