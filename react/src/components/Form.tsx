import React, { useState, useRef, useEffect, useContext } from "react";
import { inpContext } from "../context/inpContext";
import { easeInOut, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../customHooks/reduxTypes";
import { addTodo, updateTodo } from "../redux/Taskslice";
import { toast } from "react-toastify";
import { toastContext } from "../pages/Home";

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

  const [bg, setBg] = useState("--var(--border)");
  useEffect(() => {
    inp.length === 0
      ? setBg("var(--border)")
      : inp.length <= 25
      ? setBg("var(--update)")
      : setBg("var(--delete)");
  });
  return (
    <div>
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          setShowToast(true);
          if (focus.mode === "create") {
            dispatch(addTodo(inp));
          } else {
            dispatch(
              updateTodo({
                id: focus.updatedTaskId,
                content: input.current.value,
              })
            );

            focus.setMode("create");
          }
          input.current.value = "";
          input.current.blur();
        }}
      >
        <div id="inp">
          <input ref={input} type="text" required onChange={handleInp} />
          <motion.div
            style={{
              background: `linear-gradient(135deg,${bg},var(--secondary))`,
            }}
            className="mock-inp"
          ></motion.div>
          <span id="placeholder"> Add a Todo ...</span>
        </div>
      </motion.form>
    </div>
  );
};

export default Form;
