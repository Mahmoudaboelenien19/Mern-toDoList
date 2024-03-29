// import React, { createContext } from "react";
import React, { createContext, useState } from "react";
import Form from "../components/Form";
import Tasks from "../components/tasks";
import { InpContextProvider } from "./../context/inpContext";

interface toastContextInterface {
  showToast: boolean;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
}
export const toastContext = createContext({} as toastContextInterface);
const Home: React.FC = () => {
  const [showToast, setShowToast] = useState(false);

  return (
    <>
      <toastContext.Provider value={{ showToast, setShowToast }}>
        <InpContextProvider>
          <Form />
          <Tasks />
        </InpContextProvider>
      </toastContext.Provider>
    </>
  );
};

export default Home;
