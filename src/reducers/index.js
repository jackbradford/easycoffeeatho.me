import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import activate from './activate-reducer.js';
import appData from './app-data-reducer.js';
import forms from './forms.js'
import header from './header-reducer.js';
import list from './list.js';
import user from './user-reducer.js';

export default combineReducers({
    activate,
    appData,
    forms,
    header,
    list,
    routing: routerReducer,
    user,
});

