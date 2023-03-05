import Nav from "./components/Nav";
import "./styles/main.scss";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router } from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Nav />
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
  );
};

export default App;
