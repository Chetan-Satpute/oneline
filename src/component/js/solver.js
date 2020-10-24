class Solver {
    constructor(nodes, segments, render) {
        this.nodes = nodes;
        this.segments = segments;
        this.render = () => { render(this.nodes, this.segments) };
    }

    start() {
        // Backtracking algorithm

        

    }

    flowSegment(segment, node) {
        segment.flow = {
            startNode: node,
            percent: 0
        };

        segment.active = true;

        var interval = setInterval(() => {
            segment.flow.percent += 1;

            if (segment.flow.percent === 100) { clearInterval(interval) }

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
