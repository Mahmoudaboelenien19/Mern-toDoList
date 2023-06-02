import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { inpContext } from "../context/inpContext";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useAppDispatch } from "../customHooks/reduxTypes";
import { checkTodo, deleteTodo } from "../redux/Taskslice";
import { toastContext } from "../pages/Home";
import { singletaskVariants } from "../Variants/task";
import { AiOutlineClockCircle } from "react-icons/ai";
import Reminder from "./Reminder";
import { taskbtnHover } from "../Variants/globalVariants";
import { GiRingingBell } from "react-icons/gi";
import useTimeDiff from "../customHooks/useTimeDiff";
import useNotification from "../customHooks/useNotification";
import { addtoNotificationArr } from "../redux/NotificationSlice";
import { date as dateFN, time as timeFn } from "../redux/Taskslice";
import { ReactSVG } from "react-svg";
import deleteSvg from "../assets/svgs/DeleteSvg.svg";
interface Prop {
  _id?: string;
  content: string;
  date: string;
  time: string;
  isCompleted: boolean;
  state: string;
  index: number;
  remind: string;
}

const Task: React.FC<Prop> = ({
  _id,
  content,
  date,
  time,
  state,
  isCompleted,
  index,
  remind,
}) => {
  const { addNotificationtoDB } = useNotification();

  const dispatch = useAppDispatch();

  const states = ["created", "updated", "checked", "unchecked"];
  const [days, hours, minutes, seconds] = useTimeDiff(remind);

  const { setShowToast } = useContext(toastContext);

  const [isDeleted, setIsDeleted] = useState(false);
  const [reminderIndex, setReminderIndex] = useState(-1);
  const [isChecked, setIsChecked] = useState(false);

  const contentRef = useRef<HTMLElement | null>(null);
  const [lineWidth, setLineWidth] = useState(contentRef?.current?.offsetWidth);
  const focus = useContext(inpContext);
  const {
    setIsInpFocus,
    setUpdatedValue,
    setUpdatedTaskId,
    setMode,
    isUpdated,
    setIsUpdated,
  } = focus;

  useEffect(() => {
    if (!isUpdated) return;
    const timer = setTimeout(() => {
      setIsUpdated(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [isUpdated]);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setLineWidth(contentRef?.current?.offsetWidth);
    }, 100);
    if (!isChecked) return;
    const timer = setTimeout(() => {
      setIsChecked(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer1);
    };
  }, [isChecked]);

  //controll animation
  const controls = useAnimation();
  useEffect(() => {
    controls.set("start");
    controls.start("end");
  }, []);

  const [showReminder, setShowReminder] = useState(false);
  const Bellcontrols = useAnimation();

  return (
    <>
      {!isDeleted && (
        <motion.div
          className="task"
          key={_id}
          whileHover={{
            x: 10,
            scale: 1.02,
            boxShadow: "1px 1px 1.5px grey ",
          }}
          variants={singletaskVariants}
          animate={controls}
          onAnimationComplete={() => {
            Bellcontrols.set("start");

            Bellcontrols.start("end");
          }}
        >
          <AnimatePresence mode="wait">
            {states.map((border, index) => {
              if (border === state) {
                return (
                  // border
                  <motion.span
                    key={index}
                    animate={{ width: 3 }}
                    initial={{ width: 0 }}
                    transition={{
                      delay: isChecked ? 2.5 : isUpdated ? 1.9 : 1,
                      duration: 0.4,
                    }}
                    style={{ background: `var(--${border})` }}
                    exit={{
                      width: 0,
                      transition: {
                        delay: isUpdated ? 1 : 0.2,
                        duration: 0.6,
                      },
                    }}
                    className="custom-border"
                  ></motion.span>
                );
              }
            })}
          </AnimatePresence>

          <p id="content" className={isCompleted ? "checked" : ""}>
            <motion.span className="text" ref={contentRef}>
              {Array.from(content).map((letter, i) => {
                return (
                  //  content
                  <motion.span
                    initial={{ opacity: 0 }}
                    // animate={{ opacity: 1 }}
                    animate={{ opacity: isCompleted ? 0.4 : 1 }}
                    transition={{
                      delay: isCompleted
                        ? 1.2
                        : isUpdated
                        ? 2.2
                        : isChecked
                        ? 1.85
                        : state === "created"
                        ? 0.5 + 0.02 * i
                        : 2,
                      damping: 10,
                      stiffness: 300,
                    }}
                    style={{ margin: -1.5 }}
                    key={i}
                  >
                    {" "}
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                );
              })}
              <AnimatePresence mode="wait">
                {/* line */}
                {isCompleted && (
                  <motion.span
                    key={_id}
                    initial={{ width: 0 }}
                    animate={{ width: lineWidth }}
                    transition={{ delay: 2, duration: 0.5 }}
                    exit={{
                      width: 0,
                      transition: {
                        delay: isUpdated ? 0 : 1.2,
                        duration: 0.5,
                      },
                    }}
                    className="check-task"
                  ></motion.span>
                )}
              </AnimatePresence>
            </motion.span>
          </p>
          <div id="time-cont">
            <AnimatePresence mode="wait">
              {states.map((st, index) => {
                if (state === st) {
                  return (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0 }}
                      transition={{
                        delay: isChecked ? 1.4 : isUpdated ? 1.2 : 0.8,
                        duration: 0.2,
                      }}
                      animate={{
                        opacity: 1,
                        color: ["rgb(0,0,0)", `var(--${state})`],
                      }}
                      style={{
                        fontSize: ".8rem",
                        fontWeight: "bold",
                        display: "inline-block",
                        width: "4.5rem",
                        letterSpacing: state === "unchecked" ? 0.1 : 0.7,
                      }}
                      exit={{
                        opacity: 0,
                        transition: {
                          delay: isUpdated ? 0.5 : 0.9,
                          duration: 0.2,
                        },
                      }}
                      className="state"
                    >
                      {state} in
                    </motion.span>
                  );
                }
              })}
            </AnimatePresence>
            <span>{time}</span>
            <span> && </span>
            <span>{date}</span>

            {remind && days && (
              <span className="bell">
                <GiRingingBell color="var(--bell)" fontSize={12} />
                {days > 0 ? (
                  <small>
                    should be done in {days} d: {hours} h: {minutes} m:
                    {seconds} s
                  </small>
                ) : (
                  <small> This task should have been done </small>
                )}
              </span>
            )}
          </div>
          <div id="btns">
            <motion.button
              whileHover={taskbtnHover}
              className="btn"
              title="set reminder"
              onClick={() => {
                setShowReminder(true);
                setReminderIndex(index);
              }}
            >
              <AiOutlineClockCircle />
            </motion.button>
            <motion.button
              className="btn"
              whileHover={taskbtnHover}
              title="update"
            >
              <AiOutlineArrowUp
                onClick={() => {
                  setIsInpFocus(true);
                  setUpdatedValue(content);
                  setUpdatedTaskId(_id as string);
                  setMode("update");
                }}
              />
            </motion.button>
            <motion.button
              className="btn"
              whileHover={taskbtnHover}
              onClick={async () => {
                dispatch(
                  checkTodo({
                    id: _id as string,
                    isChecked: !isCompleted,
                    content,
                  })
                );

                const addedNotificationObj = {
                  isRead: false,
                  state: !isCompleted ? "checked" : "unchecked",
                  time: `${dateFN()}-${timeFn()}`,
                  content,
                };
                const newNotification = await addNotificationtoDB(
                  addedNotificationObj
                );
                const arr = newNotification.data.result.value.notification;
                dispatch(addtoNotificationArr(arr[arr.length - 1]));

                setIsChecked(true);
              }}
              title={isCompleted ? "uncheck" : "check"}
            >
              <IoCheckmarkDoneOutline />
            </motion.button>
            <motion.button
              className="btn"
              whileHover={taskbtnHover}
              onClick={async () => {
                setShowToast(true);
                const {
                  payload: {
                    result: {
                      value: { content },
                    },
                  },
                } = await dispatch(deleteTodo(_id as string));

                const addedNotificationObj = {
                  isRead: false,
                  state: "deleted",
                  time: `${dateFN()}-${timeFn()}`,
                  content,
                };
                const newNotification = await addNotificationtoDB(
                  addedNotificationObj
                );
                const arr = newNotification.data.result.value.notification;
                dispatch(addtoNotificationArr(arr[arr.length - 1]));
                setTimeout(() => {
                  setIsDeleted(true);
                }, 400);
                controls.set({ opacity: 1 });
                controls.start({
                  opacity: 0,
                  transition: { duration: 0.5 },
                });
              }}
              title="delete"
            >
              <ReactSVG
                src={deleteSvg}
                beforeInjection={(svg) => {
                  svg.classList.add("delete-svg");
                }}
              />
            </motion.button>
          </div>
        </motion.div>
      )}
      <AnimatePresence mode="wait">
        {showReminder && (
          <>
            <Reminder
              setShowReminder={setShowReminder}
              reminderIndex={reminderIndex}
              key={reminderIndex}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Task;
