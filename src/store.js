import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import authReducer from './reducers/auth';
import {appReducer} from './reducers';
import {reducer as formReducer} from 'redux-form';

export default createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer,
        app: appReducer
    }), 
    applyMiddleware(thunk)
);