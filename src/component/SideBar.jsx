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

        return (
            <div id="sideBar"> 
            
                {this.state.childRender && 
                
                    <React.Fragment>
                        
                        This is sidebar.

                    </React.Fragment> }
            
            </div>
        );
    }
}

export default SideBar;
