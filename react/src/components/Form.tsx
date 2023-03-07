import React, { useState, useRef, useEffect, useContext } from "react";
import { inpContext } from "../context/inpContext";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../customHooks/reduxTypes";
import { addTodo, updateTodo } from "../redux/Taskslice";
import { toast } from "react-toastify";

const Form: React.FC = () => {
  const [isCreated, setIsCreated] = useState(false);
  const { msg } = useAppSelector((state) => state.tasks);

  const dispatch = useAppDispatch();

  const [inp, setInp] = useState("");
  const input = useRef<HTMLInputElement>(null!);
  const focus = useContext(inpContext);

  useEffect(() => {
    if (focus.isInpFocus) {
      input.current.focus();
      input.current.value = focus?.inpValue;
    }
    setTimeout(() => {
      focus.setIsInpFocus(false);
    }, 0);
  }, [focus.isInpFocus]);

  //!fix
  useEffect(() => {
    if (!msg) return;
    // const time = setTimeout(() => {
    toast.success(msg);
    // }, 500);
    // return () => clearTimeout(time);
    // setIsCreated(false);
  }, [msg]);

  const handleInp = () => {
    setInp(input.current!.value);
  };
  return (
    <div>
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          if (focus.mode === "create") {
            dispatch(addTodo(inp));
          } else {
            dispatch(
              updateTodo({
                id: focus.updatedTaskId,
                content: input.current.value,
              })
            );
            setTimeout(() => {
              focus.setMode("create");
            }, 500);
          }
          input.current.value = "";
          input.current.blur();
          setIsCreated(true);
        }}
      >
        <div id="inp">
          <input ref={input} type="text" required onChange={handleInp} />
          <div className="mock-inp"></div>
          <span id="placeholder"> Add a Todo ...</span>
        </div>
      </motion.form>
    </div>
  );
};

export default Form;
