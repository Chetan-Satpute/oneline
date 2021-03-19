import React from "react";
import "./Control.css";

function Control({ solve, clear, disable }) {
  return (
    <div id="Control" className="d-flex justify-content-center">
      <button className="btn btn-success btn-lg m-3 control-btn" disabled={disable}>
        Solution
      </button>
      <button
        className="btn btn-primary btn-lg m-3 control-btn"
        onClick={() => solve(true)}
        disabled={disable}
      >
        Solve
      </button>
      <button
        className="btn btn-danger btn-lg m-3 control-btn"
        onClick={() => clear(true)}
        disabled={disable}
      >
        Reset
      </button>
    </div>
  );
}

export default Control;
