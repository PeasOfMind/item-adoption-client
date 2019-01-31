import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from './nav';
import LandingPage from './landing-page';
import Dashboard from './dashboard';
import OtherListings from './other-listings';
import OtherWishlists from './other-wishlists';
import Login from './login';

import './main-page.css';

export function MainPage(props){
    return(
        <Router>
            <div className="app">
            <Nav />
            <header className={props.headingType}>
                <h1>item adoption</h1>
            </header>
            <Switch>
                <Route exact path="/" component={LandingPage}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/otherlistings" component={OtherListings}/>
                <Route path="/otherwishlists" component={OtherWishlists}/>
                <Route path="/login" component={Login}/>
            </Switch>
            <footer>Created by PeasofMind</footer>
            </div>
        </Router>
    )
}

const mapStateToProps = state => ({
    headingType: state.app.headingType
})

export default connect(mapStateToProps)(MainPage);