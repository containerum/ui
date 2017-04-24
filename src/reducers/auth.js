import {
    LOGOUT_SUCCESS
} from '../actions';

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from '../constants/LoginConstants';

import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE
} from '../constants/SignUpConstants';

import {
    EMAIL_CONFIRM_REQUEST,
    EMAIL_CONFIRM_SUCCESS,
    EMAIL_CONFIRM_FAILURE
} from '../constants/ConfirmEmail';

export default function auth(state = {
    isFetching: false,
    isAuthenticated: !!localStorage.getItem('id_token'),
    isConfirmed: false
}, action) {
    switch (action.type) {
    case SIGNUP_REQUEST:
        return Object.assign({}, state, {
            isFetching: true,
            user: action.creds
        });
    case SIGNUP_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            errorMessage: ''
        });
    case SIGNUP_FAILURE:
        return Object.assign({}, state, {
            isFetching: false,
            errorMessage: action.message
        });
    case LOGOUT_SUCCESS:
        return Object.assign({}, state, {
            isFetching: true,
            isAuthenticated: false
        });
    case LOGIN_REQUEST:
        return Object.assign({}, state, {
            isFetching: true,
            isAuthenticated: false,
            user: action.creds
        });
    case LOGIN_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            isAuthenticated: true,
            errorMessage: ''
        });
    case LOGIN_FAILURE:
        return Object.assign({}, state, {
            isFetching: false,
            isAuthenticated: false,
            errorMessage: action.message
        });
    case EMAIL_CONFIRM_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            isConfirmed: action.isConfirmed
        });
    case EMAIL_CONFIRM_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            isConfirmed: action.isConfirmed,
            email: action.creds
        });
    case EMAIL_CONFIRM_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            isConfirmed: action.isConfirmed,
            errorMessage: action.message
        });
    default:
        return state
    }
}