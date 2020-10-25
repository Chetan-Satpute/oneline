class Solver {
    constructor(nodes, segments, render) {
        this.nodes = nodes;
        this.segments = segments;
        this.render = () => { render(this.nodes, this.segments) };
        
        this.stack = [];
        this.explored = new Set();
    }

    start() {
        // Backtracking algorithm

    }

    nextStep() {

        if(this.stack.length) {
            var path = this.stack.pop();
            this.explored.add(path.segment);

            this.flow(path.segment, path.node);

            this.neighbours(path.node).forEach(path => {
                if (!this.explored.has(path.segment))
                { this.stack.push(path) }
            })
        } else {
            console.log("not found");
        }
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
                this.nextStep();
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
                clearInterval(interval) 
                this.nextStep();
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
