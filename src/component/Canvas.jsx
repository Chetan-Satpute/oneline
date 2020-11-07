import React from 'react';
import Node from './js/node';
import Segment from './js/segment';
import * as utils from './js/utils';
import Controls from './Controls';
import Solver from './js/solver';

class Canvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nodes: [],
            segments: [],
            toolStatus: true
        }
        
        this.updateBoard = this.updateBoard.bind(this);
        this.resetBoard = this.resetBoard.bind(this);
        this.updateToolStatus = this.updateToolStatus.bind(this);
        
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleMove = this.handleMove.bind(this);
        
        this.solve = this.solve.bind(this);
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

        // When tool is active and node is dragged
        if (this.state.toolStatus && this.drag) {
            this.moved = true;
        }

        this.handleMove(event);
    }

    handleMove(event) {

        var pos = utils.get_coordinates(this.canvas, event);
        var node = utils.node_overlap(this.state.nodes, pos);
        var nodeList = this.state.nodes;

        // When create tool is active
        if (this.state.toolStatus) {

            if (this.drag) {

                nodeList[nodeList.indexOf(this.drag)].moveTo(pos);
                
            } else {
            
                // When tool Active show a segment that follow cursor
                if (!node) { node = new Node(pos) }
                if (this.selected) { this.hoverSegment = new Segment(this.selected, node) }

                // Inactivate previous hover node except start node
                if (this.hoverNode && this.hoverNode !== this.selected) {
                    nodeList[nodeList.indexOf(this.hoverNode)].active = false;
                }

                // If cursor on node other than start node
                // Activate node
                if (node && node !== this.selected) {
                    this.hoverNode = node;
                    this.hoverNode.active = true;

                    // Update State
                    nodeList[nodeList.indexOf(node)] = this.hoverNode;
                }

            }
            
            this.setState({ nodes: nodeList });
        }
    }

    handleClick(event) {

        var pos = utils.get_coordinates(this.canvas, event);    // Current position
        var node = utils.node_overlap(this.state.nodes, pos);   // node on current position or false
        
        var nodeList = this.state.nodes;
        var segmentList = this.state.segments;

        /*
         * When a node is draged following events are fired
         *      1. mouseDown
         *      2. mouseMove
         *      3. mouseUp
         *      4. click
         * 
         * Click event starts creation of a new segment
         * moved flag is a work around to prevent 
         * click event to start a new segment creation
         * 
         * On touch drag click is not fired at last
         * hence, first click just after drag will be ineffective
         * 
         * ********* Find better implementation **************
         */
        if (this.moved) {
            this.moved = false;
            return;
        }

        // When create tool is active
        if (this.state.toolStatus) {

            // Create a new node at current position
            // If it does not exist already
            if (!node) {
                node = new Node(pos);

                // Add new node in list of existing nodes
                nodeList.push(node);
                this.setState({ nodes: nodeList });
            }

            if (this.selected) {

                // Start node and end node of segment being created must be different
                if (this.selected !== node) {
                    var segment = new Segment(this.selected, node);

                    if (!utils.checkSegment(segmentList, segment)) {

                        // Add new segment to state
                        segmentList.push(segment);
                        this.setState({ segments: segmentList });
                    }

                    // Inactive both end nodes of segment
                    nodeList[nodeList.indexOf(this.selected)].active = false;
                    nodeList[nodeList.indexOf(node)].active = false;
                    this.setState({ nodes: nodeList });
                }

                // Reset tool
                this.selected = null;
                this.hoverSegment = null;
            } else {

                // Start creating segment at current node
                node.active = true;
                this.selected = node;
            }
        } else {

            // When erase tool is active
            if (node) { 
                nodeList.splice(nodeList.indexOf(node), 1) 
            
                segmentList = segmentList.filter((segment) => {
                    return ((segment.a !== node) && (segment.b !== node));
                });
            }

            this.setState({ nodes: nodeList, segments: segmentList });
        }
    }

    mouseDown(event) { 

        var pos = utils.get_coordinates(this.canvas, event);    // Currnet position
        var node = utils.node_overlap(this.state.nodes, pos);   // node on current position or false

        if (node) { this.drag = node }
    }

    mouseUp(e) { this.drag = false }

    solve() {

        var model = new Solver(this.state.nodes, this.state.segments, this.updateBoard);
        model.start();
    }

    updateBoard(nodes, segments) {
        this.setState({ nodes: nodes, segments: segments });
        this.canvasDraw();
    }

    canvasDraw() {
        // Clear canvas context
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        // Render hoverSegment
        if (this.hoverSegment) { this.hoverSegment.draw(this.ctx) }

        // Render all segments
        this.state.segments.forEach(segment => {
            segment.draw(this.ctx);
        });

        // Render all nodes
        this.state.nodes.forEach(node => {
            node.draw(this.ctx);
        });
    }

    updateToolStatus(status) {
        this.setState({ toolStatus: status });
    }

    resetBoard() {
        this.setState({ nodes: [], segments: [] });
        this.selected = null;
        this.hoverNode = null;
        this.hoverSegment = null;
    }

    render() {

        this.canvasDraw();

        return (

            <div id="home">

                <div id="canvasContainer">
                    <canvas
                        id="canvas"
                        onMouseMove={this.mouseMove}
                        onClick={this.handleClick}
                        onMouseDown={this.mouseDown}
                        onMouseUp={this.mouseUp}
                        onTouchMove={this.handleMove}
                        onTouchStart={this.mouseDown}
                        onTouchEnd={this.mouseUp} >
                        Canvas not supported.
                    </canvas>
                </div>

                <Controls
                    solve={this.solve}
                    status={this.state.toolStatus}
                    updateToolStatus={this.updateToolStatus}
                    resetBoard={this.resetBoard}
                    edit={true} />

            </div>
        );
    }
}

export default Canvas;
