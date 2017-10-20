import {
    GET_IMAGE_TOKENS_REQUEST,
    GET_IMAGE_TOKENS_SUCCESS,
    GET_IMAGE_TOKENS_FAILURE
} from '../../constants/TokensConstants';

export default function GetImageTokensReducer(state = {
    isFetching: false,
    data: {},
    errorMessage: ''
}, action) {
    switch (action.type) {
    case GET_IMAGE_TOKENS_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: [],
            errorMessage: ''
        });
    case GET_IMAGE_TOKENS_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data
        });
    case GET_IMAGE_TOKENS_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message
        });
    default:
        return state;
    }
}
