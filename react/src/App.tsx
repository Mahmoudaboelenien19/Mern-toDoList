import { useState } from "react";
import Nav from "./components/Nav";
import "./styles/main.scss";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Nav />
      </div>
    </Router>
  );
};

export default App;
