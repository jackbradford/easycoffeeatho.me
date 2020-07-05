import { combineReducers } from 'redux';
import { auth } from '../auth';
import {
    LOGIN_REQUEST_BEGIN,
    LOGIN_REQUEST_END,
    LOGIN_REQUEST_ERROR,
    RESET_LOGIN_MESSAGE,
    CHECK_LOGIN_BEGIN,
    CHECK_LOGIN_END,
    CHECK_LOGIN_ERROR,
    LOAD_USER_AND_APP_DATA_BEGIN,
    LOAD_USER_AND_APP_DATA_END,
    LOAD_USER_AND_APP_DATA_ERROR,
} from '../actions';

function getVarieties(payload) {

    var varieties = {};
    for (const index in payload.varieties) {
        const variety = payload.varieties[index];
        varieties[variety.id] = variety;
    }
    return varieties;
}

var conditions = {
    'light': {},
    'water': {},
    'temperature': {},
    'humidity': {},
    'soil': {},
    'fertilizer': {},
}

export default function user(

    state = {
        data: {
            conditions: conditions,
            error: null,
            individuals: [],
            loading: false,
            message: '',
            varieties: [],
        },
        details: {
            email: null,
            isLoggedIn: null,
            firstName: null,
            lastName: null,
            lastLogin: null,
            userId: null,
            username: null
            
        },
        loginRequest: {
            error: null,
            loading: false,
            message: '',
        },
        loginCheck: {
            error: null,
            loading: false,
            message: ''
        },
    },
    action
) {

    switch (action.type) {

        case CHECK_LOGIN_BEGIN:
            return {
                ...state,
                loginCheck: {
                    ...state.loginCheck,
                    error: null,
                    loading: true,
                }
            };

        case CHECK_LOGIN_END:
            var response = action.payload.response;
            return {
                ...state,
                details: {
                    ...state.details,
                    email: response.data.email,
                    isLoggedIn: response.data.isLoggedIn,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    userId: response.data.userId,
                    username: response.data.username,
                    
                },
                loginCheck: {
                    ...state.loginCheck,
                    loading: false,
                    message: response.data.message,
                }
            };

        case CHECK_LOGIN_ERROR:
            return {
                ...state,
                loginCheck: {
                    ...state.loginCheck,
                    error: action.payload.error,
                    loading: false,
                    message: action.payload.error.message
                }
            };

        case LOAD_USER_AND_APP_DATA_BEGIN:
            return {
                ...state,
                data: {
                    ...state.data,
                    error: null,
                    loading: true,
                },
                loginCheck: {
                    ...state.loginCheck,
                    error: null,
                    loading: true,
                    message: null,
                }
            };

        case LOAD_USER_AND_APP_DATA_END:
            const varieties = getVarieties(action.payload);
            var user = action.payload.user;
            return {
                ...state,
                data: {
                    ...state.data,
                    loading: false,
                    individuals: action.payload.individuals,
                    varieties: varieties,
                },
                details: {
                    ...state.details,
                    email: user.email,
                    isLoggedIn: action.payload.userIsLoggedIn,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    lastLogin: user.lastLogin,
                    userId: user.id,
                    username: user.username,
                },
                loginCheck: {
                    ...state.loginCheck,
                    loading: false,
                }
            };

        case LOAD_USER_AND_APP_DATA_ERROR:
            return {
                ...state,
                data: {
                    ...state.data,
                    error: action.payload.error,
                    loading: false,
                },
                loginCheck: {
                    ...state.loginCheck,
                    error: action.payload.error,
                    loading: false,
                    message: action.payload.error.message
                }
            };

        case LOGIN_REQUEST_BEGIN:
            return {
                ...state,
                loginRequest: {
                    ...state.loginRequest,
                    loading: true,
                    error: null
                }
            };

        case LOGIN_REQUEST_END:
            var res = action.payload.serverResponse;
            return {
                ...state,
                details: {
                    ...state.details,
                    email: res.data.email,
                    isLoggedIn: res.userIsLoggedIn,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    userId: res.data.userId,
                    username: res.data.username,
                },
                loginCheck: {
                    ...state.loginCheck,
                    error: null,
                    message: ''
                },
                loginRequest: {
                    ...state.loginRequest,
                    loading: false,
                    message: res.data.message,

                }
            };

        case LOGIN_REQUEST_ERROR:
            return {
                ...state,
                loginRequest: {
                    ...state.loginRequest,
                    error: action.payload.error,
                    loading: false,
                    message: action.payload.error.message
                }
            };

        case RESET_LOGIN_MESSAGE:
            return {
                ...state,
                loginRequest: {
                    ...state.loginRequest,
                    message: ''
                }
            };

        default:
            return state;
    }
}

