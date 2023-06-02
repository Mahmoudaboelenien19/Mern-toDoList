import React, { useState, useEffect, useContext } from "react";
import { inpContext } from "../context/inpContext";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../customHooks/reduxTypes";
import { addTodo, updateTodo } from "../redux/Taskslice";
import { toast } from "react-toastify";
import { toastContext } from "../pages/Home";
import { FieldValues, useForm } from "react-hook-form";
import { opacityVariant } from "../Variants/options";
import {
  dotsParent,
  formPlaceholderVariant,
  inpVariant,
} from "../Variants/form";
import { addtoNotificationArr } from "../redux/NotificationSlice";
import useNotification from "../customHooks/useNotification";

import { date as dateFN, time as timeFn } from "../redux/Taskslice";

const Form: React.FC = () => {
  const dispatch = useAppDispatch();

  const { register, watch, setFocus, handleSubmit, setValue } = useForm();

  const { addNotificationtoDB } = useNotification();

  const watchedVal = watch("todo");

  const OnSubmit = async (data: FieldValues) => {
    console.log(data);
    setShowToast(true);
    if (watchedVal?.trim().length === 0) {
      toast.error("insert a todo to add");
    } else if (watchedVal?.trim().length > 30) {
      toast.error("you can't exceed 30 letter");
    } else {
      if (mode === "create") {
        dispatch(addTodo(watchedVal?.trim()));
        const addedNotificationObj = {
          isRead: false,
          time: `${dateFN()}-${timeFn()}`,

          state: "created",
          content: watchedVal?.trim(),
        };
        const newNotification = await addNotificationtoDB(addedNotificationObj);
        const arr = newNotification.data.result.value.notification;
        dispatch(addtoNotificationArr(arr[arr.length - 1]));
      } else {
        dispatch(
          updateTodo({
            id: updatedTaskId,
            content: watchedVal?.trim(),
          })
        );

        const addedNotificationObj = {
          isRead: false,
          state: "updated",
          time: `${dateFN()}-${timeFn()}`,
          content: watchedVal?.trim(),
        };
        const newNotification = await addNotificationtoDB(addedNotificationObj);
        const arr = newNotification.data.result.value.notification;
        dispatch(addtoNotificationArr(arr[arr.length - 1]));

        setTimeout(() => {
          setMode("create");
        }, 1000);
        setIsUpdated(true);
      }
      setValue("todo", "");
    }
  };

  const [isFocus, setIsFocus] = useState(false);
  const focus = useContext(inpContext);
  const {
    isInpFocus,
    setIsInpFocus,
    setIsUpdated,
    updatedTaskId,
    setMode,
    mode,
    updatedValue,
  } = focus;

  const { msg } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    if (isInpFocus) {
      setFocus("todo");
      setTimeout(() => {
        setValue("todo", updatedValue);
      }, 1000);
    }
    const timer = setTimeout(() => {
      setIsInpFocus(false);
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, [isInpFocus]);

  const { showToast, setShowToast } = useContext(toastContext);
  useEffect(() => {
    if (!msg || !showToast) return;
    const timer = setTimeout(() => {
      toast.success(msg);
    }, 100);
    return () => clearTimeout(timer);
  }, [msg, showToast]);

  const [bg, setBg] = useState("var(--border)");
  useEffect(() => {
    watchedVal?.trim().length === 0
      ? setBg("var(--border)")
      : watchedVal?.trim().length <= 30
      ? setBg("var(--update)")
      : setBg("var(--delete)");
  }, [watchedVal?.trim().length]);

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      action=""
      onSubmit={handleSubmit(OnSubmit)}
    >
      <motion.div
        id="inp"
        variants={opacityVariant}
        transition={{ delay: 0.5, duration: 0.2 }}
      >
        <AnimatePresence initial={false}>
          <input
            {...register("todo")}
            type="text"
            onFocus={() => {
              setIsFocus(true);
            }}
            onBlur={() => {
              if (watchedVal === "") {
                setMode("create");
                setIsFocus(false);
              }
            }}
          />
        </AnimatePresence>
        <motion.div
          style={{
            background: `linear-gradient(135deg,${bg},var(--link-hover))`,
          }}
          custom={{ isFocus, bg }}
          variants={inpVariant}
          animate="end"
          initial="start"
          className="mock-inp"
        >
          <AnimatePresence mode="wait">
            {mode === "create" ? (
              <motion.span
                key="add"
                className="placeholder"
                variants={formPlaceholderVariant}
                custom={isFocus}
                initial="start"
                animate="end"
                exit="exit"
              >
                Add a Todo
                <AnimatePresence mode="wait">
                  {isFocus && (
                    <motion.span
                      key={"dots-parent"}
                      variants={dotsParent}
                      initial="start"
                      animate="end"
                      exit="exit"
                    >
                      {Array.from("...").map((e, i) => {
                        return (
                          <motion.span key={i} variants={opacityVariant}>
                            {" "}
                            {e}
                          </motion.span>
                        );
                      })}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.span>
            ) : (
              <motion.span
                key="update"
                className="placeholder"
                variants={formPlaceholderVariant}
                custom={isFocus}
                initial="start"
                animate="end"
                exit="exit"
              >
                Update Todo
                <AnimatePresence mode="wait">
                  {isFocus && (
                    <motion.span
                      key={"dots-parent"}
                      variants={dotsParent}
                      initial="start"
                      animate="end"
                      exit="exit"
                    >
                      {Array.from("...").map((e, i) => {
                        return (
                          <motion.span key={i} variants={opacityVariant}>
                            {" "}
                            {e}
                          </motion.span>
                        );
                      })}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.form>
  );
};

export default Form;
