import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    SERVICE_REQUEST,
    SERVICE_SUCCESS,
    SERVICE_FAILURE
} from '../../constants/ServiceConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function getService(namespaceName, serviceName) {
    return dispatch => {
        dispatch(requestGetService());
        const token = localStorage.getItem('id_token');
        const api = WEB_API + '/api/namespaces/' + namespaceName + '/services/' + serviceName;

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
                dispatch(receiveGetService(response.data));
            } else if (response.status === 401) {
                localStorage.removeItem('id_token');
                browserHistory.push('/Login');
            } else {
                dispatch(failGetService(response.data.message));
            }
        }).catch(err => console.log(err));
    };
}

function requestGetService() {
    return {
        type: SERVICE_REQUEST,
        isFetching: true
    };
}

function receiveGetService(data) {
    return {
        type: SERVICE_SUCCESS,
        isFetching: false,
        data
    };
}

function failGetService(message) {
    return {
        type: SERVICE_FAILURE,
        isFetching: false,
        message
    };
}
