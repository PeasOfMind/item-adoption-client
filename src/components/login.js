import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';

import UserForm from './user-form';
import './login.css';

export function Login(props){
    //if loggedIn successfully, redirect to user's dashboard
    if(props.loggedIn){
        return <Redirect to="/dashboard" />
    }
 
    return(
        <main className="login-container">
            <UserForm />
            <section className="switch-forms">
            <p className="switch-text">New to Item Adoption?</p>
            <Link to="/register">Sign Up</Link>
            </section>
        </main>
    ) 
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
})

export default connect(mapStateToProps)(Login);