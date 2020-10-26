class Solver {
    constructor(nodes, segments, render) {
        this.nodes = nodes;
        this.segments = segments;
        this.render = () => { render(this.nodes, this.segments) };
        
        this.stack = [];
        this.explored = new Set();
        this.sequence = [];
    }

    start() {
        // Backtracking algorithm

        // Start at first node
        var node = this.nodes[0];

        this.stack = this.neighbours(node);

        while(this.stack.length) {

            var path = this.stack.pop();
            this.explored.add(path.segment);


            this.makeMove(path);

            this.neighbours(path.node).forEach(path => {

                // Path is not already explored
                if(!this.explored.has(path.segment)) { 
                    this.stack.push(path);
                }
            });

            // If won
            if(this.won()) {
                console.log("Won");
                this.renderPath();
                return;
            }
        }

        this.renderPath();

        console.log("No path possible");
    }

    makeMove(path) {
        var startNode;

        if (path.node === path.segment.a) { startNode = path.segment.b }
        else { startNode = path.segment.a }

        if(this.sequence.length === 0) { 
            this.sequence.push({
                path: path,
                flow: true
            });
        } else {
    
            for(
                var i = this.sequence.length-1; 
                i >= 0 && this.sequence[i].path.node != startNode; 
                i--
            ) {
                console.log(this.sequence);

                // Retrieve segment
                this.sequence.push({
                    path: this.sequence[i].path,
                    flow: false
                });

                // Removed segment from explored set
                this.explored.delete(this.sequence[i].path.segment);
            }

            this.sequence.push({
                path: path,
                flow: true
            });
        }
    }

    renderPath() {

        if(this.sequence.length) {
            var move = this.sequence.shift();

            console.log(this.sequence);
            console.log(move);

            if(move.flow) { this.flow(move.path.segment, move.path.node) }
            else { this.retrieve(move.path.segment, move.path.node) }
        }
    }

    won() {
        if (this.explored.size === this.segments.length) { return true }
        else { return false }
    }


    flow(segment, node) {
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
                this.renderPath();
            }

            this.render();
        }, 10);
    }

    retrieve(segment, node) {
        segment.flow = {
            toNode: node,
            percent: 100
        }

        segment.active = true;
        segment.color = "red";

        var interval = setInterval(() => {
            segment.flow.percent -= 1;

            if(segment.flow.percent === 0) { 
                clearInterval(interval);   
                this.renderPath();             
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
                    segment: segment
                });
            }
            else if (segment.b === node) {
                neighbours.push({
                    node: segment.a,
                    segment: segment
                }); 
            }
        });

        return neighbours;
    }
}

export default Solver;
