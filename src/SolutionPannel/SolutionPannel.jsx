import React from "react";
import "./SolutionPannel.css";

function SolutionPannel({ data, setSolution, close }) {
  if (!data) {
    alert("No solution found");
    setSolution(false);
  }

  return (
    <React.Fragment>
      {data && (
        <div id="SolutionPannel" className="card rounded shadow-lg">
          <div className="card-header text-white bg-secondary">
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={close}
            ></button>
          </div>
          <div className="card-body p-3" id="Solution-Carousel">
            {data.map((imgData, index) => (
              <img
                src={imgData}
                className={`
                  ${index === 0 && "rounded-top"} 
                  ${index === data.length - 1 && "rounded-bottom"}
                `}
                alt="data"
              />
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default SolutionPannel;
