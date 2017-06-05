import axios from 'axios';
import { browserHistory } from 'react-router';
import sha256 from 'sha256';

import {
    PODS_REQUEST,
    PODS_SUCCESS,
    PODS_FAILURE
} from '../../constants/PodsConstants';

export function getPods(namespaceName, idDeployment) {
    return dispatch => {
        dispatch(requestGetPods());
        const token = localStorage.getItem('id_token');
        const api = 'http://web.api.containerum.io:5000/api/namespaces/' + namespaceName + '/pods';
        const shaDeployment256 = sha256(namespaceName).substring(0, 32);

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
                const filterDepData = [];
                response.data.map(item => {
                    return Object.keys(item.labels).map(label => {
                        if(label === shaDeployment256 && item.labels[label] === idDeployment) {
                            filterDepData.push(item);
                        }
                        return item;
                    });
                });
                dispatch(receiveGetPods(filterDepData));
            } else if (response.status === 401) {
                localStorage.removeItem('id_token');
                browserHistory.push('/Login');
            } else {
                dispatch(failGetPods(response.data.message))
            }
        }).catch(err => console.log(err))
    }
}

function requestGetPods() {
    return {
        type: PODS_REQUEST,
        isFetching: true
    }
}

function receiveGetPods(data) {
    return {
        type: PODS_SUCCESS,
        isFetching: false,
        data
    }
}

function failGetPods(message) {
    return {
        type: PODS_FAILURE,
        isFetching: false,
        message
    }
}
