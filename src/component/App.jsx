import React from 'react';
import NavBar from './NavBar';
import Main from './Main';
import './css/app.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            board: false
        }

        this.showBoard = this.showBoard.bind(this);
    }

    showBoard(value) { this.setState({ board: value }) }

    render() {
        return (
            <React.Fragment>
                
                <NavBar 
                    board={this.state.board} 
                    showBoard={this.showBoard} />

                <Main 
                    board={this.state.board} 
                    showBoard={this.showBoard} />

            </React.Fragment>
        );
    }
}

export default App;
