import { motion } from "framer-motion";
import { clearAllTodos } from "../redux/Taskslice";
import { useAppDispatch } from "../customHooks/reduxTypes";
import { useContext } from "react";
import { ClearContext } from "../App";

const ClearPopUp = () => {
  const { setShowClearPopUp } = useContext(ClearContext);
  const dispatch = useAppDispatch();

  return (
    <motion.div
      id="overley"
      animate={{ background: " rgba(255, 166, 0, 0.38)" }}
      exit={{ opacity: 0, transition: { delay: 1 } }}
      transition={{ delay: 0.2, duration: 1 }}
    >
      <motion.section
        animate={{ y: 0 }}
        initial={{ y: -1000 }}
        exit={{ y: "-100vh", transition: { type: "tween", duration: 1.4 } }}
        transition={{ delay: 1.2, type: "spring", stiffness: 150 }}
        id="clr-pop"
      >
        <h3>Are you sure to clear All todos ?!</h3>
        <motion.button
          className="btn-x"
          whileHover={{ background: "wheat", color: "var(--delete" }}
          transition={{ duration: 1 }}
          onClick={() => setShowClearPopUp(false)}
        >
          X
        </motion.button>

        <div className="btn-container">
          <motion.button
            whileHover={{ scale: 1.2, boxShadow: "2px 2px 1px rgb(0,0,0) " }}
            transition={{ type: "spring", stiffness: 300 }}
            className="btn-clr"
            onClick={() => {
              dispatch(clearAllTodos());
              setShowClearPopUp(false);
            }}
          >
            clear
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.2, boxShadow: "2px 2px 1px rgb(0,0,0) " }}
            transition={{ type: "spring", stiffness: 300 }}
            className="btn-cancel"
            onClick={() => setShowClearPopUp(false)}
          >
            cancel
          </motion.button>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default ClearPopUp;
