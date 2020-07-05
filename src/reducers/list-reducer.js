/**
 * @file list-reducer.js
 * This file provides the reducer for the state of the lists.
 *
 */
import {
    APPLY_LIST_FILTER,
    REMOVE_LIST_FILTER,
} from '../actions/list-actions';

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

export default function list(

    state = {
        BEANS_LIST: list,
        WATER_LIST: list,
        EQUIPMENT_LIST: list,
        ARTICLE_LIST: list
    },
    action
) {

    switch (action.type) {

        case APPLY_LIST_FILTER:
            var p = action.payload;
            var newFilters = state[p.listType].filters;
            newFilters.push({
                type: p.filter,
                criterion: p.criterion,
            });
            return {
                ...state,
                [p.listType]: {
                    ...state[p.listType],
                    filters: newFilters,
                }
            };

        case REMOVE_LIST_FILTER:
            var p = action.payload;
            var newFilters = state[p.listType].filters;
            newFilters.splice(
                state[p.listType].filters.findIndex(function(filter) {
                    return (
                        filter.type == p.filter
                        && criteriaMatch(filter.criterion, p.criterion)
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

