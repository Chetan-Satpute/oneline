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
            create: true,
            startNode: null,

            play: false,
            solution: null,
            disableAll: false
        }

        // Iterator for solution
        // Used when renderting solution
        this.itsol = 0;

        this.updateCreate = this.updateCreate.bind(this);
        this.updateStartNode = this.updateStartNode.bind(this);
        this.updatePattern = this.updatePattern.bind(this);
        this.updatePlay = this.updatePlay.bind(this);
        this.updateSolution = this.updateSolution.bind(this);
        this.updateDisableAll = this.updateDisableAll.bind(this);
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

    updateCreate(createValue) {

        this.reset();

        if (createValue) {

            var nodeList = this.state.nodes;

            // Remove startNode
            if (this.state.startNode) {
                nodeList[nodeList.indexOf(this.state.startNode)].selected = false;
            }

            this.setState({
                nodes: nodeList,
                startNode: null,
                solution: null,
                create: createValue
            });

        } else {

            this.setState({ create: createValue });
        }
    }

    updatePlay(value) {

        if (!value) {

            this.setState({ disableAll: true });

            var i = 0;
            var interval = setInterval(() => {

                i = i + 1;
                console.log(i);

                if (i === 1) {
                    this.setState({ disableAll: false });
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

    updateDisableAll(value) {
        this.setState({ disableAll: value });
    }

    updateSolution(solution) {

        this.setState({ solution: solution });

        this.updatePlay(false);
    }

    showSolution() {

        if (this.itsol === 0) {
            this.setState({ disableAll: true });
            this.reset();
        }

        if (this.itsol < this.state.solution.length) {

            var move = this.state.solution[this.itsol];

            this.itsol = this.itsol + 1;

            this.makeMove(move, this.showSolution, this.state.nodes, this.state.segments, this.updatePattern);

        } else {

            this.itsol = 0;
            this.setState({ disableAll: false });
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
                        updateDisableAll={this.updateDisableAll} />}

                <Canvas
                    create={this.state.create}
                    startNode={this.state.startNode}
                    updateStartNode={this.updateStartNode}
                    nodes={this.state.nodes}
                    segments={this.state.segments}
                    updatePattern={this.updatePattern} />

                <Control
                    create={this.state.create}
                    updateCreate={this.updateCreate}
                    play={this.state.play}
                    updatePlay={this.updatePlay}
                    solution={this.state.solution}
                    showSolution={this.showSolution}
                    disableAll={this.state.disableAll} />
            </main>
        );
    }
}

export default Main;
