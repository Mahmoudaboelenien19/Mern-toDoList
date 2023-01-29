import { useState } from "react";
import Nav from "./pages/Nav";
import "./styles/main.scss";
import { BrowserRouter as Router } from "react-router-dom";
import Tasks from "./pages/tasks";

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
