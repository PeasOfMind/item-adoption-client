import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import {SubmissionError} from 'redux-form';
import {saveAuthToken, clearAuthToken} from '../local-storage';
import { changePage } from '.';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = authToken => ({
    type: SET_AUTH_TOKEN,
    authToken
});

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => ({
    type: CLEAR_AUTH
})

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
    type: AUTH_REQUEST
});

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = (currentUser, userId) => ({
    type: AUTH_SUCCESS,
    currentUser,
    userId
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = error => ({
    type: AUTH_ERROR,
    error
})

const storeAuthInfo = (username, authToken, id, dispatch) => {
    dispatch(setAuthToken(authToken));
    dispatch(authSuccess(username, id));
    saveAuthToken(authToken);
};

export const registerUser = user => dispatch => {
    return fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        mode: "cors",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(user)
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(({username, authToken, id}) => {
        storeAuthInfo(username, authToken, id, dispatch);
        dispatch(changePage('dashboard'));
    })
    .catch(err => {
        const {reason, message, location} = err;
        dispatch(authError(err));
        if (reason === 'ValidationError'){
            return Promise.reject(
                new SubmissionError({
                    [location]: message
                })
            );
        }
    });
};

export const login = user => dispatch => {
    dispatch(authRequest());
    return (
        fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(user)
        })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({username, authToken, id}) => {
            storeAuthInfo(username, authToken, id, dispatch);
            dispatch(changePage('dashboard'));
        })
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

export const refreshAuthToken = () => (dispatch, getState) => {
    dispatch(authRequest());
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${authToken}` 
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(resJson => storeAuthInfo(resJson.authToken, dispatch))
    .catch(err => {
        //current token is probably invalid or expired, clear authentication info and log out user
        dispatch(authError(err));
        dispatch(clearAuth());
        //remove current token from local storage
        clearAuthToken(authToken);
    })
}

export const FETCH_ZIP_SUCCESS = 'FETCH_ZIP_SUCCESS';
export const fetchZipSuccess = zipcode => ({
    type: FETCH_ZIP_SUCCESS,
    zipcode
})

export const FETCH_ZIP_ERROR = 'FETCH_ZIP_ERROR';
export const fetchZipError = error => ({
    type: FETCH_ZIP_ERROR,
    error
});

export const fetchZip = () => (dispatch, getState) => {
    const {authToken, userId} = getState().auth;
    fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${authToken}` 
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(resJson => {
        dispatch(fetchZipSuccess(resJson.zipcode));
    })
    .catch(err => {
        dispatch(fetchZipError(err));
    })
}

export const UPDATE_ZIP_SUCCESS = 'UPDATE_ZIP_SUCCESS';
export const updateZipSuccess = () => ({
    type: UPDATE_ZIP_SUCCESS
});

export const UPDATE_ZIP_ERROR = 'UPDATE_ZIP_ERROR';
export const updateZipError = error => ({
    type: UPDATE_ZIP_ERROR,
    error
});

export const updateZip = updateData => (dispatch, getState) => {
    const {authToken, userId} = getState().auth;
    fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${authToken}` 
        },
        body: JSON.stringify(updateData)
    })
    .then(res => normalizeResponseErrors(res))
    .then(() => {
        dispatch(fetchZip());
        dispatch(toggleUserEdit());
    })
    .catch(err => {
        dispatch(updateZipError(err));
    })
} 

export const TOGGLE_USER_EDIT ='TOGGLE_USER_EDIT';
export const toggleUserEdit = () => ({
    type: TOGGLE_USER_EDIT
})
