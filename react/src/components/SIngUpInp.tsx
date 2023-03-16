import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import useInp from "../customHooks/useInp";
import usePassword from "../customHooks/usePassword";
import {
  hidePasswordVariant,
  inpVariant,
  placeholderVariant,
  ResetSpanVariant,
  xSpanVariant,
} from "../Variants/form";

import { useFormContext } from "react-hook-form";
import { opacityVariant } from "../Variants/options";

interface InputInterface {
  isPassword: boolean;
  placeholder: string;
  err?: string;
}

const SignUpInput = ({ isPassword, placeholder, err }: InputInterface) => {
  const [isInpAnimateCompleted, setIsInpAnimateCompleted] = useState(false);
  const [isXSpanAnimateCompleted, setXSpannpAnimateCompleted] = useState(false);
  const [showPass, handleShowPass] = usePassword();
  const [isFocus, handleUnfocus, handleOnFocus, handleOnBlur] = useInp();
  const { register, resetField, watch, setFocus } = useFormContext();

  useEffect(() => {
    if (!isInpAnimateCompleted && isFocus) {
      setFocus(placeholder);
    }
  }, [isInpAnimateCompleted]);

  const [showResetPassSpan, setShowResetPassSpan] = useState(false);

  const [isResetSpanCLicked, setisResetSpanCLicked] = useState(false);

  useEffect(() => {
    if (!isResetSpanCLicked) return;
    const timer = setTimeout(() => {
      setisResetSpanCLicked(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [isResetSpanCLicked]);

  const inpVal = watch(placeholder);
  useEffect(() => {
    if (inpVal?.length >= 1) {
      setShowResetPassSpan(true);
    } else {
      setShowResetPassSpan(false);
    }
  }, [inpVal]);
  return (
    <motion.div
      id="inp"
      variants={opacityVariant}
      transition={{ delay: 0.5, duration: 0.2 }}
    >
      <input
        onFocus={() => {
          handleOnFocus();
        }}
        disabled={isInpAnimateCompleted}
        type={
          !isPassword ? "text" : isPassword && showPass ? "text" : "password"
        }
        {...register(placeholder, {
          onBlur() {
            handleOnBlur(inpVal);
            setisResetSpanCLicked(false);
            console.log("blur");
          },
        })}
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
                setisResetSpanCLicked(true);
                resetField(placeholder);
                handleUnfocus();
              }}
            >
              <motion.span variants={xSpanVariant}>
                <FaTimes style={{ marginTop: 3 }} />
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
          {" "}
          {placeholder}
        </motion.span>
      </motion.div>
      <AnimatePresence>
        {err && (
          <motion.small
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="err"
          >
            {err}
          </motion.small>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SignUpInput;
