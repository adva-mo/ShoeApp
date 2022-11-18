import React from "react";
import "./spinner.css";

function Spinner() {
  return (
    <div className="spinner-wrapper">
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    </div>
  );
}

export default Spinner;
