import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';
import { connect } from 'react-redux';
import {login} from '../actions/auth';

import Input from './input';
import {required, nonEmpty} from '../validators';

import './user-form.css';

export class UserForm extends React.Component{
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onSubmit(values) {
        const {username, password} = values;
        const user = {username, password};
        return this.props.dispatch(login(user));
    }

    render(){
        let errorDiv = "";
        if (this.props.loginError) {
            errorDiv = (<div className="error login-error">
                {this.props.loginError}. Try logging in again.
            </div>)
        }
        const {pristine, submitting, handleSubmit} = this.props;
        return(
            <section className="form-container">
                <form id="login-form" onSubmit={handleSubmit(values => this.onSubmit(values))} className="user-form">
                    <h3 className="user-form-title">Login to continue</h3>
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
                    <button
                        type="submit"
                        disabled={pristine || submitting}
                        >Login to Account</button>
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
        dispatch(focus('user-form', 'username'))
    }
})(connectedUserForm);