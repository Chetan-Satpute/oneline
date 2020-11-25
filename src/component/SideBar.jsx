import React from 'react';
import './css/sideBar.css';

class SideBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            childRender: false
        }
    }

    componentDidMount() {
        if (window.screen.width <= 800)
        {
            var value = 0;

            var sideBar = document.getElementById('sideBar');

            var interval = setInterval(() => {
                value += 0.01;

                sideBar.style.opacity = value;

                this.render();

                if (value > 1)
                {
                    clearInterval(interval);
                    this.setState({ childRender: true });
                }

            }, 1);
        } else {
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
