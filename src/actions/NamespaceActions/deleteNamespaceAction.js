import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    DELETE_NAMESPACE_REQUEST,
    DELETE_NAMESPACE_SUCCESS,
    DELETE_NAMESPACE_FAILURE
} from '../../constants/NamespaceConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function deleteNamespace(idName) {
    return dispatch => {
        dispatch(requestDeleteNamespace());
        const token = localStorage.getItem('id_token');
        const browser = localStorage.getItem('id_browser');

        return axios.delete(
            WEB_API + '/api/namespaces/' + idName,
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
            if (response.status === 202) {
                dispatch(receiveDeleteNamespace(response.status, idName));
            } else if (response.status === 401) {
                localStorage.removeItem('id_token');
                browserHistory.push('/Login');
            } else {
                dispatch(failDeleteNamespace(response.data.message));
            }
        }).catch(err => {console.log(err); dispatch(failDeleteNamespace(err.toString()))});
    };
}

function requestDeleteNamespace() {
    return {
        type: DELETE_NAMESPACE_REQUEST,
        isFetching: true
    };
}

function receiveDeleteNamespace(status, idName) {
    return {
        type: DELETE_NAMESPACE_SUCCESS,
        isFetching: false,
        status,
        idName
    };
}

function failDeleteNamespace(message) {
    return {
        type: DELETE_NAMESPACE_FAILURE,
        isFetching: false,
        message
    };
}
