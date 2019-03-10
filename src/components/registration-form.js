import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';
import { connect } from 'react-redux';

import {registerUser} from '../actions/auth';

import Input from './input';
import {required, nonEmpty, matches} from '../validators';

import './registration-form.css';

export class RegistrationForm extends React.Component{
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onSubmit(values) {
        const {username, password} = values;
        const user = {username, password};
        return this.props.dispatch(registerUser(user));
    }

    render(){
        const matchesPassword = matches('password');
        const {pristine, submitting, handleSubmit} = this.props;
        return(
            <section className="form-container">
                <form id="registration" onSubmit={handleSubmit(values => this.onSubmit(values))} className="signup-form">
                    <h3 className="user-form-title">Sign up to start</h3>
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
                    <Field 
                        name="confirm-password"
                        type="password"
                        component={Input}
                        label="Confirm Password"
                        validate={[required, nonEmpty, matchesPassword]}
                    />
                    <button
                        type="submit"
                        disabled={pristine || submitting}
                        >Sign Up for Account</button>
                </form>
            </section>
        )
    }

}

const mapStateToProps = state => ({
    formType: state.app.formType,
    loginError: state.auth.loginError
})

const connectedRegistrationForm = connect(mapStateToProps)(RegistrationForm);

export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) => {
        dispatch(focus('registration', Object.keys(errors)[0]))
    }
})(connectedRegistrationForm);