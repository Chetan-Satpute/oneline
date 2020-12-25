import React from 'react';
import * as helper from './js/helper';

class Canvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nodes: [],
            segments: [],

            hoverSegment: null
        }

        this.handleClick = helper.handleClick.bind(this);
        this.handleMove = helper.handleMove.bind(this);
        this.mouseDown = helper.mouseDown.bind(this);
        this.mouseUp = helper.mouseUp.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
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

    mouseMove(event) {

        // When tool is active and node is dragged
        if (this.drag) {
            this.moved = true;
        }

        this.handleMove(event);
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

        // Deactivate startNode when pattern creation
        if (this.props.create && this.props.startNode) {
            var nodeList = this.state.nodes;

            nodeList[nodeList.indexOf(this.props.startNode)].selected = false;
            
            this.setState({ nodes: nodeList });
            this.props.updateStartNode(null);
        }

        return (
            <div id="canvascontainer">
                <canvas 
                    id="canvas"
                    onClick={this.handleClick} 
                    onMouseMove={this.mouseMove}
                    onMouseDown={this.mouseDown}
                    onMouseUp={this.mouseUp}
                    onTouchMove={this.handleMove}
                    onTouchStart={this.mouseDown}
                    onTouchEnd={this.mouseUp} >
                    Canvas not supported.
                </canvas>
            </div>
        );
    }
}

export default Canvas;
