import {
    HASH_PASSWORD_REQUEST,
    HASH_PASSWORD_SUCCESS,
    HASH_PASSWORD_FAILURE
} from '../../constants/CheckHashPasswordConstants';

export default function CheckHashPasswordReducer(state = {
    isFetching: false,
    status: 0,
    hashParam: ''
}, action) {
    switch (action.type) {
    case HASH_PASSWORD_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching
        });
    case HASH_PASSWORD_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            status: action.status,
            hashParam: action.hashParam
        });
    case HASH_PASSWORD_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            status: action.status,
            hashParam: action.hashParam
        });
    default:
        return state;
    }
}
