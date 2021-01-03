import React from 'react';

class Control extends React.Component {

    render() {

        return (
            <div id="controlcontainer">

                <button
                    className={`btn btn-${this.props.play ? "danger":"primary"} cbtn m-3`}
                    onClick={() => {this.props.updatePlay(!this.props.play)}}
                    type="button" 
                    disabled={this.props.disablectrl}>
                    {this.props.play ? "Stop":"Solve"}
                </button>
                
            </div>
        );
    }
}

export default Control;
