import {
    SERVICE_REQUEST,
    SERVICE_SUCCESS,
    SERVICE_FAILURE
} from '../../constants/ServiceConstants';

export default function GetServiceReducer(state = {
    isFetching: false,
    data: {},
    errorMessage: ''
}, action) {
    switch (action.type) {
    case SERVICE_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: {},
            errorMessage: ''
        });
    case SERVICE_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data
        });
    case SERVICE_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message
        });
    default:
        return state;
    }
}
