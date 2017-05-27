import {
    CHECK_HASH_REQUEST,
    CHECK_HASH_SUCCESS,
    CHECK_HASH_FAILURE
} from '../constants/checkHashParamConstants';

export default function checkHashParamReducer(state = {
    isFetching: false,
    errorMessage: ''
}, action) {
    switch (action.type) {
    case CHECK_HASH_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: ''
        });
    case CHECK_HASH_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            response_hash: action.response_hash
        });
    case CHECK_HASH_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message
        });
    default:
        return state
    }
}