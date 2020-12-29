import React from 'react';
import Control from './Control';
import Canvas from './Canvas';
import { NewCard, Card } from './Card';
import Solve from './js/Solve';
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
        this.it = 0;

        this.updateCreate = this.updateCreate.bind(this);
        this.updateStartNode = this.updateStartNode.bind(this);
        this.updatePattern = this.updatePattern.bind(this);
        this.updatePlay = this.updatePlay.bind(this);
        this.updateSolution = this.updateSolution.bind(this);
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

    updateCreate(showBoardValue, createValue) {

        this.reset();

        if (createValue) {

            var nodeList = this.state.nodes;

            if (this.state.startNode) {
                nodeList[nodeList.indexOf(this.state.startNode)].selected = false;
            }

            this.setState({ 
                nodes: nodeList, 
                startNode: null
            });
        } else {

            this.setState({ 
                solution: null
            });
        }

        this.setState({ create: createValue });
        this.props.showBoard(showBoardValue);
    }

    updatePlay(value) {

        if (!this.state.startNode) {
            alert("Select a node to Start solving!");
        } else {   
        
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
            }

            this.setState({ play: value });
        }

        
    }

    updateStartNode(node) {
        this.setState({ startNode: node });
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

                {this.props.board
                    ? <React.Fragment>

                        {this.state.play && 
                            <Solve 
                                nodes={this.state.nodes}
                                segments={this.state.segments}
                                startNode={this.state.startNode}
                                render={this.updatePattern}
                                updatePlay={this.updatePlay}
                                updateSolution={this.updateSolution}
                                reset={this.reset} />}

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

                    </React.Fragment>

                    : <React.Fragment>

                        <NewCard
                            onClick={this.updateCreate} />

                        <div id="patterncontainer" className="container">
                            <div className="row row-cols-2">

                                {/* Just a template Cards will be rendred from a list */}

                                <Card
                                    onClick={this.updateCreate} />
                                <Card
                                    onClick={this.updateCreate} />
                                <Card
                                    onClick={this.updateCreate} />
                                <Card
                                    onClick={this.updateCreate} />
                                <Card
                                    onClick={this.updateCreate} />
                                <Card
                                    onClick={this.updateCreate} />
                                <Card
                                    onClick={this.updateCreate} />
                                <Card
                                    onClick={this.updateCreate} />
                                <Card
                                    onClick={this.updateCreate} />
                                <Card
                                    onClick={this.updateCreate} />
                                <Card
                                    onClick={this.updateCreate} />
                                <Card
                                    onClick={this.updateCreate} />
                                <Card
                                    onClick={this.updateCreate} />
                                <Card
                                    onClick={this.updateCreate} />
                                <Card
                                    onClick={this.updateCreate} />
                                <Card
                                    onClick={this.updateCreate} />

                            </div>
                        </div>

                    </React.Fragment>}

            </main>
        );
    }
}

export default Main;
