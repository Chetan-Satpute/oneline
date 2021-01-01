import React from 'react';
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
        this.preStep = this.preStep.bind(this);
        this.step = this.step.bind(this);

        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);

        // Odd count for theorem test
        this.oddNodes = [];

        this.solving = true;
    }

    componentDidMount() {

        // Reset
        this.props.reset();

        if (this.props.nodes.length === 0 || this.props.segments.length === 0) {
            alert("Please Draw a pattern!!");

            this.props.updatePlay(false);
            return;
        } else {

            // Iterator for Nodes list in prestep function
            this.it = 0;
            this.preStep();
        }
    }

    /**
     * 
     * Theorem:
     *      A connected graph G has an Euler walk 
     *          if and only if 
     *      Precisely 0 or 2 nodes in G have odd degree
     * 
     */
    preStep() {
        /**
         * Check degree of all nodes
         * Push nodes with odd degree in this.oddNodes
         */

        if (this.it === 0) {

            // Disable controll buttons until All nodes are analysed
            this.props.updateDisableAll(true);
        }

        if (this.it < this.props.nodes.length) {

            utils.renderSelected(
                this.preStep, 
                this.props.nodes,
                this.props.segments, 
                this.it, 
                this.props.render
            );

            if (this.props.nodes[this.it].degree % 2 !== 0) {
                this.oddNodes.push(this.props.nodes[this.it]);
            }

            this.it = this.it + 1;
        } else {

            /**
             * If there are exactly 2 or 0 nodes with odd degree
             * A solution is possible Hence call step to find solution
             * 
             * Else no solution possible
             */
            if (this.oddNodes.length === 2) {

                this.props.updateStartNode(this.oddNodes[0]);
                this.stack = this.availableMoves(this.oddNodes[0]);
                this.step();
            } else if (this.oddNodes.length === 0) {

                this.props.updateStartNode(this.props.nodes[0]);
                this.stack = this.availableMoves(this.props.nodes[0]);
                this.step();
            } else {

                utils.noSolution(
                    this.props.nodes, 
                    this.props.segments, 
                    this.props.render, 
                    this.props.updatePlay
                );
            }

            this.it = 0;

            // Enable controll buttons after traversal of all nodes is done
            this.props.updateDisableAll(false);
        }
    }

    step() {

        if (this.solving) {

            if (this.moves.length) {
    
                // If there is a move to be rendered before next move
                // Render retrieve moves
    
                var m = this.moves.pop();
                this.makeMove(m, this.step, this.props.nodes, this.props.segments, this.props.render);
            
            } else if (this.stack.length) {
    
                // Make a Move
                var move = this.stack.pop();
                this.makeMove(move, this.step, this.props.nodes, this.props.segments, this.props.render);
    
                this.explored.add(move.segment);
                this.solution.push(move);
    
                var availMoves = this.availableMoves(move.endNode);
                if (availMoves.length) {
    
                    availMoves.forEach(m => {
    
                        m.cost = move.cost + 1;
                        this.stack.push(m);
                    });
    
                } else if (this.won()) {
    
                    this.props.updateSolution(this.solution);
                    this.solving = false;
                } else {
    
                    // Retrieve
                    if (this.stack.length) {
    
                        // Upcoming move
                        m = this.stack[this.stack.length - 1];
                        
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
            }
        }
    }

    componentWillUnmount() {

        // Solving stops here
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

    render() { return null }
}

export default Solve;
