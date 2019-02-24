import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import authReducer from './reducers/auth';
import {appReducer} from './reducers';
import {reducer as formReducer} from 'redux-form';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer,
        app: appReducer
    }), 
    composeEnhancers(
        applyMiddleware(thunk)
    )
);