import React from 'react';

class Controls extends React.Component {

    render() {
        return (
            <div>
                <button 
                    type="button"
                    onClick={this.solve}>
                    Solve
                </button>
            </div>
        );
    }
}

export default Controls;
