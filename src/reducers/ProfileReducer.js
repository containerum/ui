import {
    PROFILE_REQUEST,
    PROFILE_SUCCESS,
    PROFILE_FAILURE
} from '../constants/ProfileConstants';

export default function ProfileReducer(state = {
    isFetching: false,
    data: {},
    errorMessage: ''
}, action) {
    switch (action.type) {
    case PROFILE_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: ''
        });
    case PROFILE_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data
        });
    case PROFILE_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message
        });
    default:
        return state
    }
}