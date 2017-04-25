import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE
} from '../constants/SignUpConstants';

export default function signUpReducer(state = {
    isFetching: false,
    isAuthenticated: !!localStorage.getItem('id_token')
}, action) {
    switch (action.type) {
    case SIGNUP_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            user: action.creds
        });
    case SIGNUP_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: ''
        });
    case SIGNUP_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message
        });
    default:
        return state
    }
}