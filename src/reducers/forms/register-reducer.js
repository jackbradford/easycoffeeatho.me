/**
 * @file register-reducer.js
 * This file provides the reducer for the Register page.
 *
 */
import { USER_REGISTER_FORM } from '../../config/forms';
import {
    RESET_FORM,
    RESET_FORM_SUBMISSION_STATUS
} from '../../actions/form-actions';
import {
    CLIENT_VALIDATE_INPUT,
    SERVER_VALIDATE_INPUT_BEGIN,
    SERVER_VALIDATE_INPUT_END,
    SERVER_VALIDATE_INPUT_ERROR,
} from '../../actions/interface/text-input-actions';

const initialRegisterField = {
    error: null,
    isValid: null,
    isValidating: false,
    message: '',
    serverData: {},
};

const initialRegisterFormState = {
    isBeingSubmitted: false,
    submittedSuccessfully: null,
    hasErrors: false,
    error: null,
    message: '',
    email: null,
}
    
export default function register(

    state = {
        form: initialRegisterFormState,
        fields: {
            emailAddress: initialRegisterField,
            username: initialRegisterField,
            password: initialRegisterField,
            passwordMatch: initialRegisterField,
            firstName: initialRegisterField,
            lastName: initialRegisterField,
        }
    },
    action
) {

    switch (action.type) {

        case CLIENT_VALIDATE_INPUT:
            if (action.payload.form != USER_REGISTER_FORM) return;
            var payload = action.payload;
            return {
                ...state,
                fields: {
                    ...state.fields,
                    [payload.field]: {
                        ...state.field[payload.field],
                        isValid: payload.isValid,
                        isValidating: false,
                        message: payload.message,
                    }
                }
            };


        case SERVER_VALIDATE_INPUT_BEGIN:
            var field = action.payload.fieldType;
            return {
                ...state,
                fields: {
                    ...state.fields,
                    [field]: {
                        ...state.fields[field],
                        isValidating: true,
                        error: null
                    }
                }
            };

        case SERVER_VALIDATE_INPUT_END:
            var response = action.payload.serverResponse;
            var field = response.data.fieldType;
            return {
                ...state,
                fields: {
                    ...state.fields,
                    [field]: {
                        ...state.fields[field],
                        isValidating: false,
                        isValid: response.data.success,
                        message: response.data.message,
                        serverData: response.data,
                    },
                },
            };


        case SERVER_VALIDATE_INPUT_ERROR:
            var field = action.payload.error.fieldType;
            return {
                ...state,
                fields: {
                    ...state.fields,
                    [field]: {
                        ...state.fields[field],
                        error: action.payload.error,
                        isValid: false,
                        isValidating: false,
                        message: action.payload.error.message,
                    }
                }
            };

        case REGISTER_USER_BEGIN:
            return {
                ...state,
                form: {
                    ...state.form,
                    isBeingSubmitted: true,
                }
            };

        case REGISTER_USER_END:
            var response = action.payload.response;
            return {
                ...state,
                form: {
                    ...state.form,
                    isBeingSubmitted: false,
                    hasErrors: !response.data.success,
                    message: response.data.message,
                    email: response.data.email,
                    submittedSuccessfully: response.data.success
                    
                },
            });

        case REGISTER_USER_ERROR:
            var error = action.payload.error;
            return Object.assign({}, state, {
                form: Object.assign({}, state.form, {
                    isBeingSubmitted: false,
                    hasErrors: true,
                    message: error.message,
                    submittedSuccessfully: false
                }),
            });

        case RESET_FORM:
            if (action.payload.form != USER_REGISTER_FORM) return;
            return {
                ...state,
                form: initialRegisterForm,
                fields: {
                    ...state.fields,
                    emailAddress: initialRegisterField,
                    username: initialRegisterField,
                    password: initialRegisterField,
                    passwordMatch: initialRegisterField,
                    firstName: initialRegisterField,
                    lastName: initialRegisterField,
                }
            };

        case RESET_FORM_SUBMISSION_STATUS:
            if (action.payload.form != USER_REGISTER_FORM) return;
            return Object.assign({}, state, {
            return {
                ...state,
                form: {
                    ...state.form,
                    isBeingSubmitted: false,
                    submittedSuccessfully: null,
                    email: null,
                }),
            });

        default:
            return state;
    }
}

