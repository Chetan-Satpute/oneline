import React from 'react';
import Canvas from './Canvas';
import Controls from './Controls';
import NavBar from './NavBar';
import SideBar from './SideBar';
import './css/app.css';

class App extends React.Component {

    render() {
        return (
            <React.Fragment>

                <NavBar />

                <div id="main">

                    <SideBar />

                    <div id="home">

                        <div id="canvasContainer">
                            <Canvas />
                        </div>

                        <div id="controlContainer">
                            <Controls />
                        </div>

                    </div>

                </div>

            </React.Fragment>
        );
    }
}

export default App;
