import {
    DELETE_DEPLOYMENT_REQUEST,
    DELETE_DEPLOYMENT_SUCCESS,
    DELETE_DEPLOYMENT_FAILURE
} from '../../constants/DeploymentConstants';

export default function DeleteDeploymentReducer(state = {
    isFetching: false,
    errorMessage: '',
    status: 0,
    deploymentName: ''
}, action) {
    switch (action.type) {
    case DELETE_DEPLOYMENT_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: '',
            status: 0,
            deploymentName: ''
        });
    case DELETE_DEPLOYMENT_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message,
            status: action.status,
            deploymentName: action.deploymentName
        });
    case DELETE_DEPLOYMENT_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message
        });
    default:
        return state;
    }
}
