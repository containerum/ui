import {
    DEPLOYMENT_REQUEST,
    DEPLOYMENT_SUCCESS,
    DEPLOYMENT_FAILURE
} from '../constants/DeploymentConstants';

export default function DeploymentReducer(state = {
    isFetching: false,
    data: {},
    errorMessage: ''
}, action) {
    switch (action.type) {
    case DEPLOYMENT_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: ''
        });
    case DEPLOYMENT_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data
        });
    case DEPLOYMENT_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message
        });
    default:
        return state
    }
}