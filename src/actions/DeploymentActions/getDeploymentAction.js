import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    DEPLOYMENT_REQUEST,
    DEPLOYMENT_SUCCESS,
    DEPLOYMENT_FAILURE,
} from '../../constants/DeploymentConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function getDeployment(namespaceName, deploymentName) {
    return dispatch => {
        dispatch(requestGetDeployment());
        const token = localStorage.getItem('id_token');
        const api = WEB_API + '/api/namespaces/' + namespaceName + '/deployments/' + deploymentName;

        return axios.get(
            api,
            {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/x-www-form-urlencode',
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=-1, private'
                },
                validateStatus: (status) => status >= 200 && status <= 500
            }
        )
            .then(response => {
                if (response.status === 200 || response.status === 201) {
                    dispatch(receiveGetDeployment(response.data));
                } else if (response.status === 401) {
                    localStorage.removeItem('id_token');
                    browserHistory.push('/Login');
                } else {
                    dispatch(failGetDeployment(response.data.message))
                }
            }).catch(err => console.log(err))
    }
}

function requestGetDeployment() {
    return {
        type: DEPLOYMENT_REQUEST,
        isFetching: true
    }
}

function receiveGetDeployment(data) {
    return {
        type: DEPLOYMENT_SUCCESS,
        isFetching: false,
        data
    }
}

function failGetDeployment(message) {
    return {
        type: DEPLOYMENT_FAILURE,
        isFetching: false,
        message
    }
}
