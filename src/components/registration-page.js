import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import RegistrationForm from './registration-form';
import './registration-page.css';

export function RegistrationPage(props) {
    console.log('the props are:', props);
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        console.log('we logged in...')
        return <Redirect to="/dashboard" />
    }
    let loadingText="";
    if (props.loading) loadingText = <p>Signing up...</p>
    return (
        <main className="registration-container">
            <RegistrationForm />
            {loadingText}
            <section className="switch-forms">
                <p className="switch-text">Already have an account?</p>
                <Link to="/login">Login</Link>
            </section>
        </main>
    );
}

const mapStateToProps = state => ({
    loading: state.auth.loading,
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);