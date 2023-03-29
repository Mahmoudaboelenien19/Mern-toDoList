import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  question?: string;
  answer?: string;
  index: number;
  setFaqIndex: React.Dispatch<React.SetStateAction<number>>;
  faqIndex: number;
  id: number;
}

const OneFaq = ({
  id,
  question,
  answer,
  index,
  faqIndex,
  setFaqIndex,
}: Props) => {
  const clrs = ["darkblue", " darkred", "blueviolet", "green", "orange"];

  const faqVariant = {
    start: {
      height: 0,
      opacity: 0,
    },
    end: {
      opacity: 1,

      height: "fit-content",
      transition: {
        // delay: 0.6,
        duration: 0.5,
        opacity: {
          // delay: 1.1,
          duration: 0.2,
        },
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        height: { duration: 0.4 },
        opacity: { delay: 0, duration: 0.3 },
      },
    },
  };
  const [showAnswer, setShowAnswer] = useState(false);
  useEffect(() => {
    if (faqIndex !== index) {
      setShowAnswer(false);
    }
  }, [faqIndex]);
  return (
    <motion.div className="faq" key={index}>
      <p
        className="question"
        onClick={() => {
          setFaqIndex(index);
          setShowAnswer(!showAnswer);
        }}
      >
        {question}
      </p>

      <AnimatePresence mode="wait">
        {index === faqIndex && showAnswer && (
          <motion.p
            variants={faqVariant}
            initial="start"
            animate="end"
            exit="exit"
            key={question}
            className="answer"
            style={{
              background: `linear-gradient(210deg,grey,${clrs[id - 1]})`,
            }}
          >
            {answer}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default OneFaq;
