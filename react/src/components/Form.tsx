import React, { useState, useRef, useEffect, useContext } from "react";
import { inpContext } from "../context/inpContext";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../customHooks/reduxTypes";
import { addTodo, updateTodo } from "../redux/Taskslice";
import { toast } from "react-toastify";
import { toastContext } from "../pages/Home";
import { handleIsClearedSlice } from "../redux/IsCleared";
import useInp from "../customHooks/useInp";

const Form: React.FC = () => {
  const dispatch = useAppDispatch();

  const [inp, setInp] = useState("");
  const input = useRef<HTMLInputElement>(null!);
  const focus = useContext(inpContext);
  const { msg } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    if (focus.isInpFocus) {
      input.current.focus();
      input.current.value = focus?.inpValue;
    }
    setTimeout(() => {
      focus.setIsInpFocus(false);
    }, 0);
  }, [focus.isInpFocus]);

  const { showToast, setShowToast } = useContext(toastContext);
  useEffect(() => {
    if (!msg || !showToast) return;
    const timer = setTimeout(() => {
      toast.success(msg);
    }, 100);
    return () => clearTimeout(timer);
  }, [msg, showToast]);

  const handleInp = () => {
    setInp(input.current!.value);
  };

  const [bg, setBg] = useState("var(--border)");
  useEffect(() => {
    input.current?.value.trim().length === 0
      ? setBg("var(--border)")
      : input.current?.value.trim().length <= 30
      ? setBg("var(--update)")
      : setBg("var(--delete)");
  }, [input.current?.value.trim().length]);
  return (
    <div>
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        action=""
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          setShowToast(true);
          if (input.current.value.trim().length === 0) {
            toast.error("insert a todo to add");
          } else if (input.current.value.trim().length > 30) {
            toast.error("you can't exceed 30 letter");
          } else {
            if (focus.mode === "create") {
              dispatch(addTodo(inp.trim()));
              dispatch(handleIsClearedSlice(false));
            } else {
              dispatch(
                updateTodo({
                  id: focus.updatedTaskId,
                  content: input.current.value.trim(),
                })
              );
              focus.setMode("create");
            }
            input.current.value = "";
            input.current.blur();
          }
        }}
      >
        <div id="inp">
          <input
            ref={input}
            type="text"
            required
            onChange={handleInp}
            onBlur={() => focus.setMode("create")}
          />
          <motion.div
            style={{
              background: `linear-gradient(135deg,${bg},var(--secondary))`,
            }}
            animate={{ width: "60vw" }}
            initial={{ width: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="mock-inp"
          ></motion.div>

          <span id="placeholder">
            <AnimatePresence mode={"wait"}>
              {focus.mode === "create" ? (
                <motion.span
                  key={"add"}
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ delay: 1, duration: 1 }}
                  exit={{
                    opacity: 0,
                    transition: { delay: 0.5, duration: 0.5 },
                  }}
                >
                  Add a Todo ...
                </motion.span>
              ) : (
                <motion.span
                  key={"update"}
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  exit={{
                    opacity: 0,
                    transition: { delay: 0.5, duration: 0.5 },
                  }}
                >
                  Update Todo ...
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </div>
      </motion.form>
    </div>
  );
};

export default Form;
