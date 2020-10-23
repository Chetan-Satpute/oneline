import React from 'react';

class Controls extends React.Component {

    render() {
        return (
            <div>
                <button 
                    type="button"
                    onClick={this.props.solve}>
                    Solve
                </button>
            </div>
        );
    }
}

export default Controls;
