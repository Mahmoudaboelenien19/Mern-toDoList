import Nav from "./components/nav/Nav";
import React from "react";
import "./styles/main.scss";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import ClearPopUp from "./components/ClearPopUp";
import { createContext, useEffect, useState } from "react";
import Loading from "./components/Loading";
import IsAuthProvider from "./context/isAuthcontext";

interface ClearContext {
  showClearPopUp: boolean;
  setShowClearPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ClearContext = createContext({} as ClearContext);

const App = () => {
  const [showClearPopUp, setShowClearPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3500);
  }, []);

  return (
    <IsAuthProvider>
      {isLoading ? (
        <Loading />
      ) : (
        <Router>
          <div className="App">
            <ClearContext.Provider
              value={{ showClearPopUp, setShowClearPopUp }}
            >
              <Nav />
              <AnimatePresence>
                {showClearPopUp && <ClearPopUp />}
              </AnimatePresence>
            </ClearContext.Provider>

            <ToastContainer
              position="bottom-left"
              autoClose={3000}
              hideProgressBar
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Flip}
            />
          </div>
        </Router>
      )}
    </IsAuthProvider>
  );
};

export default App;
