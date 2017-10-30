import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    DELETE_POD_REQUEST,
    DELETE_POD_SUCCESS,
    DELETE_POD_FAILURE
} from '../../constants/PodConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function deletePod(namespaceName, podName) {
    return dispatch => {
        dispatch(requestDeletePod());
        let token = '';
        let browser = '';
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            token = localStorage.getItem('id_token');
            browser = localStorage.getItem('id_browser');
        }

        const api = WEB_API + '/api/namespaces/' + namespaceName + '/pods/' + podName;

        return axios.delete(
            api,
            {
                headers: {
                    'Authorization': token,
                    'X-User-Fingerprint': browser,
                    'Content-Type': 'application/x-www-form-urlencode',
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=-1, private'
                },
                validateStatus: (status) => status >= 200 && status <= 505
            }
        )
            .then(response => {
                if (response.status === 202) {
                    dispatch(receiveDeletePod(response.status, podName));
                } else if (response.status === 401) {
                    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                        localStorage.removeItem('id_token');
                        browserHistory.push('/Login');
                    }
                } else {
                    dispatch(failDeletePod(response.data.message));
                }
            }).catch(err => {
                console.log(err); dispatch(failDeletePod(err.toString()));
            });
    };
}

function requestDeletePod() {
    return {
        type: DELETE_POD_REQUEST,
        isFetching: true
    };
}

function receiveDeletePod(status, podName) {
    return {
        type: DELETE_POD_SUCCESS,
        isFetching: false,
        podName,
        status
    };
}

function failDeletePod(message) {
    return {
        type: DELETE_POD_FAILURE,
        isFetching: false,
        message
    };
}
