import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useState,
} from "react";
import { AiFillDelete } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { ClearContext } from "../App";
import { useAppSelector } from "../customHooks/reduxTypes";
interface OptionsProps {
  setOption: React.Dispatch<React.SetStateAction<string>>;
  option: string;
  isIntialRender: MutableRefObject<boolean>;
}
const Options = ({ option, setOption, isIntialRender }: OptionsProps) => {
  const { setShowClearPopUp } = useContext(ClearContext);

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

  console.log("options ");
  console.log({ isIntialRender });

  return (
    <>
      <AnimatePresence>
        {tasks.length >= 1 && (
          <motion.div
            id="options"
            animate={{
              height: 50,
              opacity: 1,
              transition: {
                opacity: { delay: 2, duration: 1 },
                height: { delay: 1, duration: 1 },
              },
            }}
            initial={{ height: 0, opacity: 0 }}
          >
            <motion.small
              animate={{ width: "80%" }}
              initial={{ width: 0 }}
              transition={{ delay: 4, duration: 1 }}
              exit={{ width: 0, transition: { delay: 0.4, duration: 1 } }}
              className="hr"
            ></motion.small>
            <div id="task-state">
              {tasks.length > 0 &&
                optionsArr?.map(
                  ({ newOption, handleCLick, handleLength }, index) => {
                    return (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: option === newOption ? 1 : 0.4,
                          transition: {
                            delay: !isOptionClicked ? 2 + 0.4 * index : 1.1,
                          },
                        }}
                        // whileHover={{
                        //   scale: 1.1,
                        //   opacity: 1,
                        //   transition: { duration: 0.4 },
                        // }}
                        className={option === newOption ? "active" : ""}
                        exit={{
                          opacity: 0,
                          transition: {
                            delay: 1.5 + index * 0.2,
                            duration: 0.3,
                          },
                        }}
                        onClick={() => {
                          handleCLick();
                          setIsOptionClicked(true);
                        }}
                      >
                        {newOption} ({handleLength()})
                      </motion.span>
                    );
                  }
                )}
            </div>

            <AnimatePresence>
              {tasks.length >= 2 && option === "all" ? (
                <motion.button
                  animate={{
                    opacity: 1,
                    background: "var(--delete)",
                    transition: {
                      delay: 3.5,
                      duration: 1,
                    },
                  }}
                  initial={{ opacity: 0, background: "black" }}
                  exit={{ opacity: 0, transition: { duration: 1 } }}
                  id="clear"
                  whileHover={{
                    scale: 1.2,
                    boxShadow: "2px 2px 1px black ",
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  whileTap={{
                    scale: 1.5,
                  }}
                  onClick={() => {
                    setShowClearPopUp(true);
                  }}
                >
                  <AiFillDelete style={{ color: "white" }} />
                  Clear All ({tasks.length})
                </motion.button>
              ) : null}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Options;
