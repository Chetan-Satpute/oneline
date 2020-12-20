import React from 'react';

class Canvas extends React.Component {

    componentDidMount() {

        // Get canvas and context
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');

        // Set display size (css pixels)
        this.canvas.style.width = this.canvas.offsetWidth + "px";
        this.canvas.style.height = this.canvas.offsetHeight + "px";

        // // Set actual size in memory (scaled to account for extra pixel density)
        var scale = window.devicePixelRatio;
        this.canvas.width = Math.floor(this.canvas.offsetWidth * scale);
        this.canvas.height = Math.floor(this.canvas.offsetHeight * scale);

        // Normalise coordinate system to use css pixels
        this.ctx.scale(scale, scale);
  
    }

    render() {

        return (
            <div id="canvascontainer">
                <canvas id="canvas">
                    Canvas not supported.
                </canvas>
            </div>
        );
    }
}

export default Canvas;
