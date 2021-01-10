import * as utils from './utils';
import Segment from './Segment';
import Node from './Node';

export function handleClick(event) {

    var pos = utils.get_coordinates(this.canvas, event);        // Current position
    var node = utils.node_overlap(this.props.nodes, pos);       // Node on current position

    var nodeList = this.props.nodes;
    var segmentList = this.props.segments;

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
    } else {
        this.props.updateSolution(null);
    }

    if (this.props.play === false) {

        // Create a new node at current position
        // If it does not already exist
        if (!node) {
            node = new Node(pos);

            // Add new node in list of existing nodes
            nodeList.push(node);
            this.props.updatePattern(nodeList, segmentList);
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

                    // Increment degree of both end nodes
                    segmentList[segmentList.indexOf(segment)].a.degree += 1;
                    segmentList[segmentList.indexOf(segment)].b.degree += 1;
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
                    
                    if (((segment.a !== node) && (segment.b !== node))) { return true } 
                    else {

                        // Decrement degree of both end nodes
                        segmentList[segmentList.indexOf(segment)].a.degree -= 1;
                        segmentList[segmentList.indexOf(segment)].b.degree -= 1;
                        return false;
                    }
                });

                // update nodes list and segments list
                this.props.updatePattern(nodeList, segmentList);
            }

            // Reset tool
            this.props.updatePattern(nodeList, segmentList);
            this.setState({
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
}

export function handleMove(event) {

    var pos = utils.get_coordinates(this.canvas, event);        // Current position
    var node = utils.node_overlap(this.props.nodes, pos);       // Node on current position

    var nodeList = this.props.nodes;
    var segmentList = this.props.segments;

    // Inactivate previous hover node
    // But not start node of hover segment
    if (this.hoverNode) {

        if (this.state.hoverSegment) {

            if (this.state.hoverSegment.a !== this.hoverNode) {
                nodeList[nodeList.indexOf(this.hoverNode)].active = false;
                this.hoverNode = null;
                this.props.updatePattern(nodeList, segmentList);
            }
        } else {

            nodeList[nodeList.indexOf(this.hoverNode)].active = false;
            this.hoverNode = null;
            this.props.updatePattern(nodeList, segmentList);
        }

    }

    if (node) {

        // Activate current node
        node.active = true;
        this.hoverNode = node;
        nodeList[nodeList.indexOf(node)] = node;
        this.props.updatePattern(nodeList, segmentList);
    }

    // Change position of node being dragged
    if (this.drag) {
        nodeList[nodeList.indexOf(this.drag)].moveTo(pos);
        this.props.updatePattern(nodeList, segmentList);
    }

    // Update hover segment
    if (this.state.hoverSegment) {

        // Segment follows current position
        if (!node) { node = new Node(pos) }

        this.setState({
            hoverSegment: new Segment(this.state.hoverSegment.a, node)
        });
    }

    // Discard segment creation if not in create
    if (this.props.play) {
        console.log("called");
        this.setState({ hoverSegment: null });
    }
}

export function mouseDown(event) {

    var pos = utils.get_coordinates(this.canvas, event);    // Current position
    var node = utils.node_overlap(this.props.nodes, pos);   // Current node

    if (node) { this.drag = node }
}

export function mouseUp(event) {
    this.drag = null;
}
