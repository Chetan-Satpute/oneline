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

                        <ControlButton
                            title="Select"
                            color="dark" 
                            active={this.props.status.select}
                            onClick={() => { this.props.updateToolStatus('select') }} />
                        
                        <ControlButton
                            title="Create"
                            color="dark" 
                            active={this.props.status.create}
                            onClick={() => { this.props.updateToolStatus('create') }} />

                        <ControlButton
                            title="Erase"
                            color="dark"
                            active={this.props.status.erase}
                            onClick={() => { this.props.updateToolStatus('erase') }} />

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
                type="button"
                style={{ height: "100%" }}
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
            {props.title}
        </button>
    );
}

export default Controls;
