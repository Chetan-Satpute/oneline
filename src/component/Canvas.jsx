import React from 'react';
import Node from './js/node';
import Segment from './js/segment';

class Canvas extends React.Component {

    componentDidMount() {

        var canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');

        // Set display size (css pixels).
        canvas.style.width = canvas.offsetWidth + "px";
        canvas.style.height = canvas.offsetHeight + "px";

        // Set actual size in memory (scaled to account for extra pixel density).
        var scale = window.devicePixelRatio;
        canvas.width = Math.floor(canvas.offsetWidth * scale);
        canvas.height = Math.floor(canvas.offsetHeight * scale);

        // Normalise coordinate system to use css pixels.
        this.ctx.scale(scale, scale);

    }

    render() {
        return (
            <canvas id="canvas">
                Canvas not supported.
            </canvas>
        );
    }
}

export default Canvas;
