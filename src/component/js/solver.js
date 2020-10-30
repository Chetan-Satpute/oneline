class Solver {
    constructor(nodes, segments, render) {
        this.nodes = nodes;
        this.segments = segments;
        this.render = () => { render(this.nodes, this.segments) };

        // Stack of moves
        this.stack = this.neighbours(this.nodes[0]);
        
        // Set of explored segments
        this.explored = new Set();

        // Sequence in which moves are performed
        this.moveSequence = [];

        // Solution for current puzzle
        this.solution = [];
    }

    start() {

        // While stack is not empty
        while (this.stack.length) {

            // Get a move from stack
            var move = this.stack.pop();        // Pop a move from stack
            this.explored.add(move.segment);    // Mark segment as explored

            // Make a move
            this.moveSequence.push(move);       // Add move to move sequence
            this.solution.push(move);           // Add move to solution

            // Counter of available moves
            var count = 0;

            // Get all available moves
            this.neighbours(move.node).forEach(element => {

                // Add move to stack 
                // If segment is not already explored
                if (!this.explored.has(element.segment)) {
                    this.stack.push(element);
                    count += 1;
                }
            });

            // No available move
            if(!count) {
                
                if(this.won()) {

                    console.log("Won!!");
                    
                    // Render all moves taken to win
                    this.renderMove();
                    return;
                } else {
                    
                    // Retrieve
                    this.getBack();
                }
            }
        }

        // No solution possible
        console.log("No path possible!!");

        // Render all moves
        this.renderMove();

        // Retrieve to start node
        // TODO

    }

    getBack() {

        // Non empty stack
        if (this.stack.length) {

            // Get last move of stack and its start node
            var move = this.stack[this.stack.length-1];
            var startNode = move.segment.oppNode(move.node);

            // Retrieve until solution start node matches that of move
            while(this.solution.length) {
                var currMove = this.solution.pop();
                var currStart = currMove.segment.oppNode(currMove.node);

                this.moveSequence.push({
                    node: currMove.node,
                    segment: currMove.segment,
                    grow: false
                });

                this.explored.delete(currMove.segment);

                if (
                    currStart === startNode &&  
                    !this.explored.has(move.segment)
                ) { break }
            }
        }
    }

    renderSolution() {
        if (this.solution.length) {
            var move = this.solution.shift();
            
            this.flow(move.segment, move.node, this.renderSolution.bind(this));
        }
    }

    renderMove() {

        if (this.moveSequence.length) {
            var move = this.moveSequence.shift();

            if (move.grow) { this.flow(move.segment, move.node, this.renderMove.bind(this)) }
            else { this.retrieve(move.segment, move.node, this.renderMove.bind(this)) }
        } else if (this.won()) {

            // Reset and Render Solution
            this.reset();
            this.renderSolution();
        } else {
            
            // When No Solution
            // Render all segments as active red
            this.segments.forEach(segment => {
                segment.active = true;
                segment.flow.percent = 100;
                segment.color = "red";
            })
        }
    }

    won() {

        // Won when all segments are explored
        if (this.segments.length === this.explored.size) { return true }
        else { return false }
    }

    flow(segment, node, callBack) {
        segment.flow = {
            toNode: node,
            percent: 0
        };

        segment.active = true;
        segment.color = "green";

        var interval = setInterval(() => {
            segment.flow.percent += 1;

            if (segment.flow.percent === 100) {
                clearInterval(interval);
                callBack();
            }

            this.render();
        }, 10);
    }

    retrieve(segment, node, callBack) {
        segment.flow = {
            toNode: node,
            percent: 100
        }

        segment.active = true;
        segment.color = "red";

        var interval = setInterval(() => {
            segment.flow.percent -= 1;

            if (segment.flow.percent === 0) {
                clearInterval(interval);
                segment.active = false;
                callBack();
            }

            this.render();
        }, 10);
    }

    neighbours(node) {

        var neighbours = [];

        this.segments.forEach(segment => {

            if (segment.a === node) {
                neighbours.push({
                    node: segment.b,
                    segment: segment,
                    grow: true
                });
            } else if (segment.b === node) {
                neighbours.push({
                    node: segment.a,
                    segment: segment,
                    grow: true
                });
            }
        });

        return neighbours;
    }

    reset() {
        this.segments.forEach(segment => {
            segment.flow.percent = 0;
            segment.active = false;
        });
    }
}

export default Solver;
