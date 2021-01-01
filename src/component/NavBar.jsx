import React from 'react';
import github from './images/GitHub.png';

class NavBar extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">

                    <span>
                        <a href="https://github.com/Chetan-Satpute/oneline">
                        <img src={github} style={{ width:"30%" }} />
                        </a>
                    </span>

                    <span className="navbar-brand fs-2">
                        <b>One Line</b>
                    </span>

                </div>
            </nav>
        );
    }
}

export default NavBar;
