import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { opacityVariant } from "../Variants/options";

interface Props {
  question?: string;
  answer?: string;
  index: number;
  setFaqIndex: React.Dispatch<React.SetStateAction<number>>;
  faqIndex: number;
}

const OneFaq = ({ question, answer, index, faqIndex, setFaqIndex }: Props) => {
  const faqVariant = {
    start: {
      height: 0,
      opacity: 0,
    },
    end: {
      opacity: 1,

      height: "fit-content",

      transition: {
        delay: 0.6,
        duration: 0.5,
        opacity: {
          delay: 1.1,
          duration: 0.2,
        },
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        height: { delay: 0.4, duration: 0.2 },
        opacity: { delay: 0, duration: 0.3 },
      },
    },
  };

  return (
    <motion.div className="faq" key={index}>
      <p
        className="question"
        onClick={() => {
          setFaqIndex(index);
        }}
      >
        {question}
      </p>

      <AnimatePresence mode="wait">
        {index === faqIndex && (
          <motion.p
            variants={faqVariant}
            initial="start"
            animate="end"
            exit="exit"
            key={question}
            className="answer"
          >
            {" "}
            {answer}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default OneFaq;
