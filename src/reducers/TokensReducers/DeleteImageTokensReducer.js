import {
    DELETE_IMAGE_TOKENS_REQUEST,
    DELETE_IMAGE_TOKENS_SUCCESS,
    DELETE_IMAGE_TOKENS_FAILURE
} from '../../constants/TokensConstants';

export default function DeleteImageTokensReducer(state = {
    isFetching: false,
    status: 0,
    errorMessage: '',
    WebHook: ''
}, action) {
    switch (action.type) {
    case DELETE_IMAGE_TOKENS_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: '',
            status: 0,
            WebHook: ''
        });
    case DELETE_IMAGE_TOKENS_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            status: action.status,
            WebHook: action.WebHook
        });
    case DELETE_IMAGE_TOKENS_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message,
            status: action.status
        });
    default:
        return state;
    }
}
