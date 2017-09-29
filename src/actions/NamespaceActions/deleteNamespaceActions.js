import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    NAMESPACES_REQUEST,
    NAMESPACES_SUCCESS,
    NAMESPACES_FAILURE
} from '../../constants/NamespacesConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function deleteNamespace(idName) {
    return dispatch => {
        dispatch(requestDeleteNamespace());
        const token = localStorage.getItem('id_token');
        const browser = localStorage.getItem('id_browser');

        return axios.get(
            WEB_API + '/api/namespaces',
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
                dispatch(receiveDeleteNamespace(response.data));
            } else if (response.status === 401) {
                localStorage.removeItem('id_token');
                browserHistory.push('/Login');
            } else {
                dispatch(failDeleteNamespace(response.data.message));
            }
        }).catch(err => console.log(err));
    };
}

function requestDeleteNamespace() {
    return {
        type: NAMESPACES_REQUEST,
        isFetching: true
    };
}

function receiveDeleteNamespace(data) {
    return {
        type: NAMESPACES_SUCCESS,
        isFetching: false,
        data
    };
}

function failDeleteNamespace(message) {
    return {
        type: NAMESPACES_FAILURE,
        isFetching: false,
        message
    };
}
