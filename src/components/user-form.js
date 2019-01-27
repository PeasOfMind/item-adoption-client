import React from 'react';
import {Redirect} from 'react-router-dom';
import {reduxForm, Field} from 'redux-form';
import { connect } from 'react-redux';

import {changePage} from '../actions';
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

    const onSubmit = () => {
        console.log('submitting...')
        props.dispatch(changePage("dashboard"));
    }

    const {pristine, submitting, handleSubmit} = props;

    if(props.currentPage === "dashboard"){
        return <Redirect to="/dashboard" />
    }

    return(
        <section className="form-container">
            <form id={formId} onSubmit={handleSubmit(onSubmit())}>
                <h3>{formTitle}</h3>
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
    currentPage: state.app.currentPage
})

const connectedUserForm = connect(mapStateToProps)(UserForm);

export default reduxForm({form: 'user'})(connectedUserForm);