import {createStore, combineReducers} from 'redux';

import {appReducer} from './reducers';
import {reducer as formReducer} from 'redux-form';

export default createStore(
    combineReducers({
        form: formReducer,
        app: appReducer
    })
);