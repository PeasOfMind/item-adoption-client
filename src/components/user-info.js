import React from 'react';
import { connect } from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import { toggleUserEdit, updateZip } from '../actions/auth';
import Input from './input';
import {required, nonEmpty} from '../validators';

export function UserInfo(props){

    const handleEdit = () => {
        props.dispatch(toggleUserEdit());
    }

    const onSubmit = values => {
        console.log(values);
        const updateData = {
            id: props.userId,
            zipcode: values.zipcode
        }
        props.dispatch(updateZip(updateData));
    }

    let userText, changeText;
    if(!props.zipcode) {
        userText = `You haven't set a homebase yet.`;
    } else {
        userText = `Your homebase is zipcode: ${props.zipcode}`;
    }

    const {pristine, submitting, handleSubmit} = props;
    if(props.editing){
        changeText = (<form className="zipcode-form" onSubmit={handleSubmit(onSubmit)}>
            <Field 
                name="zipcode"
                type="text"
                component={Input}
                label="Zipcode"
                validate={[required, nonEmpty]}
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
    } else if (!props.zipcode) {
        changeText = <button onClick={() => handleEdit()}>Set Zipcode Now?</button>
    } else {
        changeText = <button onClick={() => handleEdit()}>Update Location?</button>
    }

    return(
        <section className="user-info">
            <h2>Hi {props.username}</h2>
            <p>{userText}</p>
            {changeText}
        </section>
    )
}

const mapStateToProps = state => ({
    username: state.auth.currentUser,
    zipcode: state.auth.userZip,
    editing: state.auth.editing,
    userId: state.auth.userId
});

const connectedUserInfo = connect(mapStateToProps)(UserInfo);

export default reduxForm({form:'user-info'})(connectedUserInfo);