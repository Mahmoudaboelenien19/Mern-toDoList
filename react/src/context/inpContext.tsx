import { createContext, useState } from "react";

interface inpContextProviderProps {
  children: React.ReactNode;
}

interface inpContextInterface {
  isInpFocus: boolean;
  setIsInpFocus: React.Dispatch<React.SetStateAction<boolean>>;
}
export const inpContext = createContext({} as inpContextInterface);

export const InpContextProvider = ({ children }: inpContextProviderProps) => {
  const [isInpFocus, setIsInpFocus] = useState(false);

  return (
    <inpContext.Provider value={{ isInpFocus, setIsInpFocus }}>
      {children}
    </inpContext.Provider>
  );
};
