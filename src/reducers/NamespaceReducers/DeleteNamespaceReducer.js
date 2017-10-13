import {
    DELETE_NAMESPACE_REQUEST,
    DELETE_NAMESPACE_SUCCESS,
    DELETE_NAMESPACE_FAILURE
} from '../../constants/NamespaceConstants';

export default function DeleteNamespaceReducer(state = {
    isFetching: false,
    status: 0,
    errorMessage: '',
    idName: ''
}, action) {
    switch (action.type) {
    case DELETE_NAMESPACE_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: '',
            status: 0,
            idName: ''
        });
    case DELETE_NAMESPACE_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            status: action.status,
            idName: action.status
        });
    case DELETE_NAMESPACE_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message,
            status: action.status
        });
    default:
        return state;
    }
}
