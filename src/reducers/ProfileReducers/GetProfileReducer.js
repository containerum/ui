import {
    PROFILE_GET_REQUEST,
    PROFILE_GET_SUCCESS,
    PROFILE_GET_FAILURE
} from '../../constants/ProfileConstants';

export default function GetProfileReducer(state = {
    isFetching: false,
    data: {},
    errorMessage: ''
}, action) {
    switch (action.type) {
    case PROFILE_GET_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: ''
        });
    case PROFILE_GET_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data
        });
    case PROFILE_GET_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message
        });
    default:
        return state
    }
}