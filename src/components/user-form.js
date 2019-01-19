import React from 'react';
import { connect } from 'react-redux';

import {changeFormType} from '../actions';

export function UserForm(props){
    let formId, formTitle, submitText, switchFormText, switchFormValue;
    let confirmPassword = "";
    if (props.formType === "Signup"){
        formId = "signup-form";
        formTitle = "Sign up to start";
        submitText = "Sign Up for Account";
        switchFormText = "Already have an account?";
        switchFormValue = "Login";
        confirmPassword = (
            <label>
                Confirm Password
                <input type="password" id="confirm-password" />
            </label>
        );
    } else if (props.formType === "Login"){
        formId = "login-form";
        formTitle = "Login to continue";
        submitText = "Login to Account";
        switchFormText = "New to Item Adoption?";
        switchFormValue = "Sign Up";
    }
    //TODO: else generate error.

    const handleSubmit = event => {
        event.preventDefault();
    }

    return(
        <section className="form-container">
            <form id={formId} onSubmit={handleSubmit}>
                <h3>{formTitle}</h3>
                <label>
                    Username
                    <input type="text" id="username" />
                </label>
                <label>
                    Password
                    <input type="password" id="password" />
                </label>
                {confirmPassword}
                <input type="submit" id="js-submit-signup" value={submitText}></input>
                {switchFormText}
                <input type="button" value={switchFormValue} onClick={() => props.dispatch(changeFormType())}></input>
            </form>
        </section>
    )
}

const mapStateToProps = state => ({
    formType: state.formType
})

export default connect(mapStateToProps)(UserForm);