import {
    CREATE_NAMESPACE_REQUEST,
    CREATE_NAMESPACE_SUCCESS,
    CREATE_NAMESPACE_FAILURE
} from '../../constants/NamespacesConstants';

export default function CreateNamespaceReducer(state = {
    isFetching: false
}, action) {
    switch (action.type) {
    case CREATE_NAMESPACE_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching
        });
    case CREATE_NAMESPACE_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching
        });
    case CREATE_NAMESPACE_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching
        });
    default:
        return state;
    }
}
