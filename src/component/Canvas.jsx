import React from 'react';
import * as helper from './js/canvasHelper';

class Canvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startNode: null,
            hoverSegment: null
        }

        this.mouseUp = helper.mouseUp.bind(this);
        this.mouseDown = helper.mouseDown.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.handleMove = helper.handleMove.bind(this);
        this.handleClick = helper.handleClick.bind(this);
    }

    componentDidMount() {

        // Get canvas and ctx
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');

        // Set display size (css pixels).
        this.canvas.style.width = this.canvas.offsetWidth + "px";
        this.canvas.style.height = this.canvas.offsetHeight + "px";

        // Set actual size in memory (scaled to account for extra pixel density).
        var scale = window.devicePixelRatio;
        this.canvas.width = Math.floor(this.canvas.offsetWidth * scale);
        this.canvas.height = Math.floor(this.canvas.offsetHeight * scale);

        // Normalise coordinate system to use css pixels.
        this.ctx.scale(scale, scale);
    }

    mouseMove(event) {
        
        // Represents that a node has been draged
        // Work around for issue described in handleClick
        if (this.drag) {
            this.moved = true;
        }

        this.handleMove(event);
    }

    render() {

        // Clear canvas context
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        // Render hoverSegment
        if (this.hoverSegment) { this.hoverSegment.draw(this.ctx) }

        // Render all segments
        this.props.segments.forEach(segment => {
            segment.draw(this.ctx);
        });

        // Render all nodes
        this.props.nodes.forEach(node => {
            node.draw(this.ctx);
        });

        if (this.props.nodes.length === 0) {
            this.startNode = null;
            this.hoverSegment = null;
        }

        return (
            <div id="canvasContainer">

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
