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

        if (this.state.edit) { this.props.updateToolStatus('select') }
        else { this.props.updateToolStatus('create') }
        this.setState({ edit: !this.state.edit });
    }

    render() {

        var erase = require('./images/eraser.svg');
        var create = require('./images/cursor.svg');

        return (
            <div id="controlContainer">

                <EditButton
                    switchEdit={this.switchEdit} />
                
                {/* Render Solve button when not editing */}
                { this.state.edit 
                
                    ? <React.Fragment>

                        <ControlButton
                            color="dark" 
                            active={this.props.tool.create}
                            onClick={() => { this.props.updateToolStatus('create') }} >
                            <img 
                                className="controlIcons" 
                                src={create}
                                alt="Create" />
                        </ControlButton>

                        <ControlButton
                            color="dark"
                            active={this.props.tool.erase}
                            onClick={() => { this.props.updateToolStatus('erase') }} >
                            <img 
                                className="controlIcons" 
                                src={erase}
                                alt="Erase" />
                        </ControlButton>

                        <ControlButton
                            title="Reset"
                            color="danger"
                            onClick={this.props.resetBoard} />

                    </React.Fragment>

                    : <ControlButton
                        title="Solve"
                        color="success"
                        onClick={this.props.solve} /> }

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
                id="editButton"
                type="button"
                className="btn btn-secondary controlBtn dropdown-toggle"
                onClick={props.switchEdit} >
                <b>Edit</b>
            </button>
        </div>
    )
}

function ControlButton(props) {
    return (
        <button
            type="button"
            className={`btn btn-${props.color} controlBtn ${props.active ? "active":""}`}
            onClick={props.onClick} >
            {props.title && props.title}
            {props.children}
        </button>
    );
}

export default Controls;
