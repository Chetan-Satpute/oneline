import React from 'react';
import Node from './js/node';
import Segment from './js/segment';
import * as utils from './js/utils';
import * as helper from './js/canvasHelper';
import Controls from './Controls';
import Solver from './js/solver';

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nodes: [],          // List of Nodes
            segments: [],       // List of Segments

            startNode: null,
            hoverSegment: null,

            tool: {
                
                // When in edit mode
                'create': false,
                'erase': false,
                
                // when not in edit node
                'select': true
            },
            toolStatus: true,

            play: true
        }
        
        this.updateBoard = this.updateBoard.bind(this);
        this.resetBoard = this.resetBoard.bind(this);
        this.updateToolStatus = this.updateToolStatus.bind(this);

        this.mouseUp = helper.mouseUp.bind(this);
        this.mouseDown = helper.mouseDown.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.handleMove = helper.handleMove.bind(this);
        this.handleClick = helper.handleClick.bind(this);
        
        this.solve = this.solve.bind(this);
        this.doneSolving = this.doneSolving.bind(this);
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

    solve() {

        if (this.state.play) {

            if (!this.state.startNode) {
                alert("Select a node to start solving!");
            } else {
       
                this.model = new Solver(
                    this.state.nodes, 
                    this.state.segments, 
                    this.updateBoard,
                    this.state.startNode,
                    this.doneSolving
                );
                
                this.model.start();
    
                this.setState({ play: false });
            }
        } else {

            this.model.stop();
            this.doneSolving();
        }
    }

    doneSolving() {

        this.setState({ play: true });
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
        if (this.state.hoverSegment) { this.state.hoverSegment.draw(this.ctx) }

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

                <Controls
                    solve={this.solve}
                    tool={this.state.tool}
                    updateToolStatus={this.updateToolStatus}
                    resetBoard={this.resetBoard}
                    play={this.state.play}
                    edit={true} />

            </div>
        );
    }
}

export default Board;
