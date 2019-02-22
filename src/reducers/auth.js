import {
    AUTH_REQUEST, 
    SET_AUTH_TOKEN,
    AUTH_SUCCESS,
    AUTH_ERROR,
    CLEAR_AUTH,
    FETCH_ZIP_SUCCESS,
    FETCH_ZIP_ERROR,
    UPDATE_ZIP_ERROR,
    TOGGLE_USER_EDIT,
    UPDATE_ZIP_SUCCESS
} from '../actions/auth';

const initialState = {
    authToken: null,
    currentUser: null,
    userId: null,
    userZip: null,
    loading: false,
    loginError: null,
    fetchZipError: null,
    updateZipError: null,
    editing: false
};

export default function authReducer(state = initialState, action){
    if (action.type === SET_AUTH_TOKEN) {
        return Object.assign({}, state, {
            authToken: action.authToken
        });
    }
    else if (action.type === CLEAR_AUTH) {
        return Object.assign({}, state, {
            authToken: null,
            currentUser: null
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
            loginError: action.error
        });
    }
    else if (action.type === FETCH_ZIP_SUCCESS){
        return Object.assign({}, state, {
            userZip: action.zipcode,
            fetchZipError: null
        });
    }
    else if (action.type === FETCH_ZIP_ERROR){
        return Object.assign({}, state, {
            fetchZipError: action.error
        });
    }
    else if(action.type === UPDATE_ZIP_SUCCESS){
        return Object.assign({}, state, {
            updateZipError: null
        }); 
    }
    else if (action.type === UPDATE_ZIP_ERROR){
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