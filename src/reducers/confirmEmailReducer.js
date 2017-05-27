import {
    EMAIL_CONFIRM_REQUEST,
    EMAIL_CONFIRM_SUCCESS,
    EMAIL_CONFIRM_FAILURE
} from '../constants/ConfirmEmail';

export default function confirmEmailReducer(state = {
    isFetching: false,
    isAuthenticated: !!localStorage.getItem('id_token'),
    isConfirmed: false,
    errorMessage: ''
}, action) {
    switch (action.type) {
    case EMAIL_CONFIRM_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            isConfirmed: action.isConfirmed,
            errorMessage: ''
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