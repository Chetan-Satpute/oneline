import React from 'react';
import Control from './Control';
import Canvas from './Canvas';
import Solve from './Solve';
import * as utils from './js/utils';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nodes: [],
            segments: [],
            startNode: null,

            play: false,
            solution: null,
            disablectrl: false
        }

        // Iterator for solution
        // Used when renderting solution
        this.itsol = 0;

        this.updateStartNode = this.updateStartNode.bind(this);
        this.updatePattern = this.updatePattern.bind(this);
        this.updatePlay = this.updatePlay.bind(this);
        this.updateSolution = this.updateSolution.bind(this);
        this.updatedisablectrl = this.updatedisablectrl.bind(this);
        this.showSolution = this.showSolution.bind(this);
        this.makeMove = utils.makeMove.bind(this);
        this.reset = utils.reset.bind(this);
    }

    updatePattern(nodeList, segmentList) {

        this.setState({
            nodes: nodeList,
            segments: segmentList
        });
    }

    updatePlay(value) {

        if (!value) {

            this.setState({ disablectrl: true });

            var i = 0;
            var interval = setInterval(() => {

                i = i + 1;
                console.log(i);

                if (i === 1) {
                    this.setState({ disablectrl: false });
                    clearInterval(interval);
                }
            }, 1000)

            var nodeList = this.state.nodes;

            // Remove startNode
            if (this.state.startNode) {
                nodeList[nodeList.indexOf(this.state.startNode)].selected = false;
            }

            this.setState({ nodes: nodeList });
        }

        this.setState({ play: value });
    }

    updateStartNode(node) {
        var nodes = this.state.nodes;

        node.selected = true;

        this.setState({
            startNode: node,
            nodes: nodes
        });
    }

    updatedisablectrl(value) {
        this.setState({ disablectrl: value });
    }

    updateSolution(solution) {
        this.setState({ solution: solution });
    }

    showSolution() {

        if (this.itsol === 0) {
            this.setState({ disablectrl: true });
            this.reset();
        }

        if (this.itsol < this.state.solution.length) {

            var move = this.state.solution[this.itsol];

            this.itsol = this.itsol + 1;

            this.makeMove(move, this.showSolution, this.state.nodes, this.state.segments, this.updatePattern);

        } else {

            this.itsol = 0;
            this.setState({ disablectrl: false });
        }
    }

    render() {

        return (
            <main>
                {this.state.play &&
                    <Solve
                        reset={this.reset}
                        nodes={this.state.nodes}
                        segments={this.state.segments}
                        startNode={this.state.startNode}
                        render={this.updatePattern}
                        updatePlay={this.updatePlay}
                        updateSolution={this.updateSolution}
                        updateStartNode={this.updateStartNode}
                        updatedisablectrl={this.updatedisablectrl} />}

                <Canvas
                    play={this.state.play}
                    startNode={this.state.startNode}
                    updateStartNode={this.updateStartNode}
                    nodes={this.state.nodes}
                    segments={this.state.segments}
                    updatePattern={this.updatePattern}
                    updateSolution={this.updateSolution} />

                <Control
                    play={this.state.play}
                    updatePlay={this.updatePlay}
                    solution={this.state.solution}
                    showSolution={this.showSolution}
                    disablectrl={this.state.disablectrl} />
            </main>
        );
    }
}

export default Main;
