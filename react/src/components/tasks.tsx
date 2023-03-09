import React, { useEffect, useState } from "react";
import Options from "./Options";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../customHooks/reduxTypes";
import { getAllTodos, Task as TaskInterface } from "../redux/Taskslice";

import Task from "./Task";

const Tasks: React.FC = () => {
  const { tasks } = useAppSelector((state) => state.tasks);
  const disptch = useAppDispatch();

  const [dataShown, setDataShown] = useState(tasks);
  const [option, setOption] = useState("all");

  useEffect(() => {
    disptch(getAllTodos());
    document.title = `to do`;
  }, []);

  useEffect(() => {
    if (option === "all") {
      setDataShown(tasks);
    } else if (option === "pending") {
      setDataShown(tasks?.filter((e) => e.isCompleted === false));
    } else if (option === "completed") {
      setDataShown(tasks?.filter((e) => e.isCompleted === true));
    } else {
      setDataShown(tasks?.filter((e) => e.state === "updated"));
    }
  }, [tasks, option]);
  return (
    <motion.div
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      transition={{ stiffness: 200, type: "spring", delay: 2 }}
    >
      <AnimatePresence>
        <motion.div
          className="tasks-cont"
          animate={{ opacity: 1, transition: { duration: 1, type: "tween" } }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          {tasks.length > 0 ? (
            <>
              <Options setOption={setOption} option={option} />

              <div id="tasks">
                {dataShown.length === 0 ? (
                  <div className="no-data "> no {option} todos to show </div>
                ) : (
                  dataShown?.map((e, index) => {
                    return <Task key={e._id!} {...e} index={index} />;
                  })
                )}
              </div>
            </>
          ) : (
            <div className="no-data"> no todos to show</div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Tasks;
