class Solver{
    constructor(nodes, segments, render, startNode, done) {

        // Pattern
        this.nodes = nodes;
        this.segments = segments;
        
        // Render current state
        this.render = () => { render(this.nodes, this.segments) };
        
        // Node from which to start solving
        this.startNode = startNode;

        // Stack of moves
        this.stack = [];

        // Set of explored segments
        this.explored = new Set();

        // Moves made to solve the pattern
        this.moves = [];

        // Soution of pattern
        this.solution = [];

        // Function to call when done solving
        this.done = done;
        this.play = true;
    }

    start() {
        /**
         * Solve pattern starting from startNode
         * 
         * Prepare moves (List of moves taken)
         * Prepare solution (Solution of pattern)
         */

        // Stack has all possible moves from first node
        this.stack = this.availableMoves(this.startNode);

        while(this.stack.length) {

            // Make a move
            var move = this.stack.pop();
            this.explored.add(move.segment);


            this.moves.push(move);
            this.solution.push(move);

            var availMoves = this.availableMoves(move.end);
            
            if (availMoves.length) {

                availMoves.forEach(m => {

                    m.cost = move.cost + 1;
                    this.stack.push(m)
                });
            } else if (this.won()) {
                
                console.log("Won!");
                break;
            } else {
                
                // Retrieve
                this.retrieve();
            }
        }

        // Render moves
        this.renderMoves();
    }

    stop() {
        /**
         * Pause currently running solution
         * Reset the pattern (no color highlights)
         */
        
        this.play = false;
    }

    won() { return this.explored.size === this.segments.length }

    retrieve() {

        if (this.stack.length) {
            
            // Upcoming move
            var move = this.stack[this.stack.length-1];
            
            while(this.solution.length) {
                
                var curr = this.solution.pop();

                this.moves.push(new Move(
                    curr.start,
                    curr.segment,
                    curr.end,
                    false,
                    this.render
                ));

                this.explored.delete(curr.segment);

                if (
                    curr.start === move.start &&
                    this.explored.size === move.cost
                ) { break }
            }
        }
    }

    renderMoves() {

        if(this.play) {
            
            if (this.moves.length) {
    
                // Render all moves
    
                var move = this.moves.shift();
        
                move.makeMove(this.renderMoves.bind(this));
            } else if (this.won()) {
    
                // Render Solution
    
                this.reset();
                this.renderSolution();
            } else {
    
                // Render all segments red
    
                this.segments.forEach(segment => {
                    segment.active = true;
                    segment.color = "red";
                    segment.grow = {
                        endNode: segment.a,
                        percent: 100
                    }
                });
    
                this.done();
            }
        } else {
            this.reset();
        }
    }

    renderSolution() {

        if (this.solution.length) {

            var move = this.solution.shift();

            move.makeMove(this.renderSolution.bind(this));
        } else {

            this.done();
        }
    }

    availableMoves(node) {
        /**
         * Return a list of available moves from current nodes
         * 
         * Exclude moves that are already been taken
         * 
         * A move is considered explored when its segment is explored
         */

        var availMoves = [];
        var move;

        this.segments.forEach(segment => {
            
            if (!this.explored.has(segment)) {
                
                if (segment.a === node) {
                    move = new Move(segment.a, segment, segment.b, true, this.render);
    
                    availMoves.push(move);
                } else if (segment.b === node) {
                    move = new Move(segment.b, segment, segment.a, true, this.render);
                
                    availMoves.push(move);
                }
            }
        });
        
        return availMoves;
    }

    reset() {

        this.segments.forEach(segment => {
            segment.active = false;
            segment.grow = false;
        });
    }
}

class Move {
    constructor(start, segment, end, grow, render) {
        
        this.start = start;
        this.end = end;
        this.segment = segment;
        this.grow = grow;

        this.cost = 0;

        this.render = render;
    }

    makeMove(callBack) {

        this.segment.active = true;
        
        if (this.grow) {

            this.segment.grow = {
                endNode: this.end,
                percent: 0
            };
            
            this.segment.color = "green";

            var interval = setInterval(() => {
            
                this.segment.grow.percent += 1;
    
                if (this.segment.grow.percent === 100) {
                    
                    clearInterval(interval);
                    callBack();
                }
    
                this.render();
            }, 1);
        } else {

            this.segment.grow = {
                endNode: this.end,
                percent: 100
            };
            
            this.segment.color = "red";

            interval = setInterval(() => {
            
                this.segment.grow.percent -= 1;
    
                if (this.segment.grow.percent === 0) {
                    
                    this.segment.active = false;
                    clearInterval(interval);
                    callBack();
                }
    
                this.render();
            }, 1);
        }
    }
}

export default Solver;
