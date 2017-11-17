import axios from 'axios';
import { browserHistory } from 'react-router';
import ReactGA from 'react-ga';

import {
    CREATE_NAMESPACE_REQUEST,
    CREATE_NAMESPACE_SUCCESS,
    CREATE_NAMESPACE_FAILURE
} from '../../constants/NamespaceConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function createNamespace(idName, tariff, price) {
    return dispatch => {
        dispatch(requestCreateNamespace());
        let token = '';
        let browser = '';
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            token = localStorage.getItem('id_token');
            browser = localStorage.getItem('id_browser');
        }

        return axios.post(
            WEB_API + '/api/namespaces',
            {
                label: idName,
                tariff_label: tariff
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
            if (response.status === 201) {
                dispatch(receiveCreateNamespace(response.data, response.status, idName));
                ReactGA.event({
                    category: 'UI',
                    action: `UI_create_ns_${price}`
                });
                if (typeof window !== 'undefined') {
                    browserHistory.push('/Namespaces');
                }
            } else if (response.status === 401) {
                if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                    localStorage.removeItem('id_token');
                    browserHistory.push('/Login');
                }
            } else {
                dispatch(failCreateNamespace(response.data.message, response.status, idName));
            }
        }).catch(err => {dispatch(failCreateNamespace(err.toString(), 503, idName)); console.log(err)})
    };
}

function requestCreateNamespace() {
    return {
        type: CREATE_NAMESPACE_REQUEST,
        isFetching: true
    };
}

function receiveCreateNamespace(data, status, idName) {
    return {
        type: CREATE_NAMESPACE_SUCCESS,
        isFetching: false,
        data,
        status,
        idName
    };
}

function failCreateNamespace(message, status, idName) {
    return {
        type: CREATE_NAMESPACE_FAILURE,
        isFetching: false,
        message,
        status,
        idName
    };
}
