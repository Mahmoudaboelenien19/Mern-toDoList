import { createContext, useState } from "react";

interface inpContextProviderProps {
  children: React.ReactNode;
}

interface inpContextInterface {
  isInpFocus: boolean;
  setIsInpFocus: React.Dispatch<React.SetStateAction<boolean>>;
  inpValue: string;
  setInpValue: React.Dispatch<React.SetStateAction<string>>;
  updatedTaskId: string;
  setUpdatedTaskId: React.Dispatch<React.SetStateAction<string>>;
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
}
export const inpContext = createContext({} as inpContextInterface);

export const InpContextProvider = ({ children }: inpContextProviderProps) => {
  const [isInpFocus, setIsInpFocus] = useState(false);
  const [inpValue, setInpValue] = useState("");
  const [updatedTaskId, setUpdatedTaskId] = useState("");
  const [mode, setMode] = useState("create");

  return (
    <inpContext.Provider
      value={{
        isInpFocus,
        setIsInpFocus,
        inpValue,
        setInpValue,
        updatedTaskId,
        setUpdatedTaskId,
        mode,
        setMode,
      }}
    >
      {children}
    </inpContext.Provider>
  );
};
