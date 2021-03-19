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

  return (
    <div id="App">
      <NavBar />
      <main>
        {(!solve && solution) && (
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
