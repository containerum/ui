import {
    CREATE_DEPLOYMENT_REQUEST,
    CREATE_DEPLOYMENT_SUCCESS,
    CREATE_DEPLOYMENT_FAILURE
} from '../constants/CreateDeploymentConstants';

export default function CreateDeploymentReducer(state = {
    isFetching: false
}, action) {
    switch (action.type) {
    case CREATE_DEPLOYMENT_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching
        });
    case CREATE_DEPLOYMENT_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching
        });
    case CREATE_DEPLOYMENT_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching
        });
    default:
        return state;
    }
}
