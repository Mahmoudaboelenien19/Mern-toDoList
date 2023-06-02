import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import useIsMobile from "../customHooks/useIsMobile";
import { motion } from "framer-motion";

interface Props {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}
const MobileCloseDropDown = ({ setter }: Props) => {
  const { isMobile } = useIsMobile();
  return (
    <>
      {isMobile && (
        <motion.span
          exit={{ opacity: 0 }}
          onClick={() => setter(false)}
          className="close-drop"
        >
          <AiFillCloseCircle className="icon red" />
        </motion.span>
      )}
    </>
  );
};

export default MobileCloseDropDown;
