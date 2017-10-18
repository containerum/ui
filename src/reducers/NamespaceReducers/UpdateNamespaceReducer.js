import {
    UPDATE_NAMESPACE_REQUEST,
    UPDATE_NAMESPACE_SUCCESS,
    UPDATE_NAMESPACE_FAILURE
} from '../../constants/NamespaceConstants';

export default function UpdateNamespaceReducer(state = {
    isFetching: false,
    data: {},
    status: '',
    idName: '',
    errorMessage: ''
}, action) {
    switch (action.type) {
    case UPDATE_NAMESPACE_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: {},
            errorMessage: '',
            status: '',
            idName: ''
        });
    case UPDATE_NAMESPACE_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data,
            status: action.status,
            idName: action.idName
        });
    case UPDATE_NAMESPACE_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message,
            status: action.status,
            idName: action.idName
        });
    default:
        return state;
    }
}
