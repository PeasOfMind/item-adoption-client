import {
    AUTH_REQUEST, 
    SET_AUTH_TOKEN,
    AUTH_SUCCESS,
    AUTH_ERROR,
    CLEAR_AUTH,
    FETCH_USER_INFO_SUCCESS,
    FETCH_USER_INFO_ERROR,
    UPDATE_USER_INFO_ERROR,
    TOGGLE_USER_EDIT,
    UPDATE_USER_INFO_SUCCESS
} from '../actions/auth';

export const initialState = {
    authToken: null,
    currentUser: null,
    userId: null,
    userZip: null,
    userEmail: null,
    loading: false,
    loginError: null,
    fetchZipError: null,
    updateZipError: null,
    editing: false
};

export default function authReducer(state = initialState, action){
    if (action.type === SET_AUTH_TOKEN) {
        return Object.assign({}, state, {
            loading: false,
            authToken: action.authToken
        });
    }
    else if (action.type === CLEAR_AUTH) {
        return Object.assign({}, state, {
            authToken: null,
            currentUser: null,
            userZip: null,
            userEmail: null,
            userId: null
        })
    }
    else if (action.type === AUTH_REQUEST) {
        return Object.assign({}, state, {
            loading: true,
            loginError: null
        });
    }
    else if (action.type === AUTH_SUCCESS) {
        return Object.assign({}, state, {
            loading: false,
            currentUser: action.currentUser,
            userId: action.userId,
            editing: false
        });
    }
    else if (action.type === AUTH_ERROR) {
        return Object.assign({}, state, {
            loginError: action.error,
            loading: false
        });
    }
    else if (action.type === FETCH_USER_INFO_SUCCESS){
        return Object.assign({}, state, {
            userZip: action.zipcode,
            userEmail: action.email,
            fetchZipError: null
        });
    }
    else if (action.type === FETCH_USER_INFO_ERROR){
        return Object.assign({}, state, {
            fetchZipError: action.error
        });
    }
    else if(action.type === UPDATE_USER_INFO_SUCCESS){
        return Object.assign({}, state, {
            updateZipError: null
        }); 
    }
    else if (action.type === UPDATE_USER_INFO_ERROR){
        return Object.assign({}, state, {
            updateZipError: action.error
        }); 
    }
    else if (action.type === TOGGLE_USER_EDIT){
        return Object.assign({}, state, {
            editing: !state.editing
        });
    }

    return state;

};