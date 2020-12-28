import React from 'react';
import './css/control.css';

class Control extends React.Component {

    render() {

        return (
            <div id="controlcontainer">
                
                {this.props.create 
                ? <ControlButtonPannel>
                    
                    <ControlButton 
                        text="Start Solving"
                        color="primary"
                        onClick={() => {this.props.updateCreate(true, false)}} />

                </ControlButtonPannel>
                : <ControlButtonPannel>

                    <ControlButton
                        text="Solution"
                        color="primary" />

                    <ControlButton
                        text={this.props.play ? "Stop":"Play"}
                        color={this.props.play ? "danger":"primary"}
                        onClick={() => {this.props.updatePlay(!this.props.play)}} />

                    <ControlButton
                        text="Edit"
                        color="primary"
                        onClick={() => {this.props.updateCreate(true, true)}} />
                
                </ControlButtonPannel> }

            </div>
        );
    }
}

class ControlButtonPannel extends React.Component {

    render() {

        return (
            <div className="cbtnpannel">
                
                {this.props.children}
            
            </div>
        );
    }
}

class ControlButton extends React.Component {

    render() {
        
        return (
            <div className="cbtncontainer">
                <button 
                    className={`btn btn-${this.props.color} cbtn m-3`}
                    onClick={this.props.onClick}
                    type="button" >
                    {this.props.text}
                </button>
            </div>
        );
    }
}

export default Control;
