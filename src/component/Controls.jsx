import React from 'react';
import './css/controls.css';

class Controls extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: this.props.edit
        }

        this.switchEdit = this.switchEdit.bind(this);
    }

    switchEdit() {
        this.setState({ edit: !this.state.edit });
    }

    render() {
        return (
            <div id="controlContainer">

                <EditButton
                    switchEdit={this.switchEdit} />
                
                {/* Render Solve button when not editing */}
                { this.state.edit 
                
                    ? <React.Fragment>
                        <button
                            type="button"
                            className="btn btn-dark controlBtn">
                            Select        
                        </button>
                        <button
                            type="button"
                            className="btn btn-dark controlBtn">
                            Tool        
                        </button>
                        <button
                            type="button"
                            className="btn btn-dark controlBtn">
                            Erase        
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger controlBtn">
                            Reset
                        </button>
                    </React.Fragment>        
                    : <button 
                        type="button"
                        id="solve"
                        className="btn btn-success controlBtn"
                        onClick={this.props.solve}>
                        Solve
                    </button> }

            </div>
        );
    }
}

function EditButton(props) {
    return (
        <div 
            id="editButton"
            className={window.innerWidth <= 800 ? "dropright" : ""}>
            <button
                type="button"
                style={{ height: "100%" }}
                className="btn btn-secondary controlBtn dropdown-toggle"
                onClick={props.switchEdit} >
                <b>Edit</b>
            </button>
        </div>
    )
}

export default Controls;
