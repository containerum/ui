import {
    SERVICES_REQUEST,
    SERVICES_SUCCESS,
    SERVICES_FAILURE
} from '../constants/ServicesConstants';

export default function DeploymentsReducerReducer(state = {
    isFetching: false,
    data: [],
    errorMessage: ''
}, action) {
    switch (action.type) {
    case SERVICES_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching
        });
    case SERVICES_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data
        });
    case SERVICES_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message
        });
    default:
        return state
    }
}