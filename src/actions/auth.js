// import jwtDecode from 'jwt-decode';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import {SubmissionError} from 'redux-form';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = authToken => ({
    type: SET_AUTH_TOKEN,
    authToken
});

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
    type: AUTH_REQUEST
});

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = currentUser => ({
    type: AUTH_SUCCESS,
    currentUser
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = error => ({
    type: AUTH_ERROR,
    error
})

const storeAuthInfo = (username, authToken, dispatch) => {
    dispatch(setAuthToken(authToken));
    dispatch(authSuccess(username));
    //TODO: save to local storage
};

export const login = user => dispatch => {
    dispatch(authRequest());
    return (
        fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({username, authToken}) => storeAuthInfo(username, authToken, dispatch))
        .catch(err => {
            const {code} = err;
            const message = 
                code === 401 
                ? 'Incorrect username or password' 
                : 'Unable to login, please try again';
            dispatch(authError(err));
            return Promise.reject(
                new SubmissionError({
                    _error: message
                })
            );
        })
    );
}