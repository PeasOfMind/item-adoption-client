import React from 'react';
import {connect} from 'react-redux';

import {changeFormType} from '../actions';
import UserForm from './user-form';
import './login.css';

export function Login(props){
    console.log(props);
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
    formType: state.app.formType
})

export default connect(mapStateToProps)(Login);