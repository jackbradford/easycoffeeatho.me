/**
 * @file list-reducer.js
 * This file provides the reducer for the state of the lists.
 *
 */
import { combineReducers } from 'redux';
import {
} from '../actions';

var list = {
    filters: [],
    sortOrder: NAME_ASC,
    items: {},
};

var filter = {
    type: null,
    criterion: {},
}

function criteriaMatch(a, b) {

    return (JSON.stringify(a) === JSON.stringify(b)) ? true : false;
}

export default function appData(

    state = {
        beans: list,
        water: list,
        equipment: list,
        articles: list
    },
    action
) {

    switch (action.type) {

        case APPLY_LIST_FILTER:
            var p = action.payload;
            var newFilters = state[p.catalogSection].filters.push({
                type: p.filter,
                criterion: p.criterion,
            });
            return {
                ...state,
                [p.catalogSection]: {
                    ...state[p.catalogSection],
                    filters: newFilters,
                }
            };

        case REMOVE_LIST_FILTER:
            var p = action.payload;
            var newFilters = state[p.listType].filters.splice(
                state[p.catalogSection].filters.findIndex(function(filter) {
                    return (
                        filter.type == p.filter.type
                        && criteriaMatch(filter.criterion, p.filter.criterion)
                    ) ? true : false;
                }), 1
            );
            return {
                ...state,
                [p.catalogSection]: {
                    ...state[p.catalogSection],
                    filters: newFilters,
                }
            };





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

