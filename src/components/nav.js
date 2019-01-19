import React from 'react';
import { connect } from 'react-redux';

import {changeFormType} from '../actions';

export function Nav(props){
    const navLinks = props.navLinks.map((link, index) => (
        <li key={index} className="nav-link" aria-label={link} onClick={() =>
        props.dispatch(changeFormType(link)
        )}>
            {link}
        </li>
    ));

    return (
        <ul className="nav-container">
            {navLinks}
        </ul>
    );
}

const mapStateToProps = state => ({
    navLinks: state.navLinks
})

export default connect(mapStateToProps)(Nav);