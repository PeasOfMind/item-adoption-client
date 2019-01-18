import React from 'react';

export default function Nav(props){
    const navLinks = props.navLinks.map((link, index) => (
        <li key={index} className="nav-link">
            {link}
        </li>
    ));

    return(
        <ul className="nav-container">
            {/* <li className="nav-link">Login</li>
            <li className="nav-link">Signup</li> */}
            {navLinks}
        </ul>
    )
}