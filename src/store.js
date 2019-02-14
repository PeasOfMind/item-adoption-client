import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {appReducer} from './reducers';
import {reducer as formReducer} from 'redux-form';

export default createStore(
    combineReducers({
        form: formReducer,
        app: appReducer
    }), 
    applyMiddleware(thunk)
);