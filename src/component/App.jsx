import React from 'react';
import Canvas from './Canvas';
import Controls from './Controls';
import NavBar from './NavBar';
import './css/app.css';

class App extends React.Component {
    
    render() {
        return (
            <div id="home">

                <NavBar />

                <div id="canvasContainer">
                    <Canvas />
                </div>

                <div id="controlContainer">
                    <Controls />
                </div>

            </div>
        );
    }
}

export default App;
