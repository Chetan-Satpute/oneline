import React from 'react';
import Canvas from './Canvas';
import NavBar from './NavBar';
import SideBar from './SideBar';
import './css/app.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sideBar: window.screen.width > 800
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

                    <Canvas />

                </div>

            </React.Fragment>
        );
    }
}

export default App;
