import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Nav from './nav';
import LandingPage from './landing-page';

export default function MainPage(props){
    return(
        <Router>
            <div className="app">
            <Nav navLinks={["Login", "Signup"]}/>
            <header className="landing-header">
                <h1>Item Adoption</h1>
            </header>
            <Switch>
                <Route exact path="/" component={LandingPage}/>
                <Route path="/dashboard" />
            </Switch>
            <footer>Created by PeasofMind</footer>
            </div>
        </Router>
    )
}