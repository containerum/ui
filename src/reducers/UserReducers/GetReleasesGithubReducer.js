import {
    GET_RELEASES_REQUEST,
    GET_RELEASES_SUCCESS,
    GET_RELEASES_FAILURE
} from '../../constants/GetReleasesGithubConstans';

export default function GetReleasesGithubReducer(state = {
    isFetching: false,
    data: [],
    errorMessage: ''
}, action) {
    switch (action.type) {
    case GET_RELEASES_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching
        });
    case GET_RELEASES_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data
        });
    case GET_RELEASES_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.errorMessage
        });
    default:
        return state;
    }
}
