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

export function makeMove(move, callBack, nodes, segments, render) {

    var ids = segments.indexOf(move.segment);

    segments[ids].active = true;

    if (move.grow) {

        segments[ids].flow = {
            endNode: move.endNode,
            percent: 0
        };

        segments[ids].color = "green";

        var interval = setInterval(() => {
            
            segments[ids].flow.percent += 2;

            if (segments[ids].flow.percent === 100) {

                clearInterval(interval);
                callBack();
            }

            render(nodes, segments);
        }, 1);
    } else {

        segments[ids].flow = {
            endNode: move.endNode,
            percent: 100
        };

        segments[ids].color = "red";

        interval = setInterval(() => {

            segments[ids].flow.percent -= 1;

            if (segments[ids].flow.percent === 0) {

                segments[ids].active = false;
                clearInterval(interval);
                callBack();
            }

            render(nodes, segments);
        }, 1);
    }
}

export function reset() {

    var segments = this.state.segments;

    segments.forEach(segment => {
        segment.active = false;
        segment.flow = false;
    });

    this.updatePattern(this.state.nodes, segments);
}

export function renderSelected(callBack, nodes, segments, index, render) {

    nodes[index].selected = true;

    var exit = false;

    var interval = setInterval(() => {

        if (exit) {
            nodes[index].selected = false;
            clearInterval(interval);
            callBack();
        }

        exit = true;

        render(nodes, segments);
    }, 250);
}

export function noSolution(nodes, segments, render, updatePlay) {

    segments.forEach(segment => {
        segment.color = "red";
        segment.active = true;
        segment.flow = {
            endNode: segment.a,
            percent: 100
        }
    });

    render(nodes, segments);

    updatePlay(false);
}
