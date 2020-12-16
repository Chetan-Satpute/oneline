import React from 'react';
import { RESPONSIVE_WIDTH } from './App';

function NavBar(props) {

    return(
        <nav className="navbar navbar-dark bg-dark">

            {/* Button to toggle side bar only on mobile devices */}
            {window.innerWidth <= RESPONSIVE_WIDTH && 
                <button 
                    className="navbar-toggler-icon btn" 
                    type="button"
                    onClick={props.toggleSidebar} /> }

            <span className="navbar-brand"><b>One Line</b></span>

        </nav>
    );
}

export default NavBar;
