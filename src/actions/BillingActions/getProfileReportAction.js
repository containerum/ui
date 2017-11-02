import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    GET_PROFILE_REPORT_REQUEST,
    GET_PROFILE_REPORT_SUCCESS,
    GET_PROFILE_REPORT_FAILURE
} from '../../constants/BillingConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function getProfileReport(page = 1) {
    return dispatch => {
        dispatch(requestGetProfileReport());
        let token = '';
        let browser = '';
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            token = localStorage.getItem('id_token');
            browser = localStorage.getItem('id_browser');
        }

        const api = WEB_API + `/api/profile/report?page=${page}`;

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
            if (response.status === 200) {
                if (!response.data.operations.length) {
                    browserHistory.push('/Billing');
                }
                dispatch(receiveGetProfileReport(response.data));
            } else if (response.status === 401) {
                if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                    localStorage.removeItem('id_token');
                    browserHistory.push('/Login');
                }
            } else {
                dispatch(failGetProfileReport(response.data.message));
            }
        }).catch(err => console.log(err));
    };
}

function requestGetProfileReport() {
    return {
        type: GET_PROFILE_REPORT_REQUEST,
        isFetching: true
    };
}

function receiveGetProfileReport(data) {
    return {
        type: GET_PROFILE_REPORT_SUCCESS,
        isFetching: false,
        data
    };
}

function failGetProfileReport(message) {
    return {
        type: GET_PROFILE_REPORT_FAILURE,
        isFetching: false,
        message
    };
}
