// import  { useEffect, useRef, useState } from "react";
// import Options from "./Options";
// import { AnimatePresence, motion } from "framer-motion";
// import { useAppDispatch, useAppSelector } from "../customHooks/reduxTypes";
// import { getAllTodos } from "../redux/Taskslice";

// import Task from "./Task";
// import { noDataContVariant, tasksParentVariant } from "../Variants/task";

// // const Tasks: React.FC = () => {

//   // useEffect(() => {
//   //   disptch(getAllTodos());
//   //   document.title = `Listify`;
//   // }, []);

//   // useEffect(() => {
//   //   if (option === "all") {
//   //     setDataShown(tasks);
//   //   } else if (option === "pending") {
//   //     setDataShown(tasks?.filter((e) => e.isCompleted === false));
//   //   } else if (option === "completed") {
//   //     setDataShown(tasks?.filter((e) => e.isCompleted === true));
//   //   } else {
//   //     setDataShown(tasks?.filter((e) => e.state === "updated"));
//   //   }
//   // }, [isChanged, option]);

// //   return (
// //     <AnimatePresence>

// //       {tasks.length > 0 ? (
// //         <motion.div
// //           key="task-container"
// //           className="tasks-cont"
// //           variants={tasksParentVariant}
// //           initial="start"
// //           animate="end"
// //           exit="exit"

// //           // initial={{ opacity: 0 }}
// //           // animate={{
// //           //   opacity: 1,
// //           // }}
// //           // transition={{
// //           //   type: "tween",
// //           //   duration: 1,
// //           //   delay: 1.5,
// //           //   when: "beforeChildren",
// //           // }}
// //           // exit={{
// //           //   height: 0,
// //           //   overflow: "hidden",
// //           //   transition: { height: { delay: 3 }, overflow: { delay: 0 } },
// //           // }}
// //         >
// //           <Options setOption={setOption} option={option} />

// //           <>
// //             {dataShown.length === 0 ? (
// //               <>
// //                 <AnimatePresence mode="wait">
// //                   {optionsArr.map((opt, index) => {
// //                     if (option === opt) {
// //                       return (
// //                         <motion.div
// //                           key={index}
// //                           initial={{ opacity: 0 }}
// //                           animate={{
// //                             opacity: 1,
// //                             transition: { delay: 0.2, duration: 0.4 },
// //                           }}
// //                           className="no-data "
// //                           exit={{ opacity: 0 }}
// //                         >
// //                           no {opt} todos to show
// //                         </motion.div>
// //                       );
// //                     }
// //                   })}
// //                 </AnimatePresence>
// //               </>
// //             ) : (
// //               <></>
// //               // <div id="tasks">
// //               //   {dataShown?.map((task, index) => {
// //               //     return <Task key={task._id!} {...task} index={index} />;
// //               //   })}
// //               // </div>
// //             )}
// //           </>
// //         </motion.div>
// //       ) : (
// //         <motion.div
// //           key={"no-data"}
// //           // variants={noDataContVariant}
// //           initial={{ opacity: 0 }}
// //           animate={{
// //             opacity: 1,
// //           }}
// //           transition={{ delay: 2, duration: 1 }}
// //           exit={{ height: 0, transition: { delay: 0.5, duration: 1 } }}
// //           // initial="start"
// //           // animate="end"
// //           // exit="exit"
// //           className="no-data"
// //         >
// //           <motion.span
// //             initial={{ opacity: 0, scale: 1 }}
// //             animate={{
// //               opacity: 1,
// //               scale: 1.2,
// //               transition: {
// //                 delay: 2.5,
// //                 duration: 1,
// //               },
// //             }}
// //             exit={{
// //               opacity: 0,
// //               scale: 1,
// //               transition: {
// //                 duration: 0.5,
// //               },
// //             }}
// //           >
// //             No todos to show
// //           </motion.span>
// //         </motion.div>
// //       )}
// //     </AnimatePresence>
// //   );
// // };

// // export default Tasks;

// import React from 'react'

// const Tasks = () => {

//   const { tasks, isChanged } = useAppSelector((state) => state.tasks);
//   const disptch = useAppDispatch();
//   const [dataShown, setDataShown] = useState(tasks);
//   const [option, setOption] = useState("all");

//   const optionsArr = ["completed", "pending", "updated"];
//   return (

//     <>

//                 {dataShown.length === 0 ? (
//                   <>
//                     <AnimatePresence mode="wait">
//                       {optionsArr.map((opt, index) => {
//                         if (option === opt) {
//                           return (
//                             <motion.div
//                               key={index}
//                               initial={{ opacity: 0 }}
//                               animate={{
//                                 opacity: 1,
//                                 transition: { delay: 0.2, duration: 0.4 },
//                               }}
//                               className="no-data "
//                               exit={{ opacity: 0 }}
//                             >
//                               no {opt} todos to show
//                             </motion.div>
//                           );
//                         }
//                       })}
//                     </AnimatePresence>
//                   </>
//                 ) : (

//                   <div id="tasks">
//                     {dataShown?.map((task, index) => {
//                       return <Task key={task._id!} {...task} index={index} />;
//                     })}
//                   </div>
//                 )}
//               </>

//    )}

// export default Tasks

import React from "react";

const tasks = () => {
  return <div>tasks</div>;
};

export default tasks;
