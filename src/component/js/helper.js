import * as utils from './utils';
import Segment from './Segment';
import Node from './Node';

export function handleClick(event) {

    var pos = utils.get_coordinates(this.canvas, event);        // Current position
    var node = utils.node_overlap(this.state.nodes, pos);       // Node on current position

    var nodeList = this.state.nodes;
    var segmentList = this.state.segments;

    /*
     * Moved flag represents that a node was moved ( draged )
     *
     * When a node is draged following events are fired
     *      1. mouseDown
     *      2. mouseMove
     *      3. mouseUp
     *      4. click
     * 
     * Click event starts creation of a new segment
     * moved flag is a work around to prevent 
     * click event to start a new segment creation
     * 
     * On touch drag click is not fired at last
     * hence, first click just after drag will be ineffective
     *  
     * ********* Find better implementation **************
     */
    if (this.moved) {
        this.moved = false;
        return;
    }

    // Create a new node at current position
    // If it does not already exist
    if (!node) {
        node = new Node(pos);

        // Add new node in list of existing nodes
        nodeList.push(node);
        this.setState({ nodes: nodeList });
    }

    // Segment creation is in process
    if (this.state.hoverSegment) {

        // Start node and end node of segment being created must be different
        if (this.state.hoverSegment.a !== node) {

            var segment = new Segment(this.state.hoverSegment.a, node);

            // Check if segment already exist
            if (!utils.checkSegment(segmentList, segment)) {

                // Add new segment to state
                segmentList.push(segment);
            }

            // Inactivate both end nodes of segment
            nodeList[nodeList.indexOf(this.state.hoverSegment.a)].active = false;
            nodeList[nodeList.indexOf(node)].active = false;
        } else {

            // Remove current node
            nodeList.splice(nodeList.indexOf(node), 1)
            if (node === this.hoverNode) {
                this.hoverNode = false;
            }

            // Remove all segments that are associated with current node
            segmentList = segmentList.filter((segment) => {
                return ((segment.a !== node) && (segment.b !== node));
            });

            // update nodes list and segments list
            this.setState({
                nodes: nodeList,
                segments: segmentList
            });
        }

        // Reset tool
        this.setState({
            nodes: nodeList,
            segments: segmentList,
            hoverSegment: null
        });
    } else {

        // Start creating segment at current node
        node.active = true;
        this.setState({
            hoverSegment: new Segment(node, node)
        });
    }
}

export function handleMove(event) {

    var pos = utils.get_coordinates(this.canvas, event);        // Current position
    var node = utils.node_overlap(this.state.nodes, pos);       // Node on current position

    var nodeList = this.state.nodes;
    var segmentList = this.state.segments;

    // Inactivate previous hover node
    // But not start node of hover segment
    if (this.hoverNode) {

        if (this.state.hoverSegment) {

            if (this.state.hoverSegment.a !== this.hoverNode) {
                nodeList[nodeList.indexOf(this.hoverNode)].active = false;
                this.hoverNode = null;
                this.setState({ nodes: nodeList });
            }
        } else {

            nodeList[nodeList.indexOf(this.hoverNode)].active = false;
            this.hoverNode = null;
            this.setState({ nodes: nodeList });
        }

    }

    if (node) {

        // Activate current node
        node.active = true;
        this.hoverNode = node;
        nodeList[nodeList.indexOf(node)] = node;
        this.setState({ nodes: nodeList });
    }

    // Change position of node being dragged
    if (this.drag) {
        nodeList[nodeList.indexOf(this.drag)].moveTo(pos);
        this.setState({ nodes: nodeList });
    }

    // Update hover segment
    if (this.state.hoverSegment) {

        // Segment follows current position
        if (!node) { node = new Node(pos) }

        this.setState({
            hoverSegment: new Segment(this.state.hoverSegment.a, node)
        });
    }
}

export function mouseDown(event) {

    var pos = utils.get_coordinates(this.canvas, event);    // Current position
    var node = utils.node_overlap(this.state.nodes, pos);   // Current node

    if (node) { this.drag = node }
}

export function mouseUp(event) {
    this.drag = null;
}
