import React from 'react';

class NavBar extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">

                    <span
                        onClick={() => { this.props.showBoard(false) }}>
                        {this.props.board &&
                            <i id="backarrow" className="btn m-2"></i>}
                    </span>

                    <span className="navbar-brand fs-2">
                        <b>One Line</b>
                    </span>

                </div>
            </nav>
        );
    }
}

export default NavBar;
