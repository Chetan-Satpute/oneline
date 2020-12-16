import React from 'react';
import * as canvasHelper from './js/canvasHelper';
import * as helper from './js/helper';
import Controls from './Controls';

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

            play: true
        }
        
        this.updateToolStatus = helper.updateToolStatus.bind(this);
        this.updateBoard = helper.updateBoard.bind(this);
        this.resetBoard = helper.resetBoard.bind(this);

        this.handleClick = canvasHelper.handleClick.bind(this);
        this.handleMove = canvasHelper.handleMove.bind(this);
        this.mouseDown = canvasHelper.mouseDown.bind(this);
        this.mouseUp = canvasHelper.mouseUp.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        
        this.doneSolving = helper.doneSolving.bind(this);
        this.solve = helper.solve.bind(this);
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
