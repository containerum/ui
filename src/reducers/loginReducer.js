import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from '../constants/LoginConstants';

export default function loginReducer(state = {
    isFetching: false,
    isAuthenticated: !!localStorage.getItem('id_token'),
    errorMessage: ''
}, action) {
    switch (action.type) {
    case LOGIN_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            isAuthenticated: action.isAuthenticated,
            user: action.creds,
            errorMessage: ''
        });
    case LOGIN_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            isAuthenticated: action.isAuthenticated,
            id_token: action.id_token
        });
    case LOGIN_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            isAuthenticated: action.isAuthenticated,
            errorMessage: action.message
        });
    default:
        return state
    }
}