import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

export default () => Component => {
    function RequiresLogin(props){
        const {authenticating, loggedIn, error, ...passThroughProps} = props;
        console.log(authenticating);
        if (authenticating) {
            return <div>Logging in...</div>;
        } else if(!loggedIn || error) {
            console.log('user is logged in:', loggedIn);
            console.log('error', error)
            console.log('not logged in - redirecting to landing page')
            return <Redirect to="/" />;
        }

        return <Component {...passThroughProps} />;
    }

    const displayName = Component.displayName || Component.name || 'Component';
    RequiresLogin.displayName = `RequiresLogin(${displayName})`;

    const mapStateToProps = (state, props) => ({
        authenticating: state.auth.loading,
        loggedIn: state.auth.currentUser !== null,
        error: state.auth.loginError
    });

    return connect(mapStateToProps)(RequiresLogin);
}