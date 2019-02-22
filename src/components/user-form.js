import React from 'react';
import {Redirect} from 'react-router-dom';
import {reduxForm, Field, focus} from 'redux-form';
import { connect } from 'react-redux';

import {registerUser} from '../actions/auth';
import {login} from '../actions/auth';
import {fetchListings, fetchWishlist} from '../actions';
import {fetchZip} from '../actions/auth';
import Input from './input';
import {required, nonEmpty, matches} from '../validators';

import './user-form.css';

export function UserForm(props){
    let formId, formTitle, submitText;
    let confirmPassword = "";
    const matchesPassword = matches('password');
    if (props.formType === "Signup"){
        formId = "signup-form";
        formTitle = "Sign up to start";
        submitText = "Sign Up for Account";
        confirmPassword = (
                <Field 
                    name="confirm-password"
                    type="password"
                    component={Input}
                    label="Confirm Password"
                    validate={[required, nonEmpty, matchesPassword]}
                />
        );
    } else if (props.formType === "Login"){
        formId = "login-form";
        formTitle = "Login to continue";
        submitText = "Login to Account";
    }

    const onSubmit = values => {
        console.log('submitting...')
        const {username, password} = values;
        const user = {username, password};
        if(props.formType === "Signup"){
            props.dispatch(registerUser(user))
            .then(() => console.log('user is registered!'));
        }
        else if(props.formType === "Login"){
            props.dispatch(login(user));
        }
    }

    const {pristine, submitting, handleSubmit} = props;
    console.log(props)

    if(props.loggedIn){
        props.dispatch(fetchListings());
        props.dispatch(fetchWishlist());
        props.dispatch(fetchZip());
        return <Redirect to="/dashboard" />
    }

    return(
        <section className="form-container">
            <form id={formId} onSubmit={handleSubmit(onSubmit)} className="user-form">
                <h3 className="user-form-title">{formTitle}</h3>
                <Field
                    name="username"
                    label="Username"
                    type="text"
                    component={Input}
                    validate={[required, nonEmpty]}
                />
                <Field
                    name="password"
                    type="password"
                    component={Input}
                    label="Password"
                    validate={[required, nonEmpty]}
                />
                {confirmPassword}
                <button
                    type="submit"
                    disabled={pristine || submitting}
                    >{submitText}</button>
            </form>
        </section>
    )
}

const mapStateToProps = state => ({
    formType: state.app.formType,
    loggedIn: state.auth.currentUser !== null
})

const connectedUserForm = connect(mapStateToProps)(UserForm);

export default reduxForm({
    form: 'user',
    onSubmitFail: (errors, dispatch) => dispatch(focus('user', Object.keys(errors)[0]))
})(connectedUserForm);