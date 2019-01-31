import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import {changeFormType, changePage} from '../actions';

import './nav.css'

export function Nav(props){

    const handleOnClick = link => {
        if (link === "Logout") {
            props.dispatch(changePage("landing"))
        } else {
            props.dispatch(changeFormType(link));
        }
    }

    const navLinks = props.navLinks.map((link, index) => {
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
    currentPage: state.app.currentPage
})

export default connect(mapStateToProps)(Nav);