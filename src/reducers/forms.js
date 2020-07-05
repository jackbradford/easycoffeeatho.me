import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import register from './register-reducer.js';
import {
    USER_REGISTER_FORM,
} from '../forms';

export default combineReducers({

    USER_REGISTER_FORM: register,
});

