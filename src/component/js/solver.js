class Solver {
    constructor(nodes, segments, render) {
        this.nodes = nodes;
        this.segments = segments;
        this.render = () => { render(this.nodes, this.segments)};
    }

    start() {
        this.segments.color = "green";
        this.segments[0].flow = { ab: true };

        this.render();
    }
}

export default Solver;
