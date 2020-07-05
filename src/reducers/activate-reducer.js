import { combineReducers } from 'redux';
import { auth } from '../auth';
import {
    ACTIVATE_USER_BEGIN,
    ACTIVATE_USER_END,
    ACTIVATE_USER_ERROR,
    GENERATE_NEW_ACTIVATION_LINK_BEGIN,
    GENERATE_NEW_ACTIVATION_LINK_END,
    GENERATE_NEW_ACTIVATION_LINK_ERROR,
    RESET_GENERATE_NEW_ACTIVATION_LINK,
} from '../actions';

export default function activate(

    state = {
        activationCode: null,
        error: null,
        internalMessage: '',
        isActivating: true,
        serverMessage: '',
        success: null,
        userId: null,
        newLink: {
            isGenerating: false,
            success: null,
            serverMessage: '',
        }
    },
    action
) {

    switch (action.type) {

        case ACTIVATE_USER_BEGIN:
            return {
                ...state,
                activationCode: action.payload.activationCode,
                internalMessage: '',
                isActivating: true,
                serverMessage: '',
                userId: action.payload.userId
            };

        case ACTIVATE_USER_END:
            return {
                ...state,
                isActivating: false,
                serverMessage: action.payload.message,
                success: action.payload.success,
                userId: action.payload.userId,
            };

        case ACTIVATE_USER_ERROR:
            return {
                ...state,
                error: action.payload.error,
                internalMessage: action.payload.error.message,
                serverMessage: action.payload.error.message,
                isActivating: false,
                success: false,
            };

        case GENERATE_NEW_ACTIVATION_LINK_BEGIN:
            return {
                ...state,
                userId: action.payload.userId,
                newLink: {
                    ...state.newLink,
                    isGenerating: true,
                }
            };

        case GENERATE_NEW_ACTIVATION_LINK_END:
            return {
                ...state,
                newLink: {
                    ...state.newLink,
                    isGenerating: false,
                    success: action.payload.success,
                    serverMessage: action.payload.message,
                }
            };

        case GENERATE_NEW_ACTIVATION_LINK_ERROR:
            return {
                ...state,
                newLink: {
                    ...state.newLink,
                    isGenerating: false,
                    success: false,
                    serverMessage: action.payload.message,
                }
            };

        case RESET_GENERATE_NEW_ACTIVATION_LINK:
            return {
                ...state,
                newLink: {
                    ...state.newLink,
                    isGenerating: false,
                    success: null,
                    serverMessage: '',
                }
            };

        default:
            return state;
    }
}

