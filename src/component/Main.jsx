import React from 'react';
import Control from './Control';
import Canvas from './Canvas';
import { NewCard, Card } from './Card';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nodes: [],
            segments: [],
            create: false,
            startNode: null
        }

        this.updateCreate = this.updateCreate.bind(this);
        this.updateStartNode = this.updateStartNode.bind(this);
        this.updatePattern = this.updatePattern.bind(this);
    }

    updatePattern(nodeList, segmentList) {
        this.setState({
            nodes: nodeList,
            segments: segmentList
        });
    }

    updateCreate(showBoardValue, createValue) {

        this.setState({ create: createValue });
        this.props.showBoard(showBoardValue);
    }

    updateStartNode(node) {
        this.setState({ startNode: node });
    }

    render() {

        return (
            <main>

                {this.props.board
                    ? <React.Fragment>

                        <Canvas
                            create={this.state.create}
                            startNode={this.state.startNode}
                            updateStartNode={this.updateStartNode}
                            nodes={this.state.nodes}
                            segments={this.state.segments}
                            updatePattern={this.updatePattern} />

                        <Control
                            create={this.state.create}
                            updateCreate={this.updateCreate} />

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
