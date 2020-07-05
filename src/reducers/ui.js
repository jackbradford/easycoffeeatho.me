import { combineReducers } from 'redux';
import { auth } from '../auth';
import {
    FILTER_LIST,
    SORT_LIST,
    CHANGE_LIST_LAYOUT,
} from '../actions/list-actions';

const defaultList = {
    filter: null,
    layout: null,
    sort: {
        direction: null,
        field: null,
    },
    search: {
        keyphrase: null,
        field: null,
    },
    pagination: {
        enabled: true,
        itemsPerPage: 25,
    },
    filters: [],
};

export default function ui(

    state = {
        individuals: defaultList,
        taxa: defaultList
    },
    action
) {

    switch (action.type) {

        case FILTER_LIST: 
            var listLabel = this.action.payload.listLabel;
            var newFilter = this.action.payload.filter;
            return {
                ...state,
                [listLabel]: {
                    ...state[listLabel],
                    filter: newFilter,
                }
            };

        case SORT_LIST:
            var listLabel = this.action.payload.listLabel;
            var newSort = this.action.payload.sort;
            return {
                ...state,
                [listLabel]: {
                    ...state[listLabel],
                    sort: {
                        ...state[listLabel].sort,
                        newSort,
                    }
                }
            };

        case CHANGE_LIST_LAYOUT:
            var listLabel = this.action.payload.listLabel;
            var newLayout = this.action.payload.layout;
            return {
                ...state,
                [listLabel]: {
                    ...state[listLabel],
                    layout: newLayout,
                }
            };

        default:
            return state;
    }
}

