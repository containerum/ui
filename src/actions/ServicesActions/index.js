import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    SERVICES_REQUEST,
    SERVICES_SUCCESS,
    SERVICES_FAILURE
} from '../../constants/ServicesConstants';

export function getServices(namespaceName) {
    return dispatch => {
        dispatch(requestGetServices());
        const token = localStorage.getItem('id_token');
        const api = 'http://web.api.containerum.io:5000/api/namespaces/' + namespaceName + '/services';

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
                dispatch(receiveGetServices(response.data));
            } else if (response.status === 401) {
                localStorage.removeItem('id_token');
                browserHistory.push('/Login');
            } else {
                dispatch(failGetServices(response.data.message))
            }
        }).catch(err => console.log(err))
    }
}

function requestGetServices() {
    return {
        type: SERVICES_REQUEST,
        isFetching: true
    }
}

function receiveGetServices(data) {
    return {
        type: SERVICES_SUCCESS,
        isFetching: false,
        data
    }
}

function failGetServices(message) {
    return {
        type: SERVICES_FAILURE,
        isFetching: false,
        message
    }
}
