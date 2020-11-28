import * as utils from './utils';
import Segment from './segment';
import Node from './node';

/**
 * Class variables and their meaning
 *  
 * this.selected: Node at which segment creation starts
 * this.drag: Node which is being dragged
 * 
 */

export function handleMove(event) {

    var pos = utils.get_coordinates(this.canvas, event);    // Current Position
    var node = utils.node_overlap(this.state.nodes, pos);   // Current Node
    var nodeList = this.state.nodes;                        // Copy of State Nodes

    // Change position of node being dragged
    if (this.drag) {
        nodeList[nodeList.indexOf(this.drag)].moveTo(pos);
        this.setState({ nodes: nodeList });
    }

    // Inactivate previous hover node
    // But not selected node
    if (this.hoverNode && this.hoverNode !== this.selected) {
        nodeList[nodeList.indexOf(this.hoverNode)].active = false;
        this.setState({ nodes: nodeList });
    }

    if (node) {

        // Activate current node
        node.active = true;
        this.hoverNode = node;
        nodeList[nodeList.indexOf(node)] = node;
        this.setState({ nodes: nodeList });
    }

    // When create tool is active
    if (this.state.tool.create) {

        // Segment follows current position
        if (!node) { node = new Node(pos) }
        if (this.selected) {
            this.setState({
                hoverSegment: new Segment(this.selected, node)
            })
        }
    }
}


export function handleClick(event) {

    var pos = utils.get_coordinates(this.canvas, event);    // Current position
    var node = utils.node_overlap(this.state.nodes, pos);   // node on current position or false

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

    // When select tool is active
    if (this.state.tool.select) {

        var sNode = this.state.startNode;       // Node to start solving

        if (node) {

            // Deactivate previous startNode
            if (sNode) {
                nodeList[nodeList.indexOf(sNode)].startNode = false;
            }

            // Make current clicked node a startNode
            sNode = node;
            nodeList[nodeList.indexOf(sNode)].startNode = true;

            this.setState({ 
                nodes: nodeList, 
                startNode: sNode
            });
        }
    }

    // When create tool is active
    if (this.state.tool.create) {

        // Create a new node at current position
        // If it does not already exist
        if (!node) {
            node = new Node(pos);

            // Add new node in list of existing nodes
            nodeList.push(node);
            this.setState({ nodes: nodeList });
        }

        // if segment creation is in process
        if (this.selected) {

            // Start node and end node of segment being created must be different
            if (this.selected !== node) {
                var segment = new Segment(this.selected, node);

                if (!utils.checkSegment(segmentList, segment)) {

                    // Add new segment to state
                    segmentList.push(segment);
                }

                // Inactive both end nodes of segment
                nodeList[nodeList.indexOf(this.selected)].active = false;
                nodeList[nodeList.indexOf(node)].active = false;
            } else {

                /************* NOT TESTED *******************/

                // Delete node if start node and end node are same
                // Node must not be associated to any segment
                var associated = false;

                // Check if selected node is associated with some segment
                for (var i = 0; i < segmentList.length; i++) {
                    
                    if (
                        segmentList[i].a == this.selected ||
                        segmentList[i].b == this.selected
                    ) {
                        associated = true
                        break;
                    }
                }

                // Delete selected node if not associated
                if (!associated) {
                    nodeList.splice(nodeList.indexOf(this.selected), 1);
                }
            }

            // Reset tool
            this.selected = null;
            this.setState({ 
                nodes: nodeList,
                segments: segmentList,
                hoverSegment: null
            });

        } else {

            // Start creating segment at current node
            node.active = true;
            this.selected = node;
        }
    }

    // When erase tool is active
    if (this.state.tool.erase) {

        if (node) {

            // Remove current node
            nodeList.splice(nodeList.indexOf(node), 1)

            // Remove all segments that are associated with current node
            segmentList = segmentList.filter((segment) => {
                return ((segment.a !== node) && (segment.b !== node));
            });

            this.hoverNode = null;

            // Make sure that there is no isolated node left

            this.setState({ nodes: nodeList });
        }
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

