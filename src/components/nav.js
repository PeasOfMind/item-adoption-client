import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import { clearAuthToken } from '../local-storage';
import {clearAuth, login} from '../actions/auth';
import {changeFormType, changePage} from '../actions';

import './nav.css'

export function Nav(props){

    let linkArray;
    if (props.loggedIn) {
        linkArray = ["Logout"];
    } else linkArray = ["Login", "Signup", "Demo"];

    const handleOnClick = link => {
        if (link === "Logout") {
            props.dispatch(clearAuth());
            clearAuthToken();
            props.dispatch(changePage("landing"));
        } else if (link === "Demo"){
            props.dispatch(login({username: "newuser", password: "password123"}))
        } else {
            //will be either Signup or Login so switch forms
            props.dispatch(changeFormType(link));
        }
    }

    const navLinks = linkArray.map((link, index) => {
        if (link === "Logout") {
            return (
            <li key={index} className="nav-link" aria-label={link} onClick={() => handleOnClick(link)}>
                <Link to="/">
                    {link}
                </Link>
            </li>
            )
        }
        return (
        <li key={index} className="nav-link" aria-label={link} onClick={() => handleOnClick(link)}>
            <Link to="/login">
                {link}
            </Link>
        </li>
    )});

    return (
        <nav>
            <ul className="nav-container">
                {navLinks}
            </ul>
        </nav>
    );
}

const mapStateToProps = state => ({
    navLinks: state.app.navLinks,
    loggedIn: state.auth.currentUser !== null
})

export default connect(mapStateToProps)(Nav);