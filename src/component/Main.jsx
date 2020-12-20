import React from 'react';
import Control from './Control';
import Canvas from './Canvas';

class Main extends React.Component {

    render() {

        return (
            <main>
                
                <Canvas />
                
                <Control />
            
            </main>
        );
    }
}

export default Main;
