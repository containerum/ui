import {
    NSTARIFFS_REQUEST,
    NSTARIFFS_SUCCESS,
    NSTARIFFS_FAILURE
} from '../../constants/NamespacesConstants';

export default function NSTariffsReducer(state = {
    isFetching: false,
    data: [],
    errorMessage: ''
}, action) {
    switch (action.type) {
    case NSTARIFFS_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: ''
        });
    case NSTARIFFS_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data
        });
    case NSTARIFFS_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message
        });
    default:
        return state;
    }
}
