import React, { useState, useRef, useEffect, useContext } from "react";
import { inpContext } from "../context/inpContext";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../customHooks/reduxTypes";
import { addTodo, updateTodo } from "../redux/Taskslice";
import { toast } from "react-toastify";
import { toastContext } from "../pages/Home";

const Form: React.FC = () => {
  const dispatch = useAppDispatch();
  const [inp, setInp] = useState("");
  const input = useRef<HTMLInputElement>(null!);
  const focus = useContext(inpContext);
  const {
    isInpFocus,
    setIsInpFocus,
    setIsUpdated,
    updatedTaskId,
    setMode,
    mode,
    inpValue,
  } = focus;
  const { msg } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    if (isInpFocus) {
      input.current.focus();
      input.current.value = inpValue;
    }
    const timer = setTimeout(() => {
      setIsInpFocus(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [isInpFocus]);

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

  const [isInpAnimateCompleted, setIsInpAnimateCompleted] = useState(false);

  return (
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
          if (mode === "create") {
            dispatch(addTodo(inp.trim()));
          } else {
            dispatch(
              updateTodo({
                id: updatedTaskId,
                content: input.current.value.trim(),
              })
            );
            setTimeout(() => {
              setMode("create");
            }, 1000);
            setIsUpdated(true);
          }
          input.current.value = "";
        }
      }}
    >
      <motion.div id="inp">
        <input
          ref={input}
          type="text"
          required
          onChange={handleInp}
          onBlur={() => {
            if (input.current.value === "") {
              setMode("create");
            }
          }}
        />
        <motion.div
          style={{
            background: `linear-gradient(135deg,${bg},var(--secondary))`,
          }}
          animate={{ width: "60vw" }}
          initial={{ width: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="mock-inp"
        >
          <span id="placeholder">
            <AnimatePresence mode={"wait"}>
              {mode === "create" ? (
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
        </motion.div>
      </motion.div>
    </motion.form>
  );
};

export default Form;
