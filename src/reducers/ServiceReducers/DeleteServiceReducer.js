import {
    DELETE_SERVICE_REQUEST,
    DELETE_SERVICE_SUCCESS,
    DELETE_SERVICE_FAILURE
} from '../../constants/ServiceConstants';

export default function DeleteServiceReducer(state = {
    isFetching: false,
    status: 0,
    errorMessage: '',
    serviceName: ''
}, action) {
    switch (action.type) {
    case DELETE_SERVICE_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            status: 0,
            errorMessage: '',
            serviceName: ''
        });
    case DELETE_SERVICE_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            serviceName: action.serviceName,
            status: action.status
        });
    case DELETE_SERVICE_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message
        });
    default:
        return state;
    }
}
