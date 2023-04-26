import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import useInp from "../customHooks/useInp";
import usePassword from "../customHooks/usePassword";
import useReset from "../customHooks/useResetInp";
import {
  hidePasswordVariant,
  inpVariant,
  placeholderVariant,
  ResetSpanVariant,
  xSpanVariant,
} from "../Variants/form";
import { opacityVariant } from "../Variants/options";

interface InputInterface {
  isPassword: boolean;
  placeholder: string;
  onChange: (val: string) => void;
}

const alreadyRegisteredEmail =
  new URLSearchParams(location.search).get("email") || "";

const Input = ({ isPassword, placeholder, onChange }: InputInterface) => {
  const inpRef = useRef<HTMLInputElement>(null);

  const [isInpAnimateCompleted, setIsInpAnimateCompleted] = useState(false);
  const [isXSpanAnimateCompleted, setXSpannpAnimateCompleted] = useState(false);
  const [showPass, handleShowPass] = usePassword();
  const [isFocus, handleUnfocus, handleOnFocus, handleOnBlur] = useInp();
  const [
    showResetPassSpan,
    setShowResetPass,
    handlePassReset,
    isResetSpanCLicked,
    handleIsResetCLicked,
  ] = useReset();

  useEffect(() => {
    if (!isInpAnimateCompleted && isFocus) {
      inpRef.current?.focus();
    }
  }, [isInpAnimateCompleted]);

  useEffect(() => {
    if (alreadyRegisteredEmail.length && !isPassword) {
      setTimeout(() => {
        handleOnFocus();
        setTimeout(() => {
          if (inpRef?.current) {
            inpRef.current.value = alreadyRegisteredEmail;
          }
          setShowResetPass(true);
        }, 1000);
      }, 2000);
    }
  }, []);
  const [inpVal, setInpVal] = useState(alreadyRegisteredEmail);

  useEffect(() => {
    onChange(inpVal);
  }, [inpVal]);
  return (
    <motion.div
      id="inp"
      variants={opacityVariant}
      transition={{ delay: 0.5, duration: 0.2 }}
    >
      <motion.input
        ref={inpRef}
        disabled={isInpAnimateCompleted}
        type={
          !isPassword ? "text" : isPassword && showPass ? "text" : "password"
        }
        onFocus={() => {
          handleOnFocus();
        }}
        onBlur={(e) => {
          handleOnBlur(e.target.value);
        }}
        onChange={(e) => {
          setInpVal(e.target.value);
          if (e.target.value.length >= 1) {
            setShowResetPass(true);
          } else {
            setShowResetPass(false);
          }
        }}
      />

      <motion.div
        className="mock-inp"
        custom={{ isFocus, isResetSpanCLicked, isXSpanAnimateCompleted }}
        variants={inpVariant}
        animate="end"
        initial="start"
        onAnimationStart={() => setIsInpAnimateCompleted(true)}
        onAnimationComplete={() => setIsInpAnimateCompleted(false)}
      >
        <AnimatePresence mode="wait">
          {showResetPassSpan && (
            <motion.span
              className="reset"
              variants={ResetSpanVariant}
              animate="end"
              initial="start"
              exit="exit"
              onAnimationStart={() => setXSpannpAnimateCompleted(true)}
              onAnimationComplete={() => setXSpannpAnimateCompleted(false)}
              onClick={() => {
                handlePassReset(inpRef);

                handleUnfocus();
                setShowResetPass(false);
                handleIsResetCLicked();
              }}
            >
              <motion.span variants={xSpanVariant}>
                <FaTimes />
              </motion.span>
            </motion.span>
          )}
        </AnimatePresence>

        {isPassword && (
          <AnimatePresence mode="wait">
            {showResetPassSpan && (
              <motion.span
                className="eye"
                variants={hidePasswordVariant}
                initial="start"
                animate="end"
                exit="exit"
              >
                <BsFillEyeFill onClick={handleShowPass} />
              </motion.span>
            )}
          </AnimatePresence>
        )}

        <motion.span
          variants={placeholderVariant}
          custom={isFocus}
          className="placeholder"
        >
          {placeholder}
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default Input;
