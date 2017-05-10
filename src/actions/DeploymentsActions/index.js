import axios from 'axios';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('id_token');

import {
    DEPLOYMENTS_REQUEST,
    DEPLOYMENTS_SUCCESS,
    DEPLOYMENTS_FAILURE
} from '../../constants/DeploymentsConstants';

export function getDeployments(namespaceName) {
    return dispatch => {
        dispatch(requestGetDeployments());
        const api = 'http://139.59.146.89/api/namespaces/' + namespaceName + '/deployments';

        return axios.get(
            api,
            {
                validateStatus: (status) => status >= 200 && status <= 500
            }
        )
        .then(response => {
            if (response.status === 200 || response.status === 201) {
                console.log(response);
                dispatch(receiveGetDeployments(response.data));
            } else {
                dispatch(failGetDeployments(response.data.message))
            }
        }).catch(err => console.log(err))
    }
}

function requestGetDeployments() {
    return {
        type: DEPLOYMENTS_REQUEST,
        isFetching: true
    }
}

function receiveGetDeployments(data) {
    return {
        type: DEPLOYMENTS_SUCCESS,
        isFetching: false,
        data
    }
}

function failGetDeployments(message) {
    return {
        type: DEPLOYMENTS_FAILURE,
        isFetching: false,
        message
    }
}
