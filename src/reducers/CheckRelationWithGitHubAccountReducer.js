import {
    CHECK_RELATION_REQUEST,
    CHECK_RELATION_SUCCESS,
    CHECK_RELATION_FAILURE
} from '../constants/CheckRelationWithAccountConstants';

export default function CheckRelationWithGitHubAccountReducer(state = {
    isFetching: false,
    data: '',
    errorMessage: ''
}, action) {
    switch (action.type) {
    case CHECK_RELATION_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching
        });
    case CHECK_RELATION_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data
        });
    case CHECK_RELATION_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message
        });
    default:
        return state;
    }
}
