import React, { useContext, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { ClearContext } from "../App";
import { useAppSelector } from "../customHooks/reduxTypes";
import {
  clearBtn,
  hrVariant,
  opacityVariant,
  optionsParentVariant,
  optionVariant,
} from "../Variants/options";
import { btnHover } from "../Variants/globalVariants";
interface OptionsProps {
  setOption: React.Dispatch<React.SetStateAction<string>>;
  option: string;
}
const Options = ({ option, setOption }: OptionsProps) => {
  const { setShowClearPopUp } = useContext(ClearContext);
  const [isAnimateFInished, setIsAnimateFInished] = useState(false);
  const { tasks } = useAppSelector((state) => state.tasks);
  const [isOptionClicked, setIsOptionClicked] = useState(false);
  const optionsArr = [
    {
      newOption: "all",
      handleCLick: () => setOption("all"),
      handleLength: () => tasks.length,
    },
    {
      newOption: "pending",
      handleCLick: () => setOption("pending"),
      handleLength: () => tasks?.filter((e) => e.isCompleted === false).length,
    },
    {
      newOption: "completed",
      handleCLick: () => setOption("completed"),
      handleLength: () => tasks?.filter((e) => e.isCompleted).length,
    },
    {
      newOption: "updated",
      handleCLick: () => setOption("updated"),
      handleLength: () => tasks?.filter((e) => e.state === "updated").length,
    },
  ];

  return (
    <motion.div id="options" variants={optionsParentVariant}>
      {/* hr */}

      <div id="task-state">
        {/* {tasks.length > 0 && */}
        {optionsArr?.map(({ newOption, handleCLick, handleLength }, index) => {
          return (
            <motion.span
              className={option === newOption ? "active" : ""}
              key={index}
              transition={{ duration: 0.2 }}
              custom={{ index, option, newOption, isOptionClicked }}
              variants={optionVariant}
              onClick={() => {
                handleCLick();
                setIsOptionClicked(true);
              }}
            >
              {newOption} ({handleLength()})
            </motion.span>
          );
        })}
      </div>

      <motion.small
        transition={{ duration: 1 }}
        variants={hrVariant}
        className="hr"
      ></motion.small>

      {/* <AnimatePresence mode="wait"> */}
      {tasks.length >= 2 && option === "all" && (
        <motion.span
          variants={opacityVariant}
          transition={{ duration: 0.4 }}
          onAnimationComplete={() => setIsAnimateFInished(true)}
        >
          <motion.button
            initial="start"
            animate="end"
            exit="exit"
            variants={clearBtn}
            id="clear"
            whileHover={isAnimateFInished ? btnHover : {}}
            onClick={() => {
              setShowClearPopUp(true);
            }}
          >
            <AiFillDelete style={{ color: "white" }} />
            Clear All ({tasks.length})
          </motion.button>
        </motion.span>
      )}
      {/* </AnimatePresence> */}
    </motion.div>
  );
};

export default Options;
