/**
 * @file list-actions.js
 * Actions for the List component.
 *
 */
import { getCriterion } from '../lib/js/filter-criteria';

export const FETCH_LIST_ITEMS_BEGIN = "FETCH_LIST_ITEMS_BEGIN";
export const FETCH_LIST_ITEMS_END = "FETCH_LIST_ITEMS_END";
export const FETCH_LIST_ITEMS_ERROR = "FETCH_LIST_ITEMS_ERROR";
export const SET_LIST_PAGINATION = "SET_LIST_PAGINATION";
export const SET_LIST_LAYOUT = "SET_LIST_LAYOUT";
export const APPLY_LIST_FILTER = "APPLY_LIST_FILTER";
export const REMOVE_LIST_FILTER = "REMOVE_LIST_FILTER";
export const SORT_LIST = "SORT_LIST";

export const fetchListItems = (listType, url) => {

    return (dispatch) => {
        dispatch(fetchListItemsBegin(listType));
        return async.request({
            url: url,
            data: {}
        }).then(
            (serverData) => {
                dispatch(fetchListItemsEnd(listType, serverData));
            }
        )
        .catch (
            (error) => {
                dispatch(fetchListItemsError(listType, error));
            }
        )
    }
}

export const fetchListItemsBegin = (listType) => {

    return {
        type: FETCH_LIST_ITEMS_BEGIN,
        payload: {
            listType: listType
        },
    };
};

export const fetchListItemsEnd = (listType, serverData) => {

    return {
        type: FETCH_LIST_ITEMS_END,
        payload: {
            listType: listType,
            data: serverData
        }
    };
};

export const fetchListItemsError = (listType, error) => {

    return {
        type: FETCH_LIST_ITEMS_ERROR,
        payload: {
            listType: listType,
            error: error
        }
    };
};

/**
 * @function setListPagination
 * This function creates an action that represents a change to a list's
 * pagination settings.
 *
 * @param listType string
 * The constant that defines the list.
 *
 * @param pagination object
 * An object which should include the pagination parameters to change.
 * The keys should match those of the state defined in the reducer.
 * Any omitted keys will not be changed.
 */
export const setListPagination = (listType, pagination) => {

    return {
        type: SET_LIST_PAGINATION,
        payload: {
            listType: listType,
            pagination: pagination,
        }
}

export const setListLayout = (listType, newLayout) => {

    return {
        type: SET_LIST_LAYOUT,
        payload: {
            listType: listType,
            newLayout: newLayout,
        }
    }
}

/**
 * @function applyListFilter
 * This function creates an action that represents the application of a
 * filter to a list.
 *
 * @param listType string
 * The constant that defines the list.
 *
 * @param filter string
 * The contant that defines the filter.
 *
 * @param value
 * The value to serve as the filter match.
 *
 */
export const applyListFilter = (listType, filter, value) => {

    var criterion = getCriterion(listType, filter, value);
    return {
        type: APPLY_LIST_FILTER,
        payload: {
            listType: listType,
            filter: filter,
            criterion: criterion,
        }
    }
};

export const removeListFilter = (listType, filter, value) => {

    var criterion = getCriterion(listType, filter, value);
    return {
        type: REMOVE_LIST_FILTER,
        payload: {
            listType: listType,
            filter: filter,
            criterion: criterion,
        }
}

export const sortList = (listLabel, sortOrder) => {

    return {
        type: SORT_LIST,
        payload: {
            listLabel: listLabel,
            sortOrder: sortOrder,
        }
    }
};

