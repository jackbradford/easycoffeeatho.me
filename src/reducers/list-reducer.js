/**
 * @file list-reducer.js
 * This file provides the reducer for the state of the lists.
 *
 */
import {
    SET_LIST_LAYOUT,
    APPLY_LIST_FILTER,
    REMOVE_LIST_FILTER,
    SORT_LIST,
    SET_LIST_PAGINATION,
    FETCH_LIST_ITEMS_BEGIN,
    FETCH_LIST_ITEMS_END,
    FETCH_LIST_ITEMS_ERROR,
} from '../actions/list-actions';
import {
    list-layout-grid,
    list-layout-detailed,
} from '../config/list-layouts';
import { NAME_ASC, DATE_DESC } from '../config/list-sort-orders';

/**
 * @constant defaultList
 * This constant defines the state structure of a list.
 */
const defaultList = {
    items: {},
    filters: [],
    layout: list-layout-grid,
    pagination: {
        itemsPerPage: 25,
        currentPage: null,
        totalPages: null,
    },
    sort: NAME_ASC,
    meta: {
        isLoading: false,
        hasError: false,
        error: null,
        message: null,
    }
};

/**
 * @constant defaultFilter
 * This constant defines the state shape of a filter.
 */
const defaultFilter = {
    type: null,
    criterion: {},
}

/**
 * @function criteriaMatch
 * This function compares two criteria objects. If they're identical the
 * function returns TRUE.
 */
function criteriaMatch(a, b) {

    return (JSON.stringify(a) === JSON.stringify(b)) ? true : false;
}

export default function list(

    state = {
        BEANS_LIST: defaultList,
        WATER_LIST: defaultList,
        EQUIPMENT_LIST: defaultList,
        ARTICLE_LIST: {
            ...defaultList,
            layout: list-layout-detailed,
            sort: DATE_DESC
        },
    },
    action
) {

    switch (action.type) {

        case FETCH_LIST_ITEMS_BEGIN:
            var p = action.payload;
            return {
                ...state,
                [p.listType]: {
                    ...state[p.listType],
                    meta: {
                        ...state[p.listType].meta,
                        isLoading: true,
                        hasError: false,
                        error: null,
                        message: null,
                    }
                }
            };

        case FETCH_LIST_ITEMS_END:
            var p = action.payload;
            return {
                ...state,
                [p.listType]: {
                    ...state[p.listType],
                    items: p.data.items,
                    meta: {
                        ...state[p.listType].meta,
                        isLoading: false,
                    }
                }
            };

        case FETCH_LIST_ITEMS_ERROR:
            var p = action.payload;
            return {
                ...state,
                [p.listType]: {
                    ...state[p.listType],
                    meta: {
                        ...state[p.listType].meta,
                        isLoading: false,
                        hasError: true,
                        error: p.error,
                        message: p.error.message,
                    }
                }
            };
            
        case SET_LIST_PAGINATION:
            var p = action.payload;
            var pag = p.pagination;
            var np = {};
            if (pag.itemsPerPage != undefined) np.itemsPerPage = pag.itemsPerPage;
            if (pag.currentPage != undefined) np.currentPage = pag.currentPage;
            if (pag.totalPages != undefined) np.totalPages = pag.totalPages;
            return {
                ...state,
                [p.listType]: {
                    ...state[p.listType],
                    pagination: {
                        ...state[p.listType].pagination,
                        ...np,
                    }
                }
            };

        case SET_LIST_LAYOUT:
            var p = action.payload;
            return {
                ...state,
                [p.listType]: {
                    ...state[p.listType],
                    layout: p.newLayout,
                },
            };

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

        case SORT_LIST:
            var p = action.payload;
            return {
                ...state,
                [p.listType]: {
                    ...state[p.listType],
                    sortOrder: p.sortOrder,
                }
            };

        default:
            return state;
    }
}

