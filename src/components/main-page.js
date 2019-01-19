import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Nav from './nav';
import LandingPage from './landing-page';
import Dashboard from './dashboard';

export default function MainPage(props){
    return(
        <Router>
            <div className="app">
            <Nav />
            <header className="landing-header">
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