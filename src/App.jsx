import React, { useState } from "react";
import NavBar from "./NavBar/NavBar";
import "./App.css";
import Control from "./Control/Control";
import Canvas from "./Canvas/Canvas";

function App() {
  const [solve, setSolve] = useState(false);
  const [clear, setClear] = useState(false);

  return (
    <div id="App">
      <NavBar />
      <main>
        <Canvas
          solve={solve}
          clear={clear}
          setSolve={setSolve}
          setClear={setClear}
        />
        <Control solve={setSolve} clear={setClear} disable={solve} />
      </main>
    </div>
  );
}

export default App;
