import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE
} from '../../constants/SignUpConstants';

import {
    VALIDATE_EMAIL
} from '../../constants/ValudateEmailConstaints';

export default function SignUpReducer(state = {
    isFetching: false,
    isAuthenticated: !!localStorage.getItem('id_token'),
    errorMessage: '',
    emailUser: ''
}, action) {
    switch (action.type) {
    case SIGNUP_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            user: action.creds,
            errorMessage: '',
            emailUser: ''
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
    case VALIDATE_EMAIL:
        return Object.assign({}, state, {
            emailUser: action.emailUser
        });
    default:
        return state;
    }
}
