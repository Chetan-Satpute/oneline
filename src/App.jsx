import React from "react";
import NavBar from "./NavBar/NavBar";
import "./App.css";
import Control from "./Control/Control";
import Canvas from "./Canvas/Canvas";

function App() {
  return (
    <div id="App">
      <NavBar />
      <main>
        <Canvas />
        <Control />
      </main>
    </div>
  );
}

export default App;
