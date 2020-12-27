export function get_coordinates(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var top = Math.ceil(rect.top);
    var left = Math.ceil(rect.left);

    var clientX;
    var clientY;

    if(event.clientX && event.clientY) {
        clientX = event.clientX;
        clientY = event.clientY;
    } else {
        clientX = event.targetTouches[0].clientX;
        clientY = event.targetTouches[0].clientY;
    }

    return {
        x: clientX - left,
        y: clientY - top
    }
}

export function node_overlap(nodes, pos) {

    for (let i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var distance = Math.sqrt(((node.x - pos.x) * (node.x - pos.x)) + ((node.y - pos.y) * (node.y - pos.y)));

        if (distance <= (node.outerRadius * 2)) {
            return node;
        }
    }

    return false;
}

export function checkSegment(segments, segment) {

    var found = false;

    segments.forEach(seg => {
        
        if (
            (seg.a === segment.a && seg.b === segment.b) ||
            (seg.a === segment.b && seg.b === segment.a)
        ) { found = true }
    });

    return found;
}

export function makeMove(segment, endNode, grow, callback) {

    var segments = this.props.segments;

    var ids = segments.indexOf(segment);

    segments[ids].active = true;

    if (grow) {

        segments[ids].flow = {
            endNode: endNode,
            percent: 0
        };

        segments[ids].color = "green";

        var interval = setInterval(() => {
            
            segments[ids].flow.percent += 2;

            if (segments[ids].flow.percent === 100) {

                clearInterval(interval);

            }

            this.props.render(this.props.nodes, segments);
        }, 1);
    } else {

        segments[ids].flow = {
            endNode: endNode,
            percent: 100
        };

        segments[ids].color = "red";

        var interval = setInterval(() => {

            segments[ids].flow.percent -= 1;

            if (segments[ids].flow.percent === 0) {

                clearInterval(interval);

            }

            this.props.render(this.props.nodes, segments);
        }, 1);
    }
}
