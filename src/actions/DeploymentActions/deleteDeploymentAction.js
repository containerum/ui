import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    DELETE_DEPLOYMENT_REQUEST,
    DELETE_DEPLOYMENT_SUCCESS,
    DELETE_DEPLOYMENT_FAILURE
} from '../../constants/DeploymentConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function deleteDeployment(namespaceName, deploymentName) {
    return dispatch => {
        dispatch(requestDeleteDeployment());
        const token = localStorage.getItem('id_token');
        const api = WEB_API + '/api/namespaces/' + namespaceName + '/deployments/' + deploymentName;

        return axios.delete(
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
                if (response.status === 202) {
                    dispatch(receiveDeleteDeployment(response.status, deploymentName));
                } else if (response.status === 401) {
                    localStorage.removeItem('id_token');
                    browserHistory.push('/Login');
                } else {
                    dispatch(failDeleteDeployment(response.data.message));
                }
            }).catch(err => {
                console.log(err); dispatch(failDeleteDeployment(err.toString()));
            });
    };
}

function requestDeleteDeployment() {
    return {
        type: DELETE_DEPLOYMENT_REQUEST,
        isFetching: true
    };
}

function receiveDeleteDeployment(status, deploymentName) {
    return {
        type: DELETE_DEPLOYMENT_SUCCESS,
        isFetching: false,
        deploymentName,
        status
    };
}

function failDeleteDeployment(message) {
    return {
        type: DELETE_DEPLOYMENT_FAILURE,
        isFetching: false,
        message
    };
}
