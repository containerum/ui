import axios from 'axios';

import {
    CREATE_SERVICE_REQUEST,
    CREATE_SERVICE_SUCCESS,
    CREATE_SERVICE_FAILURE
} from '../../constants/CreateServiceConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function getCreateService(idName, data) {
    return dispatch => {
        dispatch(requestGetCreateService());
        let token = '';
        let browser = '';
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            token = localStorage.getItem('id_token');
            browser = localStorage.getItem('id_browser');
        }
        return axios.post(
            WEB_API + '/api/namespaces/' + idName + '/services',
            { ports: data },
            {
                headers: {
                    'Authorization': token,
                    'X-User-Fingerprint': browser,
                    'Access-Control-Allow-Origin': '*'
                },
                validateStatus: (status) => status >= 200 && status <= 505
            }
        )
        .then(response => {
            if (response.status === 200) {
                console.log(response);
                dispatch(receiveGetCreateService(response.data));
            } else {
                console.log(response);
                dispatch(failGetCreateService(response.data.message));
            }
        }).catch(err => console.log(err));
    };
}

function requestGetCreateService() {
    return {
        type: CREATE_SERVICE_REQUEST,
        isFetching: true
    };
}

function receiveGetCreateService(data) {
    return {
        type: CREATE_SERVICE_SUCCESS,
        isFetching: false,
        data
    };
}

function failGetCreateService(message) {
    return {
        type: CREATE_SERVICE_FAILURE,
        isFetching: false,
        message
    };
}
