import {
    CREATE_IMAGE_TOKENS_REQUEST,
    CREATE_IMAGE_TOKENS_SUCCESS,
    CREATE_IMAGE_TOKENS_FAILURE
} from '../../constants/TokensConstants';

export default function CreateImageTokensReducer(state = {
    isFetching: false,
    data: {},
    status: '',
    WebHook: '',
    errorMessage: ''
}, action) {
    switch (action.type) {
    case CREATE_IMAGE_TOKENS_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: {},
            errorMessage: '',
            status: '',
            WebHook: ''
        });
    case CREATE_IMAGE_TOKENS_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data,
            status: action.status,
            WebHook: action.WebHook
        });
    case CREATE_IMAGE_TOKENS_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message,
            status: action.status,
            WebHook: action.WebHook
        });
    default:
        return state;
    }
}
