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
            toolStatus: true,

            startNode: null,

            tool: {
                'create': false,
                'erase': false,

                // when not in edit mode
                'select': true
            }
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
        if (this.drag) {
            this.moved = true;
        }

        this.handleMove(event);
    }

    handleMove(event) {

        var pos = utils.get_coordinates(this.canvas, event);
        var node = utils.node_overlap(this.state.nodes, pos);
        var nodeList = this.state.nodes;

        if (this.drag) {
            nodeList[nodeList.indexOf(this.drag)].moveTo(pos);
        }

        // Inactivate previous hover node
        // But not selected node
        if (this.hoverNode && this.hoverNode !== this.selected) {
            nodeList[nodeList.indexOf(this.hoverNode)].active = false;
        }

        if (node) {

            // Activate current node
            node.active = true;
            this.hoverNode = node;
            nodeList[nodeList.indexOf(node)] = node;
        }

        // When create tool is active
        if (this.state.tool.create) {
        
            // When tool Active show a segment that follow cursor
            if (!node) { node = new Node(pos) }
            if (this.selected) { this.hoverSegment = new Segment(this.selected, node) }
        }

        this.setState({ nodes: nodeList });
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

        if (this.state.tool.select) {
            
            var nodeList = this.state.nodes;
            var sNode = this.state.startNode;

            if (sNode && node) {
                nodeList[nodeList.indexOf(sNode)].startNode = false;
            }

            if (node) {
                sNode = node;
                nodeList[nodeList.indexOf(sNode)].startNode = true;
            }

            this.setState({ 
                nodes: nodeList, 
                startNode: sNode
            });
        }

        // When create tool is active
        if (this.state.tool.create) {

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
        }

        if (this.state.tool.erase) {

            // When erase tool is active
            if (node) { 
                nodeList.splice(nodeList.indexOf(node), 1) 
            
                segmentList = segmentList.filter((segment) => {
                    return ((segment.a !== node) && (segment.b !== node));
                });

                this.hoverNode = null;
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

        if (!this.state.startNode) {
            alert("Select a node to start solving!");
        } else {
            
            var model = new Solver(
                this.state.nodes, 
                this.state.segments, 
                this.updateBoard,
                this.state.startNode
            );
            model.start();
        }
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

    updateToolStatus(tool) {

        let toolStatus = this.state.tool;

        toolStatus = {
            'create': false,
            'erase': false,
            'select': false
        }

        if (this.state.startNode) {

            let nodeList = this.state.nodes;
            nodeList[nodeList.indexOf(this.state.startNode)].startNode = false;

            this.setState({ 
                nodes: nodeList,
                startNode: null 
            });
        }
        toolStatus[tool] = true;

        this.setState({ tool: toolStatus });
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
                    tool={this.state.tool}
                    updateToolStatus={this.updateToolStatus}
                    resetBoard={this.resetBoard}
                    edit={true} />

            </div>
        );
    }
}

export default Canvas;
