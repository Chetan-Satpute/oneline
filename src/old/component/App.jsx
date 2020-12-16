import React from 'react';
import Board from './Board';
import NavBar from './NavBar';
import SideBar from './SideBar';
import './css/app.css';

export var RESPONSIVE_WIDTH = 800;

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            /*
             * Represents side bar open / close state
             * 
             * Side bar is open by default on wide screens ( PC )
             * 
             * Side bar is closed by default on small screens ( mobile devices )
             */
            sideBar: window.screen.width > RESPONSIVE_WIDTH
        }

        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    toggleSidebar() {
        this.setState({ sideBar: !this.state.sideBar });
    }

    render() {
        return (
            <React.Fragment>

                <NavBar
                    sideBar={this.state.sideBar}
                    toggleSidebar={this.toggleSidebar} />

                <div id="main">

                    {this.state.sideBar && <SideBar />}

                    <Board />

                </div>

            </React.Fragment>
        );
    }
}

export default App;
