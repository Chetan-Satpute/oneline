import React from "react";
import github from "./images/GitHub.png";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <span>
          <a href="https://github.com/Chetan-Satpute/oneline">
            <img src={github} alt="Github repository link" id="github-image" />
          </a>
        </span>

        <span>
          <h1 className="navbar-brand fs-2">One Line</h1>
        </span>
      </div>
    </nav>
  );
}

export default NavBar;
