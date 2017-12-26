import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    GET_NAMESPACE_REQUEST,
    GET_NAMESPACE_SUCCESS,
    GET_NAMESPACE_FAILURE
} from '../../constants/NamespaceConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function getNamespace(idName) {
    return dispatch => {
        dispatch(requestGetNamespace());
        let token = '';
        let browser = '';
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            token = localStorage.getItem('id_token');
            browser = localStorage.getItem('id_browser');
        }

        return axios.get(
            WEB_API + '/api/namespaces/' + idName,
            {
                headers: {
                    'Authorization': token,
                    'User-Client': browser,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=-1, private'
                },
                validateStatus: (status) => status >= 200 && status <= 500
            }
        )
        .then(response => {
            if (response.status === 200) {
                dispatch(receiveGetNamespace(response.data, response.status, idName));
            } else if (response.status === 401) {
                if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                    localStorage.removeItem('id_token');
                    browserHistory.push('/Login');
                }
            } else if (response.status === 400) {
                if (typeof window !== 'undefined') {
                    browserHistory.push('/Namespaces');
                }
            } else {
                dispatch(failGetNamespace(response.data.message, response.status, idName));
            }
        }).catch(err => {dispatch(failGetNamespace(err.toString(), 503)); console.log(err)})
    };
}

function requestGetNamespace() {
    return {
        type: GET_NAMESPACE_REQUEST,
        isFetching: true
    };
}

function receiveGetNamespace(data, status, idName) {
    return {
        type: GET_NAMESPACE_SUCCESS,
        isFetching: false,
        data,
        status,
        idName
    };
}

function failGetNamespace(message, status, idName) {
    return {
        type: GET_NAMESPACE_FAILURE,
        isFetching: false,
        message,
        status,
        idName
    };
}
