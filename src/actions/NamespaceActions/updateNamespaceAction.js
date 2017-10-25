import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    UPDATE_NAMESPACE_REQUEST,
    UPDATE_NAMESPACE_SUCCESS,
    UPDATE_NAMESPACE_FAILURE
} from '../../constants/NamespaceConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function updateNamespace(idName, tariff) {
    return dispatch => {
        dispatch(requestUpdateNamespace());
        const token = localStorage.getItem('id_token');
        const browser = localStorage.getItem('id_browser');

        return axios.put(
            WEB_API + '/api/namespaces/' + idName,
            {
                "tariff_label": tariff
            },
            {
                headers: {
                    'Authorization': token,
                    'X-User-Fingerprint': browser,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=-1, private'
                },
                validateStatus: (status) => status >= 200 && status <= 500
            }
        )
        .then(response => {
            // console.log(response.config.method);
            if (response.status === 202) {
                dispatch(receiveUpdateNamespace(response.data, response.status, response.config.method, idName));
                browserHistory.push('/Namespaces');
            } else if (response.status === 401) {
                localStorage.removeItem('id_token');
                browserHistory.push('/Login');
            } else {
                dispatch(failUpdateNamespace(response.data.message, response.status, idName));
            }
        }).catch(err => {dispatch(failUpdateNamespace(err.toString(), 503)); console.log(err)})
    };
}

function requestUpdateNamespace() {
    return {
        type: UPDATE_NAMESPACE_REQUEST,
        isFetching: true
    };
}

function receiveUpdateNamespace(data, status, method, idName) {
    return {
        type: UPDATE_NAMESPACE_SUCCESS,
        isFetching: false,
        data,
        status,
        method,
        idName
    };
}

function failUpdateNamespace(message, status, idName) {
    return {
        type: UPDATE_NAMESPACE_FAILURE,
        isFetching: false,
        message,
        status,
        idName
    };
}
