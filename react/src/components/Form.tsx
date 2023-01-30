import React from "react";

const Form: React.FC = () => {
  return (
    <div>
      <form action="">
        <div id="inp">
          <input type="text" required />
          <div className="mock-inp"></div>
          <span id="placeholder"> Add a Todo ...</span>
        </div>
      </form>
    </div>
  );
};

export default Form;
