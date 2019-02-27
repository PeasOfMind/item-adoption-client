import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {changeFormType} from '../actions';
import UserForm from './user-form';
import './login.css';

export function Login(props){
    //if loggedIn successfully, redirect to user's dashboard
    if(props.loggedIn){
        return <Redirect to="/dashboard" />
    }

    let switchFormText, switchFormValue;
    if (props.formType === "Signup"){
        switchFormText = "Already have an account?";
        switchFormValue = "Login";
    } else if (props.formType === "Login"){
        switchFormText = "New to Item Adoption?";
        switchFormValue = "Sign Up";
    }

    return(
        <main className="login-container">
            <UserForm />
            <section className="switch-forms">
            {switchFormText}
            <button className="switch-form-button" type="button" onClick={() => props.dispatch(changeFormType())}>{switchFormValue}</button>
            </section>
        </main>
    )
}

const mapStateToProps = state => ({
    formType: state.app.formType,
    loggedIn: state.auth.currentUser !== null
})

export default connect(mapStateToProps)(Login);