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

export function getNamespaces() {
    return dispatch => {
        dispatch(requestGetNamespaces());
        let token = '';
        let browser = '';
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            token = localStorage.getItem('id_token');
            browser = localStorage.getItem('id_browser');
        }

        return axios.get(
            WEB_API + '/api/namespaces',
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
                dispatch(receiveGetNamespaces(response.data));
            } else if (response.status === 401) {
                if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                    localStorage.removeItem('id_token');
                    browserHistory.push('/Login');
                }
            } else if (response.status === 404) {
                dispatch(receiveGetNamespaces([]));
            } else {
                dispatch(failGetNamespaces(response.data.message));
            }
        }).catch(err => console.log(err));
    };
}

function requestGetNamespaces() {
    return {
        type: NAMESPACES_REQUEST,
        isFetching: true
    };
}

function receiveGetNamespaces(data) {
    return {
        type: NAMESPACES_SUCCESS,
        isFetching: false,
        data
    };
}

function failGetNamespaces(message) {
    return {
        type: NAMESPACES_FAILURE,
        isFetching: false,
        message
    };
}
