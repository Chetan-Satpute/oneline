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
        this.mouseMove = this.mouseMove.bind(this);
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

    mouseMove(event) {

        var pos = utils.get_coordinates(this.canvas, event);
        var node = utils.node_overlap(this.state.nodes, pos);
        var nodeList = this.state.nodes;

        // When tool Active show a segment that follow cursor
        if(!node) { node = new Node(pos) }
        if(this.toolStart) { this.hoverSegment = new Segment(this.toolStart, node) }

        // Inactivate previous hover node except start node
        if (this.hoverNode && this.hoverNode !== this.toolStart) {
            nodeList[nodeList.indexOf(this.hoverNode)].active = false;
        }

        // If cursor on node other than start node
        // Activate node
        if (node && node !== this.toolStart) {
            this.hoverNode = node;
            this.hoverNode.active = true;

            // Update State
            nodeList[nodeList.indexOf(node)] = this.hoverNode;
        }

        this.setState({ nodes: nodeList });
    }

    handleClick(event) {

        var pos = utils.get_coordinates(this.canvas, event);    // Currnet position
        var node = utils.node_overlap(this.state.nodes, pos);   // node on current position or false
        var nodeList = this.state.nodes;

        // Create a new node on current position
        if (!node) {

            node = new Node(pos);

            // Add new node in list of existing nodes 
            nodeList.push(node);
            this.setState({ nodes: nodeList });
        }

        if (this.tool) {
            // When tool is active

            // End node and start node are different
            if (node !== this.toolStart) {

                var segment = new Segment(this.toolStart, node);

                // Add new segment to state
                var segmentList = this.state.segments;
                segmentList.push(segment);
                this.setState({ segments: segmentList });

                // Inactive end nodes of segment
                nodeList[nodeList.indexOf(this.toolStart)].active = false;
                nodeList[nodeList.indexOf(node)].active = false;
                this.setState({ nodes: nodeList });
            }

            // Reset tool
            this.tool = false;
            this.toolStart = null;
            this.hoverSegment = null;

        } else {
            // When tool is inactive

            node.active = true;
            this.tool = true;
            this.toolStart = node;
        }

        this.render();
    }


    render() {

        // Clear canvas context
        if (this.ctx) {
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

        // Render hoverSegment
        if(this.hoverSegment) { this.hoverSegment.draw(this.ctx) }

        return (
            <canvas
                id="canvas"
                onMouseMove={this.mouseMove}
                onClick={this.handleClick}>
                Canvas not supported.
            </canvas>
        );
    }
}

export default Canvas;
