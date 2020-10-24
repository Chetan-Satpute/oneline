class Solver {
    constructor(nodes, segments, render) {
        this.nodes = nodes;
        this.segments = segments;
        this.render = () => { render(this.nodes, this.segments)};
    }

    start() {

        // Main Ai code here

    }

    flowSegment(segment)
    {
        segment.flow = {
            startNode: true,
            percent: 0
        };

        segment.active = true;

        var interval = setInterval(() => {
            segment.flow.percent += 1;

            if(segment.flow.percent === 100) { clearInterval(interval) }

            this.render();
        }, 10);
    }
}

export default Solver;
