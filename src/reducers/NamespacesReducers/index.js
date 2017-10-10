import {
    NAMESPACES_REQUEST,
    NAMESPACES_SUCCESS,
    NAMESPACES_FAILURE
} from '../../constants/NamespacesConstants';

export default function NamespacesReducer(state = {
    isFetching: false,
    data: [],
    errorMessage: ''
}, action) {
    switch (action.type) {
    case NAMESPACES_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: ''
        });
    case NAMESPACES_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data
        });
    case NAMESPACES_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message
        });
    default:
        return state;
    }
}
