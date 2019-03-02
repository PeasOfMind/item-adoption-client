import React from 'react';
import { connect } from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import { toggleUserEdit, updateUserInfo } from '../actions/auth';
import Input from './input';
import {required, nonEmpty, validNum, validZip, email} from '../validators';

import './user-info.css';

export function UserInfo(props){

    const handleEdit = () => {
        props.dispatch(toggleUserEdit());
    }

    const onSubmit = values => {
        console.log(values);
        const updateData = {id: props.userId}
        if (values.zipcode) updateData.zipcode = values.zipcode;
        if (values.email) updateData.email = values.email;
        props.dispatch(updateUserInfo(updateData));
    }

    let userZipText;
    const zipValidate = [validNum, validZip];
    if(!props.zipcode) {
        userZipText = `You haven't set a homebase yet.`;
        //if a zipcode has not been set already, make it required to enter one
        zipValidate.push(required, nonEmpty);
    } else {
        userZipText = `Your homebase is zipcode: ${props.zipcode}`;
    }

    let userEmailText;
    const emailValidate = [email];
    if(!props.email) {
        userEmailText = `You haven't set an email yet.`;
        //if an email has not been set already, make it required to enter one
        emailValidate.push(required, nonEmpty);
    } else {
        userEmailText = `Your contact email is: ${props.email}`;
    }

    const {pristine, submitting, handleSubmit} = props;
    let changeText;
    if(props.editing){
        changeText = (<form className="user-info-form" onSubmit={handleSubmit(onSubmit)}>
            <Field 
                name="zipcode"
                type="text"
                component={Input}
                label="Zipcode"
                validate={zipValidate}
            />
            <Field 
                name="email"
                type="text"
                component={Input}
                label="Email"
                validate={emailValidate}
            />
            <button
                type="submit"
                disabled={pristine || submitting}
            >Submit</button>
            <button
                type="reset"
                onClick={() => handleEdit()}
                >Cancel</button>
        </form>)
    } else if (!props.zipcode && !props.email) {
        changeText = <button onClick={() => handleEdit()}>Set User Info Now?</button>
    } else {
        changeText = <button onClick={() => handleEdit()}>Update User Info?</button>
    }

    return(
        <section className="user-info">
            <h2>Hi {props.username}</h2>
            <p>{userZipText}</p>
            <p>{userEmailText}</p>
            {changeText}
        </section>
    )
}

const mapStateToProps = state => ({
    username: state.auth.currentUser,
    zipcode: state.auth.userZip,
    email: state.auth.userEmail,
    editing: state.auth.editing,
    userId: state.auth.userId
});

const connectedUserInfo = connect(mapStateToProps)(UserInfo);

export default reduxForm({form:'user-info'})(connectedUserInfo);