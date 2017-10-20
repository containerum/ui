import {
    GET_NAMESPACE_REQUEST,
    GET_NAMESPACE_SUCCESS,
    GET_NAMESPACE_FAILURE
} from '../../constants/NamespaceConstants';

export default function GetNamespaceReducer(state = {
    isFetching: false,
    data: {},
    status: '',
    idName: '',
    errorMessage: ''
}, action) {
    switch (action.type) {
    case GET_NAMESPACE_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: {},
            errorMessage: '',
            status: '',
            idName: ''
        });
    case GET_NAMESPACE_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data,
            status: action.status,
            idName: action.idName
        });
    case GET_NAMESPACE_FAILURE:
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
