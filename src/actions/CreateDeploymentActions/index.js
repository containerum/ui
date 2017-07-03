// import axios from 'axios';

import {
    CREATE_DEPLOYMENT_REQUEST,
    CREATE_DEPLOYMENT_SUCCESS,
    CREATE_DEPLOYMENT_FAILURE
} from '../../constants/CreateDeploymentConstants';

// import {
//     WEB_API
// } from '../../constants/WebApi';

export function getCreateDeployment() {
    return dispatch => {
        dispatch(requestGetCreateDeployment());
        dispatch(receiveGetCreateDeployment());
        dispatch(failGetCreateDeployment());
    };
}

function requestGetCreateDeployment() {
    return {
        type: CREATE_DEPLOYMENT_REQUEST,
        isFetching: true
    };
}

function receiveGetCreateDeployment() {
    return {
        type: CREATE_DEPLOYMENT_SUCCESS,
        isFetching: false
    };
}

function failGetCreateDeployment() {
    return {
        type: CREATE_DEPLOYMENT_FAILURE,
        isFetching: false
    };
}
