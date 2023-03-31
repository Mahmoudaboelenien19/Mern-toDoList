import { MutableRefObject, useEffect, useState } from "react";

const useReset = () => {
  const [showResetSpan, setShowResetSpan] = useState(false);
  const [isResetSpanCLicked, setIsResetSpanCLicked] = useState(false);

  useEffect(() => {
    if (!isResetSpanCLicked) return;
    const timer = setTimeout(() => {
      setIsResetSpanCLicked(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [isResetSpanCLicked]);

  const handleIsResetCLicked = () => setIsResetSpanCLicked(true);

  const handleReset = (ref: MutableRefObject<HTMLInputElement | null>) => {
    if (ref?.current) {
      ref.current.value = "";
    }
  };

  return [
    showResetSpan,
    setShowResetSpan,
    handleReset,
    isResetSpanCLicked,
    handleIsResetCLicked,
  ] as const;
};

export default useReset;
