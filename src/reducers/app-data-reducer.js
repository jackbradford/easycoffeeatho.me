/**
 * @file app-data-reducer
 *
 */
import { combineReducers } from 'redux';
import { auth } from '../auth';
import {
    LOAD_USER_AND_APP_DATA_BEGIN,
    LOAD_USER_AND_APP_DATA_END,
    LOAD_USER_AND_APP_DATA_ERROR
} from '../actions';

function getUnits(payload) {

    var units = {};
    for (const index in payload.units) {
        const unit = payload.units[index];
        units[unit.id] = unit;
    }
    return units;
}

export default function appData(

    state = {
        error: null,
        loading: false,
        units: [],
    },
    action
) {

    switch (action.type) {

        case LOAD_USER_AND_APP_DATA_BEGIN:
            return {
                ...state,
                error: null,
                loading: true,
            };

        case LOAD_USER_AND_APP_DATA_END:
            const units = getUnits(action.payload);
            return {
                ...state,
                loading: false,
                units: units
            };

        case LOAD_USER_AND_APP_DATA_ERROR:
            return {
                ...state,
                error: action.payload.error,
                loading: false,
            };
        default:
            return state;
    }
}

