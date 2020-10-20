import React from 'react';
import Node from './js/node';
import Segment from './js/segment';
import * as utils from './js/utils';

class Canvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nodes: [],
            segments: []
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

        var pos = utils.get_coordinates(this.canvas, event);    // Get current mouse coordinates

        var node = utils.node_overlap(this.state.nodes, pos);   // Check if node overlaps an existing node

        /* 
        *   If current position does not coincide with an existing node
        *   Create a new node
        */
        if(!node) {

            node = new Node(pos.x, pos.y);
        
            // Update State
            var nodeList = this.state.nodes;
            nodeList.push(node);
            this.setState({ nodes: nodeList });
        }

        if(this.tool) {
            // When tool is active

            // When end node is same as start node
            if (node.active) { node.active = false }
            else {

                var segment = new Segment(this.segmentStart, node);

                // Add new segment to state
                var segmentList = this.state.segments;
                segmentList.push(segment);
                this.setState({ segments: segmentList });
                
                // Inactive end nodes of segment
                var nodeList = this.state.nodes;
                nodeList[nodeList.indexOf(this.segmentStart)].active = false;
                nodeList[nodeList.indexOf(node)].active = false;
                this.setState({ nodes: nodeList });
            }

            // Reset tool
            this.tool = false;
            this.segmentStart = null;
            
        } else {
            // When tool is inactive
            
            node.active = true;
            this.tool = true;
            this.segmentStart = node;
        }

        this.render();
    }


    render() {

        // Clear canvas context
        if(this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        // Render all segments
        this.state.segments.forEach(segment => {
            segment.draw(this.ctx);
        });
        
        // Render all nodes
        this.state.nodes.forEach(node => {
            node.draw(this.ctx);
        });
        
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
