import Solver from './solver';

export function solve() {

    if (this.state.play) {

        if (!this.state.startNode) {
            alert("Select a node to start solving!");
        } else {
   
            this.model = new Solver(
                this.state.nodes, 
                this.state.segments, 
                this.updateBoard,
                this.state.startNode,
                this.doneSolving
            );
            
            this.model.start();

            this.setState({ play: false });
        }
    } else {

        this.model.stop();
        this.doneSolving();
    }
}


export function doneSolving() {

    // Display play button
    this.setState({ play: true });
}


export function updateBoard(nodes, segments) {

    // Update Nodes and Segments
    this.setState({ nodes: nodes, segments: segments });
}


export function updateToolStatus(tool) {

    let toolStatus = this.state.tool;

    toolStatus = {
        'create': false,
        'erase': false,
        'select': false
    }

    // Reset tool status
    this.selected = null;
    this.drag = null;
    this.setState({ 
        hoverSegment: null, 
        startNode: null
    });

    // Switched to edit mode
    if (this.state.startNode) {

        let nodeList = this.state.nodes;
        nodeList[nodeList.indexOf(this.state.startNode)].startNode = false;

        if (this.model)
            this.model.reset();

        this.setState({ 
            nodes: nodeList,
            startNode: null 
        });
    }
    toolStatus[tool] = true;

    this.setState({ tool: toolStatus });
}


export function resetBoard() {
    this.setState({ nodes: [], segments: [] });
    this.selected = null;
    this.hoverNode = null;
    this.hoverSegment = null;
}
