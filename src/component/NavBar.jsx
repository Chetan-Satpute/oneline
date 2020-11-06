import React from 'react';

function NavBar(props) {
    return(
        <nav className="navbar navbar-light bg-light">

            {/* Button to toggle side bar only on mobile devices */}
            {window.innerWidth <= 800 && 
                <button 
                    className="navbar-toggler-icon btn" 
                    type="button"
                    onClick={props.toggleSidebar} /> }
            
            <span className="navbar-brand"><b>One Line</b></span>
                
        </nav>
    );
}

export default NavBar;
