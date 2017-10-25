import {
    CREATE_NAMESPACE_REQUEST,
    CREATE_NAMESPACE_SUCCESS,
    CREATE_NAMESPACE_FAILURE
} from '../../constants/NamespaceConstants';

export default function CreateNamespaceReducer(state = {
    isFetching: false,
    data: {},
    status: '',
    idName: '',
    errorMessage: ''
}, action) {
    switch (action.type) {
    case CREATE_NAMESPACE_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: {},
            errorMessage: '',
            status: '',
            idName: ''
        });
    case CREATE_NAMESPACE_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data,
            status: action.status,
            idName: action.idName
        });
    case CREATE_NAMESPACE_FAILURE:
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
