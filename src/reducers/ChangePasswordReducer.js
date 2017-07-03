import {
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILURE
} from '../constants/ChangePasswordConstaints';

export default function ChangePasswordReducer(state = {
    isFetching: false,
    data: '',
    errorMessage: ''
}, action) {
    switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: ''
        });
    case CHANGE_PASSWORD_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data
        });
    case CHANGE_PASSWORD_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message
        });
    default:
        return state;
    }
}
