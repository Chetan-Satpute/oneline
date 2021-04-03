import React, { useEffect, useState } from "react";
import NavBar from "./NavBar/NavBar";
import "./App.css";
import Control from "./Control/Control";
import Canvas from "./Canvas/Canvas";
import SolutionPannel from "./SolutionPannel/SolutionPannel";

function App() {
  const [solve, setSolve] = useState(false);
  const [clear, setClear] = useState(false);
  const [solution, setSolution] = useState(false);
  const [solutionData, setSolutionData] = useState();

  const [showInfo, setShowInfo] = useState(true);

  return (
    <div id="App">
      {showInfo && (
        <div className="Info card rounded-3 bg-dark border-light">
          <div className="card-header text-white bg-secondary">
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => {
                setShowInfo(false);
              }}
            ></button>
          </div>
          <div className="card-body p-3 text-white  overflow-auto">
            <h1 className="card-title">Oneline</h1>
            <p className="card-subtitle text-muted">
              This web app is an automation for one line puzzle.
            </p>
            <div className="card-text text-muted">
              <p>
                Given a pattern, one needs to explore every segment of the
                pattern in one line (Without lifting pen).
              </p>
              <p>
                Formally, a pattern is a graph and objective of this puzzle is
                to find Euler Walk for the graph.
              </p>
              <p>
                This web app solves one line puzzle, user creates a pattern
                (Graph) on canvas and web app finds a solution (Euler Walk), or
                notify if a solution is not possible. It uses basics of graph
                theory and graph traversal algorithms to find solution.
              </p>
              To create pattern:
              <ul>
                <li>
                  Click (Tap) two different positions on white canvas to create
                  two nodes and a segment connecting them.
                </li>
                <li>
                  Double-click (Double-Tap) a node to delete the node and all
                  it's incident segments.
                </li>
              </ul>
              To solve a pattern:
              <ul>
                <li>
                  Click <strong>Solve</strong>. (Now pattern cannot be edited, Nodes can be
                  draged)
                </li>
                <li>
                  If a solution is found click <strong>Solution</strong> to review solution.
                  (Solution stays until pattern is edited)
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <NavBar />
      <main>
        {!solve && solution && (
          <SolutionPannel
            data={solutionData}
            setSolution={setSolution}
            close={() => {
              setSolution(false);
            }}
          />
        )}
        <Canvas
          solve={solve}
          clear={clear}
          setSolve={setSolve}
          setClear={setClear}
          setSolutionData={setSolutionData}
        />
        <Control
          solve={setSolve}
          clear={setClear}
          solution={setSolution}
          disable={solve}
        />
      </main>
    </div>
  );
}

export default App;
