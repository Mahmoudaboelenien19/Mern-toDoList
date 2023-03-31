import React, { useContext, useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { ClearContext } from "../App";
import { useAppSelector } from "../customHooks/reduxTypes";
import {
  clearBtn,
  hrVariant,
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
  const { tasks, isChanged } = useAppSelector((state) => state.tasks);
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

  const btnControls = useAnimation();

  useEffect(() => {
    if (tasks.length >= 2 && isAnimateFInished && option === "all") {
      {
        btnControls.start("end");
      }
    }
  }, [isChanged, option]);
  return (
    <motion.div
      id="options"
      variants={optionsParentVariant}
      onAnimationComplete={() => {
        btnControls.start("end");
        setIsAnimateFInished(true);
      }}
    >
      {/* hr */}

      <div id="task-state">
        {optionsArr?.map(({ newOption, handleCLick, handleLength }) => {
          return (
            <motion.span
              className={option === newOption ? "active" : ""}
              key={newOption}
              variants={optionVariant}
              onClick={() => {
                handleCLick();
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

      {/* CLEAR ALL */}
      <AnimatePresence mode="wait">
        {tasks.length >= 2 && option === "all" && (
          <motion.button
            initial="start"
            exit="exit"
            animate={btnControls}
            variants={clearBtn}
            id="clear"
            className="btn"
            whileHover={isAnimateFInished ? btnHover : {}}
            onClick={() => {
              setShowClearPopUp(true);
            }}
          >
            <AiFillDelete style={{ color: "white" }} />
            Clear All ({tasks.length})
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Options;
