import React from 'react';
import './css/sideBar.css';
import { RESPONSIVE_WIDTH } from './App';

class SideBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            childRender: false      // Whether or not to render children
        }
    }

    componentDidMount() {

        /**
         * Fade transition for sidebar when opening
         *
         * Only on mobile devices ( Side bar is fixed for PC )
         */
        if (window.screen.width <= RESPONSIVE_WIDTH)
        {
            // Initial opacity value for side bar
            var value = 0;

            var sideBar = document.getElementById('sideBar');

            var interval = setInterval(() => {
                value += 0.01;

                sideBar.style.opacity = value;

                this.render();

                if (value > 1)
                {
                    clearInterval(interval);

                    // Render children when Fade transition is done
                    this.setState({ childRender: true });
                }

            }, 1);
        } else {

            // No fade transition for PC hence render children
            this.setState({ childRender: true });
        }
    }

    render() {

        var create = require('./images/cursor.svg');
        var erase = require('./images/eraser.svg');
        var play = require('./images/play.svg');
        var stop = require('./images/stop.svg');
        var github = require('./images/github.png');

        return (
            <div id="sideBar"> 
            
                {this.state.childRender && 
                
                    <React.Fragment>
                        
                        One Line is a puzzle where we connect dots and lines in a pattern.
                        Goal is to connect every dot and pass through every line exactly once.
                        <br />
                        <br />
                        This web app is an automation of one line puzzle.
                        <br />
                        <br />
                        Use <img id="infoIcons" src={create} /> to create a pattern on white canvas.
                        <br />
                        <br />
                        Use <img id="infoIcons" src={erase} /> to erase a dot and it's connecting lines.
                        <br />
                        <br />
                        Use <button id="infoIcons" className="btn btn-danger">Reset</button> to clear canvas.
                        <br />
                        <br />
                        When done with creating a pattern, use arrow to toggle tools.
                        <br />
                        <br />
                        Select a dot to start solving from.
                        <br />
                        <br />
                        Tap <img id="infoIcons" src={play} /> to start and <img id="infoIcons" src={stop} /> to stop.
                        <hr />
                        Developed by <u><i><b>Chetan Satpute</b></i></u>
                        <br />
                        <a href="https://github.com/Chetan-Satpute">
                            <img id="infoIcons" src={github} />
                        </a>

                    </React.Fragment> }
            
            </div>
        );
    }
}

export default SideBar;
