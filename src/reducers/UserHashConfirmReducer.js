import {
    USER_HASH_CONFIRM_REQUEST,
    USER_HASH_CONFIRM_SUCCESS,
    USER_HASH_CONFIRM_FAILURE
} from '../constants/UserHashConfirmConstants';

export default function UserHashConfirmReducer(state = {
    isFetching: false,
    data: 0,
    errorMessage: ''
}, action) {
    switch (action.type) {
    case USER_HASH_CONFIRM_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching
        });
    case USER_HASH_CONFIRM_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data
        });
    case USER_HASH_CONFIRM_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message
        });
    default:
        return state
    }
}