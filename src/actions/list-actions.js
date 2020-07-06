/**
 * @file list-actions.js
 * Actions for the List component.
 *
 */
import { getCriterion } from '../lib/js/filter-criteria';

export const APPLY_LIST_FILTER = "APPLY_LIST_FILTER";
export const REMOVE_LIST_FILTER = "REMOVE_LIST_FILTER";
export const SET_LIST_LAYOUT = "SET_LIST_LAYOUT";
export const SORT_LIST = "SORT_LIST";
export const CHANGE_LIST_LAYOUT = "CHANGE_LIST_LAYOUT";

export const setListLayout = (listType, newLayout) => {

    return {
        type: SET_LIST_LAYOUT,
        listType: listType,
        newLayout: newLayout,
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

export const sortList = (listLabel, sort) => {

    return {
        type: SORT_LIST,
        payload: {
            listLabel: listLabel,
            sort: sort,
        }
    }
};

export const setListLayout = (listLabel, layout) => {

    return {
        type: SET_LIST_LAYOUT,
        payload: {
            listLabel: listLabel,
            layout: layout,
        }
    }
};

