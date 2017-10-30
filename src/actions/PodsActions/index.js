import axios from 'axios';
import { browserHistory } from 'react-router';
import sha256 from 'sha256';

import {
    PODS_REQUEST,
    PODS_SUCCESS,
    PODS_FAILURE
} from '../../constants/PodsConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function getPods(namespaceName, idDeployment) {
    return dispatch => {
        dispatch(requestGetPods());
        let token = '';
        let browser = '';
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            token = localStorage.getItem('id_token');
            browser = localStorage.getItem('id_browser');
        }

        const api = WEB_API + '/api/namespaces/' + namespaceName + '/pods';
        // const shaDeployment256 = sha256(namespaceName).substring(0, 32);

        return axios.get(
            api,
            {
                headers: {
                    'Authorization': token,
                    'X-User-Fingerprint': browser,
                    'Content-Type': 'application/x-www-form-urlencode',
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=-1, private'
                },
                validateStatus: (status) => status >= 200 && status <= 500
            }
        )
        .then(response => {
            if (response.status === 200 || response.status === 201) {
                const filterDepData = [];
                response.data.map(item => {
                    if (item.deployment === idDeployment) {
                        filterDepData.push(item);
                    }
                });
                dispatch(receiveGetPods(filterDepData));
            } else if (response.status === 401) {
                if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                    localStorage.removeItem('id_token');
                    browserHistory.push('/Login');
                }
            } else if (response.status === 400) {
                if (typeof window !== 'undefined') {
                    browserHistory.push('/Namespaces');
                }
            } else if (response.status === 404) {
                dispatch(receiveGetPods([]));
            } else {
                dispatch(failGetPods(response.data.message));
            }
        }).catch(err => console.log(err));
    };
}

function requestGetPods() {
    return {
        type: PODS_REQUEST,
        isFetching: true
    };
}

function receiveGetPods(data) {
    return {
        type: PODS_SUCCESS,
        isFetching: false,
        data
    };
}

function failGetPods(message) {
    return {
        type: PODS_FAILURE,
        isFetching: false,
        message
    };
}
