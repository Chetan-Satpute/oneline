import React from 'react';
import * as utils from './utils';

class Solve extends React.Component {
    constructor(props) {
        super(props);

        // Stack of moves (for Depth First Search)
        this.stack = [];

        // Set of explored segments
        this.explored = new Set();

        // Moves made to solve the pattern
        this.moves = [];

        // Solution of pattern
        this.solution = [];

        this.makeMove = utils.makeMove.bind(this);

    }

    componentDidMount() {
        
        // Solving starts here
        console.log("Solving...");

        // Reset
        this.reset();

        this.makeMove(this.props.segments[0], this.props.segments[0].a, false, () => {});

    }

    componentWillUnmount() {

        // Solving stops here
        console.log("component did unmount was called!");
    }

    reset() {

        var segments = this.props.segments;

        segments.forEach(segment => {
            segment.active = false;
            segment.flow = false;
        });

        this.props.render(this.props.nodes, segments);
    }

    render() { return null }
}

export default Solve;
