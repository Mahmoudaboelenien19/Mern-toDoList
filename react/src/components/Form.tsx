import React, { useState, useRef, useEffect, useContext } from "react";
import { inpContext } from "../context/inpContext";
import { motion } from "framer-motion";

const Form: React.FC = () => {
  const [inp, setInp] = useState("");

  const input = useRef<HTMLInputElement>(null);
  const focus = useContext(inpContext);

  useEffect(() => {
    if (focus.isInpFocus) {
      input.current!.focus();
    }
    setTimeout(() => {
      focus.setIsInpFocus(false);
    }, 0);
  }, [focus.isInpFocus]);

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
