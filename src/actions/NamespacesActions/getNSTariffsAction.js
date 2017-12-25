import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    NSTARIFFS_REQUEST,
    NSTARIFFS_SUCCESS,
    NSTARIFFS_FAILURE
} from '../../constants/NamespacesConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function getNSTariffs() {
    return dispatch => {
        dispatch(requestGetNSTariffs());
        let token = '';
        let browser = '';
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            token = localStorage.getItem('id_token');
            browser = localStorage.getItem('id_browser');
        }

        return axios.get(
            WEB_API + '/api/namespace_tariffs',
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
                response.data.sort(function(a, b) {
                    return parseFloat(a.price) - parseFloat(b.price);
                });
                dispatch(receiveGetNSTariffs(response.data));
            } else if (response.status === 401) {
                if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                    localStorage.removeItem('id_token');
                    browserHistory.push('/Login');
                }
            } else if (response.status === 404) {
                dispatch(receiveGetNSTariffs([]));
            } else {
                dispatch(failGetNSTariffs(response.data.message));
            }
        }).catch(err => console.log(err));
    };
}

function requestGetNSTariffs() {
    return {
        type: NSTARIFFS_REQUEST,
        isFetching: true
    };
}

function receiveGetNSTariffs(data) {
    return {
        type: NSTARIFFS_SUCCESS,
        isFetching: false,
        data
    };
}

function failGetNSTariffs(message) {
    return {
        type: NSTARIFFS_FAILURE,
        isFetching: false,
        message
    };
}
