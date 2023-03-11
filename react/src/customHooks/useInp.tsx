import { useState } from "react";

const useInp = () => {
  const [isFocus, setIsFocus] = useState(false);
  const handleIsFocus = () => setIsFocus(true);
  const handleIsBlur = (val: string) => {
    if (val === "") {
      setIsFocus(false);
    }
  };
  const handleUnfocus = () => setIsFocus(false);

  return [isFocus, handleUnfocus, handleIsFocus, handleIsBlur] as const;
};

export default useInp;
