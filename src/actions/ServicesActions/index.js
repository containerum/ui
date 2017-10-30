import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    SERVICES_REQUEST,
    SERVICES_SUCCESS,
    SERVICES_FAILURE
} from '../../constants/ServicesConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function getServices(namespaceName) {
    return dispatch => {
        dispatch(requestGetServices());
        let token = '';
        let browser = '';
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            token = localStorage.getItem('id_token');
            browser = localStorage.getItem('id_browser');
        }

        const api = WEB_API + '/api/namespaces/' + namespaceName + '/services';

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
                dispatch(receiveGetServices(response.data));
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
                dispatch(receiveGetServices([]));
            } else {
                dispatch(failGetServices(response.data.message, response.status));
            }
        }).catch(err => console.log(err));
    };
}

function requestGetServices() {
    return {
        type: SERVICES_REQUEST,
        isFetching: true
    };
}

function receiveGetServices(data) {
    return {
        type: SERVICES_SUCCESS,
        isFetching: false,
        data
    };
}

function failGetServices(message, status) {
    return {
        type: SERVICES_FAILURE,
        isFetching: false,
        message,
        status
    };
}
