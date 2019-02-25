import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {loadAuthToken} from './local-storage';

import authReducer from './reducers/auth';
import {appReducer} from './reducers';
import {reducer as formReducer} from 'redux-form';
import {setAuthToken, refreshAuthToken} from './actions/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer,
        app: appReducer
    }), 
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

//get authToken from localStorage if it exists
const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}

export default store;