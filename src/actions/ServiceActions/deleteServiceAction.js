import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    DELETE_SERVICE_REQUEST,
    DELETE_SERVICE_SUCCESS,
    DELETE_SERVICE_FAILURE
} from '../../constants/ServiceConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function deleteService(namespaceName, serviceName) {
    return dispatch => {
        dispatch(requestDeleteService());
        const token = localStorage.getItem('id_token');
        const api = WEB_API + '/api/namespaces/' + namespaceName + '/services/' + serviceName;

        return axios.delete(
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
                dispatch(receiveDeleteService(response.status, serviceName));
            } else if (response.status === 401) {
                localStorage.removeItem('id_token');
                browserHistory.push('/Login');
            } else {
                dispatch(failDeleteService(response.data.message))
            }
        }).catch(err => {console.log(err); dispatch(failDeleteService(err.toString()))})
    }
}

function requestDeleteService() {
    return {
        type: DELETE_SERVICE_REQUEST,
        isFetching: true
    }
}

function receiveDeleteService(status, serviceName) {
    return {
        type: DELETE_SERVICE_SUCCESS,
        isFetching: false,
        serviceName,
        status
    }
}

function failDeleteService(message) {
    return {
        type: DELETE_SERVICE_FAILURE,
        isFetching: false,
        message
    }
}
