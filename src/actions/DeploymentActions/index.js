import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    DEPLOYMENT_REQUEST,
    DEPLOYMENT_SUCCESS,
    DEPLOYMENT_FAILURE
} from '../../constants/DeploymentConstants';

export function getDeployment(namespaceName, deploymentName) {
    return dispatch => {
        dispatch(requestGetDeployment());
        const api = 'http://207.154.197.7:5000/api/namespaces/' + namespaceName + '/deployments/' + deploymentName;

        return axios.get(
            api,
            {
                headers: {
                    'Authorization': localStorage.getItem('id_token'),
                    'Content-Type': 'application/x-www-form-urlencode'
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
