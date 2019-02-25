import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from './nav';
import LandingPage from './landing-page';
import Dashboard from './dashboard';
import OtherListings from './other-listings';
import OtherWishlists from './other-wishlists';
import Login from './login';

import './main.css';
import { refreshAuthToken } from '../actions/auth';

export class Main extends React.Component{
    componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn){
            this.startPeriodicRefresh();
        } else if (prevProps.loggedIn && !this.props.loggedIn){
            this.stopPeriodicRefresh();
        }
    }

    componentWillUnmount(){
        this.stopPeriodicRefresh();
    }

    startPeriodicRefresh(){
        this.refreshInterval = setInterval(
            ()=> this.props.dispatch(refreshAuthToken()),
            60*60*1000 //every hour
        );
    }

    stopPeriodicRefresh(){
        if (!this.refreshInterval){
            return;
        }

        clearInterval(this.refreshInterval);
    }

    render(){
        return(
            <div className="app">
                <Nav />
                <header className={this.props.headingType}>
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
        )
    }
}

const mapStateToProps = state => ({
    headingType: state.app.headingType,
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
})

export default withRouter(connect(mapStateToProps)(Main));