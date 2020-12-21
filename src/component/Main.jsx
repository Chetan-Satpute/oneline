import React from 'react';
import Control from './Control';
import Canvas from './Canvas';
import { NewCard, Card } from './Card';

class Main extends React.Component {


    render() {

        return (
            <main>

                {this.props.board
                    ? <React.Fragment>

                        <Canvas />

                        <Control />

                    </React.Fragment>

                    : <React.Fragment>

                        <NewCard 
                            onClick={this.props.showBoard} />

                        <div id="patterncontainer" className="container">
                            <div className="row row-cols-2">

                                {/* Just a template Cards will be rendred from a list */}

                                <Card 
                                    onClick={this.props.showBoard} />
                                <Card 
                                    onClick={this.props.showBoard} />
                                <Card 
                                    onClick={this.props.showBoard} />
                                <Card 
                                    onClick={this.props.showBoard} />
                                <Card 
                                    onClick={this.props.showBoard} />
                                <Card 
                                    onClick={this.props.showBoard} />
                                <Card 
                                    onClick={this.props.showBoard} />
                                <Card 
                                    onClick={this.props.showBoard} />
                                <Card 
                                    onClick={this.props.showBoard} />
                                <Card 
                                    onClick={this.props.showBoard} />
                                <Card 
                                    onClick={this.props.showBoard} />
                                <Card 
                                    onClick={this.props.showBoard} />
                                <Card 
                                    onClick={this.props.showBoard} />
                                <Card 
                                    onClick={this.props.showBoard} />
                                <Card 
                                    onClick={this.props.showBoard} />
                                <Card 
                                    onClick={this.props.showBoard} />
                                

                            </div>
                        </div>

                    </React.Fragment>}

            </main>
        );
    }
}

export default Main;
