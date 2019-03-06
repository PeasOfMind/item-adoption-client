import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';
import { connect } from 'react-redux';

import {registerUser} from '../actions/auth';
import {login} from '../actions/auth';

import Input from './input';
import {required, nonEmpty, matches} from '../validators';

import './user-form.css';

export class UserForm extends React.Component{
    constructor (){
        super()
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onSubmit(values) {
        const {username, password} = values;
        const user = {username, password};
        if(this.props.formType === "Signup"){
            return this.props.dispatch(registerUser(user));
        }
        else if(this.props.formType === "Login"){
            return this.props.dispatch(login(user));
        }
    }

    render(){
        let formId, formTitle, submitText;
        let confirmPassword = "";
        const matchesPassword = matches('password');
        if (this.props.formType === "Signup"){
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
        } else if (this.props.formType === "Login"){
            formId = "login-form";
            formTitle = "Login to continue";
            submitText = "Login to Account";
        }
    
        let errorDiv = "";
        if (this.props.loginError) {
            errorDiv = (<div className="error login-error">
                Error code {this.props.loginError.code}: {this.props.loginError.message}. Try logging in again.
            </div>)
        }
        const {pristine, submitting, handleSubmit} = this.props;
        return(
            <section className="form-container">
                <form id={formId} onSubmit={handleSubmit(values => this.onSubmit(values))} className="user-form">
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
                {errorDiv}
            </section>
        )
    }

}

const mapStateToProps = state => ({
    formType: state.app.formType,
    loginError: state.auth.loginError
})

const connectedUserForm = connect(mapStateToProps)(UserForm);

export default reduxForm({
    form: 'user-form',
    onSubmitFail: (errors, dispatch) => {
        console.log('the redux form errors are:', errors)
        dispatch(focus('user-form', 'username'))
    }
})(connectedUserForm);