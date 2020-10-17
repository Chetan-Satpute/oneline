import React from 'react';

class NavBar extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-light bg-light">

                {/* Button to toggle side bar only on mobile devices */}
                <button className="navbar-toggler-icon btn" type="button" />

                <span className="navbar-brand">One Line</span>
                
            </nav>
        );
    }
}

export default NavBar;