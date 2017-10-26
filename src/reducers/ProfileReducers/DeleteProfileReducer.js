import {
    PROFILE_DELETE_REQUEST,
    PROFILE_DELETE_SUCCESS,
    PROFILE_DELETE_FAILURE
} from '../../constants/ProfileConstants';

export default function DeleteProfileReducer(state = {
    isFetching: false,
    data: '',
    errorMessage: ''
}, action) {
    switch (action.type) {
    case PROFILE_DELETE_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: '',
            errorMessage: ''
        });
    case PROFILE_DELETE_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data
        });
    case PROFILE_DELETE_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message
        });
    default:
        return state;
    }
}
