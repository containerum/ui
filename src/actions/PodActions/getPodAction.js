import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    POD_REQUEST,
    POD_SUCCESS,
    POD_FAILURE
} from '../../constants/PodConstants';

export function getPod(namespaceName, podName) {
    return dispatch => {
        dispatch(requestGetPod());
        const token = localStorage.getItem('id_token');
        const api = 'http://web.api.containerum.io:5000/api/namespaces/' + namespaceName + '/pods/' + podName;

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
                    dispatch(receiveGetPod(response.data));
                } else if (response.status === 401) {
                    localStorage.removeItem('id_token');
                    browserHistory.push('/Login');
                } else {
                    dispatch(failGetPod(response.data.message))
                }
            }).catch(err => console.log(err))
    }
}

function requestGetPod() {
    return {
        type: POD_REQUEST,
        isFetching: true
    }
}

function receiveGetPod(data) {
    return {
        type: POD_SUCCESS,
        isFetching: false,
        data
    }
}

function failGetPod(message) {
    return {
        type: POD_FAILURE,
        isFetching: false,
        message
    }
}
