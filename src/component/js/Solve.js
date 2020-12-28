import React from 'react';
import Segment from './Segment';
import * as utils from './utils';

class Solve extends React.Component {
    constructor(props) {
        super(props);

        // Stack of moves (for Depth First Search)
        this.stack = [];

        // Set of explored segments
        this.explored = new Set();

        // Moves made to solve the pattern
        this.moves = [];

        // Solution of pattern
        this.solution = [];

        this.makeMove = utils.makeMove.bind(this);
        this.step = this.step.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);

        this.solving = true;
    }

    componentDidMount() {
        
        // Solving starts here
        console.log("Solving...");

        // Reset
        this.reset();

        this.stack = this.availableMoves(this.props.startNode);

        this.step();

    }

    step() {

        // Solving in process
        if (this.solving) {

            if (this.moves.length) {
    
                // If there is a move to be rendered before next move
                // Render retrieve moves
    
                var m = this.moves.pop();
                this.makeMove(m, this.step);
            
            } else if (this.stack.length) {
    
                // Make a Move
    
                console.log(this.stack);
    
                var move = this.stack.pop();
    
                this.makeMove(move, this.step);
                
                this.explored.add(move.segment);
    
                this.solution.push(move);
    
                var availMoves = this.availableMoves(move.endNode);
    
                if (availMoves.length) {
    
                    availMoves.forEach(m => {
    
                        m.cost = move.cost + 1;
                        this.stack.push(m);
                    });
    
                } else if (this.won()) {
    
                    console.log("Won!");
    
                    this.props.updatePlay(false);
                } else {
    
                    // Retrieve
                    if (this.stack.length) {
    
                        // Upcoming move
                        var m = this.stack[this.stack.length - 1];
                        
                        while(this.solution.length) {
    
                            var curr = this.solution.pop();
                            curr.grow = false;
    
                            this.moves.unshift(curr);
    
                            this.explored.delete(curr.segment);
    
                            if (
                                this.explored.size === m.cost
                            ) { break }
                        }
                    }
                }
            } else if (!this.won()) {
                
                // If not won
                // Render all segments as red
    
                var segments = this.props.segments;
    
                segments.forEach(segment => {
                    segment.color = "red";
                    segment.active = true;
                    segment.flow = {
                        endNode: segment.a,
                        percent: 100
                    }
                });
    
                this.props.render(this.props.nodes, this.props.segments);
    
                this.props.updatePlay(false);
            }
        } else {

            // Solving is done
            // Clear canvas
            this.reset();
        }
    }

    componentWillUnmount() {

        // Solving stops here
        console.log("component did unmount was called!");

        this.solving = false;
    }

    won() { return this.explored.size === this.props.segments.length }

    availableMoves(node) {

        var availMoves = [];
        var move;

        this.props.segments.forEach(segment => {

            if (!this.explored.has(segment)) {

                if (segment.a === node) {

                    move = {
                        segment: segment,
                        endNode: segment.b,
                        grow: true,
                        cost: 0
                    }

                    availMoves.push(move);
                } else if (segment.b === node) {

                    move = {
                        segment: segment,
                        endNode: segment.a,
                        grow: true,
                        cost: 0
                    }

                    availMoves.push(move);
                }
            }
        });

        return availMoves;
    }

    reset() {

        var segments = this.props.segments;

        segments.forEach(segment => {
            segment.active = false;
            segment.flow = false;
        });

        this.props.render(this.props.nodes, segments);
    }

    render() { return null }
}

export default Solve;
