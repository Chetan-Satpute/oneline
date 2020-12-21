import React from 'react';

export class NewCard extends React.Component {

    render() {

        return (
            <button
                className="btn btn-primary bg-gradient m-2 p-2"
                onClick={() => { this.props.onClick(true) }}
                type="button">
                <span><b>Create Pattern</b></span>
            </button>
        );
    }
}

export class Card extends React.Component {

    // use keys to render particular pattern in canvas
    // canvas has id based on key
    // which will make it possible for it to render particular pattern
    // key must be returned with on click to render correct board

    render() {

        return (
            <div className="p-1">
                <div
                    onClick={() => { this.props.onClick(true) }} 
                    className="card btn m-1">
                    <canvas>

                    </canvas>
                </div>
            </div>
        );
    }
}
