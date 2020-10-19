import React from 'react';
import Node from './js/node';
import Segment from './js/segment';
import * as utils from './js/utils';

class Canvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nodes: [],
            segments: [],
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {

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


    handleClick(event) {

        var pos = utils.get_coordinates(this.canvas, event);    // Get current coordinates of mouse
        var nodeColor = "#50A";                                 // Color of new node

        var node = new Node(pos.x, pos.y);
        
        // Update State
        var nodeList = this.state.nodes;
        nodeList.push(node);
        this.setState({ nodes: nodeList });

        // Render node
        node.draw(this.ctx, nodeColor);
    }


    render() {

        return (
            <canvas 
                id="canvas"
                onClick={this.handleClick}>
                Canvas not supported.
            </canvas>
        );
    }
}

export default Canvas;
