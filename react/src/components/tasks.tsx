import React, { useEffect, useRef, useState } from "react";
import Options from "./Options";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../customHooks/reduxTypes";
import { getAllTodos } from "../redux/Taskslice";

import Task from "./Task";
import {
  noDataContVariant,
  ParentVariant,
  tasksParentVariant,
} from "../Variants/task";
import { opacityVariant } from "../Variants/options";

const Tasks = () => {
  const { tasks, isChanged } = useAppSelector((state) => state.tasks);
  const disptch = useAppDispatch();
  const [dataShown, setDataShown] = useState(tasks);
  const [option, setOption] = useState("all");

  const optionsArr = ["completed", "pending", "updated"];
  useEffect(() => {
    disptch(getAllTodos());
    document.title = `Listify`;
  }, []);

  useEffect(() => {
    if (option === "updated") {
      setDataShown(tasks?.filter((e) => e.state === "updated"));
    } else if (option === "pending") {
      setDataShown(tasks?.filter((e) => e.isCompleted === false));
    } else if (option === "completed") {
      setDataShown(tasks?.filter((e) => e.isCompleted === true));
    } else {
      setDataShown(tasks);
    }
  }, [isChanged, option]);

  const taskCont = useRef<HTMLDivElement>(null!);
  const [taskContHeight, setTaskContHeight] = useState(
    taskCont.current?.offsetHeight
  );

  //todo why height not update

  useEffect(() => {
    setTaskContHeight(taskCont.current?.offsetHeight);
  }, [isChanged]);
  // console.log({ taskContHeight });

  return (
    <AnimatePresence mode="wait">
      {tasks.length > 0 ? (
        <motion.div
          ref={taskCont}
          key="task-container"
          className="tasks-cont"
          variants={tasksParentVariant}
          initial="start"
          animate="end"
          exit="exit"
        >
          <Options setOption={setOption} option={option} />

          {dataShown.length === 0 ? (
            <AnimatePresence mode="wait">
              {optionsArr.map((opt, index) => {
                if (option === opt) {
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, height: taskContHeight }}
                      animate={{
                        opacity: 1,
                        transition: { delay: 0.2, duration: 0.4 },
                      }}
                      className="no-data "
                      exit={{ opacity: 0 }}
                    >
                      no {opt} todos to show
                    </motion.div>
                  );
                }
              })}
            </AnimatePresence>
          ) : (
            <motion.div id="tasks" variants={ParentVariant} key="tasks-id">
              {dataShown?.map((task, index) => {
                return (
                  <motion.div key={task._id} variants={opacityVariant}>
                    <Task key={task._id} {...task} index={index} />
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </motion.div>
      ) : (
        <motion.div
          key={"no-data"}
          variants={noDataContVariant}
          initial="start"
          animate="end"
          exit="exit"
          className="no-data"
        >
          <motion.span
            variants={opacityVariant}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            {" "}
            no Todos to show
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Tasks;
