import {
    EMAIL_CONFIRM_REQUEST,
    EMAIL_CONFIRM_SUCCESS,
    EMAIL_CONFIRM_FAILURE,
    CONFIRM_REQUEST
} from '../../constants/ConfirmEmail';

let isExistToken = false;
if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    isExistToken = !!localStorage.getItem('id_token');
}
export default function ConfirmEmailReducer(state = {
    isFetching: false,
    isAuthenticated: isExistToken,
    isConfirmed: false,
    errorMessage: '',
    emailUser: ''
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
            data: action.data
        });
    case EMAIL_CONFIRM_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            isConfirmed: action.isConfirmed,
            errorMessage: action.message
        });
    case CONFIRM_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            isConfirmed: action.isConfirmed,
            emailUser: action.emailUser
        });
    default:
        return state;
    }
}
