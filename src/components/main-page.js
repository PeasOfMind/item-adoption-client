import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from './nav';
import LandingPage from './landing-page';
import Dashboard from './dashboard';

import './main-page.css';

export function MainPage(props){
    return(
        <Router>
            <div className="app">
            <Nav />
            <header className={props.headingType}>
                <h1>Item Adoption</h1>
            </header>
            <Switch>
                <Route exact path="/" component={LandingPage}/>
                <Route path="/dashboard" component={Dashboard}/>
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