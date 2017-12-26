import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    DEPLOYMENT_REQUEST,
    DEPLOYMENT_SUCCESS,
    DEPLOYMENT_FAILURE
} from '../../constants/DeploymentConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function getDeployment(namespaceName, deploymentName) {
    return dispatch => {
        dispatch(requestGetDeployment());
        let token = '';
        let browser = '';
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            token = localStorage.getItem('id_token');
            browser = localStorage.getItem('id_browser');
        }
        const api = WEB_API + '/api/namespaces/' + namespaceName + '/deployments/' + deploymentName;

        return axios.get(
            api,
            {
                headers: {
                    'Authorization': token,
                    'User-Client': browser,
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
                    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                        localStorage.removeItem('id_token');
                        browserHistory.push('/Login');
                    }
                } else if (response.status === 400) {
	                browserHistory.push('/Namespaces');
                } else {
                    dispatch(failGetDeployment(response.data.message));
                }
            }).catch(err => console.log(err));
    };
}

function requestGetDeployment() {
    return {
        type: DEPLOYMENT_REQUEST,
        isFetching: true
    };
}

function receiveGetDeployment(data) {
    return {
        type: DEPLOYMENT_SUCCESS,
        isFetching: false,
        data
    };
}

function failGetDeployment(message) {
    return {
        type: DEPLOYMENT_FAILURE,
        isFetching: false,
        message
    };
}
