import React from 'react';

export default function UserForm(props){
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
        submitText = "Login";
        switchFormText = "New to Item Adoption?";
        switchFormValue = "Sign Up";
    }
    //TODO: else generate error.
    return(
        <section className="form-container">
            <form id={formId}>
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
                <input type="button" value={switchFormValue}></input>
            </form>
        </section>
    )
}