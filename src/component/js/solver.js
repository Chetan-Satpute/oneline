class Solver {
    constructor(nodes, segments, render) {
        this.nodes = nodes;
        this.segments = segments;
        this.render = () => { render(this.nodes, this.segments)};
    }

    start() {
        this.nodes[0].color = "green";
        this.nodes[0].active = true;
        this.segments[0].active = true;

        this.render();
    }
}

export default Solver;
