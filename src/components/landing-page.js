import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {changePage} from '../actions';

import './landing-page.css';

export function LandingPage(props){
    if(props.loggedIn){
        props.dispatch(changePage('dashboard'));
        return <Redirect to="/dashboard" />
    }

    if(props.currentPage === "login"){
        return <Redirect to="/login" />
    }

    return(
        <main>
            <section className="facts-container">
                <article className="fact-container">
                    <h2>Americans generate over 262 million tons of waste per year.</h2>
                    <p>Over 52% of that waste goes to landfill. That's more than the weight of a blue whale chilling with three elephants.</p>
                </article>
            </section>
            <section className="app-description">
                <h2>But habits can change.</h2>
                <p>With Item Adoption, take the things that you were about to throw away and find ways to repurpose them, find places to donate them, or give/sell to others in your area. You can also look for items that are used and give them a new home!</p>
            </section>
            <section className="direct-to-signup">
            <Link to="/register">Sign Up</Link>
                {/* <button type="button" onClick={handleClick} id="button-to-signup">Sign up to get started</button> */}
            </section>
        </main>
    )
}


const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    currentPage: state.app.currentPage
})

export default connect(mapStateToProps)(LandingPage);