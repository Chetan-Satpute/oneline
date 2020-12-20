import React from 'react';
import NavBar from './NavBar';
import Main from './Main';
import './css/app.css';

class App extends React.Component {

    render() {
        return (
            <React.Fragment>
                
                <NavBar />

                <Main />

            </React.Fragment>
        );
    }
}

export default App;
