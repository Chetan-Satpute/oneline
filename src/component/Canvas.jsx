import React from 'react';
import * as helper from './js/helper';

class Canvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nodes: [],
            segments: []
        }

    }
    
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

        // Clear canvas context
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = "#ffffff";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }

        // Render hoverSegment
        if (this.state.hoverSegment) { this.state.hoverSegment.draw(this.ctx) }

        // Render all segments
        this.state.segments.forEach(segment => {
            segment.draw(this.ctx);
        });

        // Render all nodes
        this.state.nodes.forEach(node => {
            node.draw(this.ctx);
        });
        
        return (
            <div id="canvascontainer">
                <canvas 
                    id="canvas"
                    onMouseDown={this.mouseDown}
                    onMouseUp={this.mouseUp}
                    onMouseMove={this.mouseMove}
                    onTouchStart={this.mouseDown}
                    onTouchEnd={this.mouseUp}
                    onTouchMove={this.handleMove}
                    onClick={this.handleClick} >
                    Canvas not supported.
                </canvas>
            </div>
        );
    }
}

export default Canvas;
