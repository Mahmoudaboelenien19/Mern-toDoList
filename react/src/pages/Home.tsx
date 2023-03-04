// import React, { createContext } from "react";
import Form from "../components/Form";
import Tasks from "../components/tasks";
import { InpContextProvider } from "./../context/inpContext";

const Home: React.FC = () => {
  return (
    <div>
      <InpContextProvider>
        <Form />
        <Tasks />
      </InpContextProvider>
    </div>
  );
};

export default Home;
