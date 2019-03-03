import React from 'react';
import { connect } from 'react-redux';
import {reduxForm, Field, change} from 'redux-form';
import { toggleUserEdit, updateUserInfo } from '../actions/auth';
import Input from './input';
import {required, nonEmpty, validNum, validZip, email} from '../validators';

import './user-info.css';

export class UserInfo extends React.Component{
    // componentDidMount(){
    //     console.log('mounted...')
    //     if(this.props.zipcode) {
    //         console.log(this.props.zipcode);
    //         this.props.dispatch(change('user-info', 'zipcode', this.props.zipcode));
    //     }
    //     if(this.props.email) {
    //         console.log(this.props.email);
    //         this.props.dispatch(change('user-info', 'email', this.props.email));
    //     }
    // }

    handleEdit() {
        this.props.dispatch(toggleUserEdit());
    }

    onSubmit (values) {
        console.log(values);
        const updateData = {id: this.props.userId}
        if (values.zipcode) updateData.zipcode = values.zipcode;
        if (values.email) updateData.email = values.email;
        this.props.dispatch(updateUserInfo(updateData));
    }

    render(){
        let userZipText;
        const zipValidate = [validNum, validZip];
        if(!this.props.zipcode) {
            userZipText = `You haven't set a homebase yet.`;
            //if a zipcode has not been set already, make it required to enter one
            zipValidate.push(required, nonEmpty);
        } else {
            userZipText = `Your homebase is zipcode: ${this.props.zipcode}`;
        }

        let userEmailText;
        const emailValidate = [email];
        if(!this.props.email) {
            userEmailText = `You haven't set an email yet.`;
            //if an email has not been set already, make it required to enter one
            emailValidate.push(required, nonEmpty);
        } else {
            userEmailText = `Your contact email is: ${this.props.email}`;
        }
    
        const {pristine, submitting, handleSubmit} = this.props;
        let changeText;
        if(this.props.editing){
            changeText = (<form className="user-info-form" onSubmit={handleSubmit(this.onSubmit)}>
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
                    onClick={() => this.handleEdit()}
                    >Cancel</button>
            </form>)
        } else if (!this.props.zipcode && !this.props.email) {
            changeText = <button onClick={() => this.handleEdit()}>Add User Info</button>
        } else {
            changeText = <button onClick={() => this.handleEdit()}>Update User Info?</button>
        }

        return(
            <section className="user-info">
                <h2>Hi {this.props.username}</h2>
                <p>{userZipText}</p>
                <p>{userEmailText}</p>
                {changeText}
            </section>
        )
    }
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