import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    GET_PROFILE_BALANCE_REQUEST,
    GET_PROFILE_BALANCE_SUCCESS,
    GET_PROFILE_BALANCE_FAILURE
} from '../../constants/BillingConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function getProfileBalance() {
    return dispatch => {
        dispatch(requestGetProfileBalance());
        let token = '';
        let browser = '';
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            token = localStorage.getItem('id_token');
            browser = localStorage.getItem('id_browser');
        }

        const api = WEB_API + '/api/profile/balance';

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
                dispatch(receiveGetProfileBalance(response.data));
            } else if (response.status === 401) {
                if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                    localStorage.removeItem('id_token');
                    browserHistory.push('/Login');
                }
            } else {
                dispatch(failGetProfileBalance(response.data.message));
            }
        }).catch(err => console.log(err));
    };
}

function requestGetProfileBalance() {
    return {
        type: GET_PROFILE_BALANCE_REQUEST,
        isFetching: true
    };
}

function receiveGetProfileBalance(data) {
    return {
        type: GET_PROFILE_BALANCE_SUCCESS,
        isFetching: false,
        data
    };
}

function failGetProfileBalance(message) {
    return {
        type: GET_PROFILE_BALANCE_FAILURE,
        isFetching: false,
        message
    };
}
