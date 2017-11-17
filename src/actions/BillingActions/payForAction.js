import axios from 'axios';
import { browserHistory } from 'react-router';
import ReactGA from 'react-ga';

import {
    PAY_FOR_REQUEST,
    PAY_FOR_SUCCESS,
    PAY_FOR_FAILURE
} from '../../constants/BillingConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function payFor(amount) {
    return dispatch => {
        dispatch(requestPayFor());
        let token = '';
        let browser = '';
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            token = localStorage.getItem('id_token');
            browser = localStorage.getItem('id_browser');
        }

        const api = WEB_API + '/api/pay_for';
        return axios.post(
            api,
            { amount },
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
            if (response.status === 200) {
                // console.log(response.data);
                ReactGA.event({
                    category: 'UI',
                    action: 'UI_billing_button'
                });
                dispatch(receivePayFor(response.data));
                if (typeof window !== 'undefined') {
                    window.location.replace(response.data);
                }
            } else if (response.status === 401) {
                if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                    localStorage.removeItem('id_token');
                    browserHistory.push('/Login');
                }
            } else {
                dispatch(failPayFor(response.data.message, response.status));
            }
        }).catch(err => {dispatch(failPayFor(err.toString())); console.log(err)});
    };
}

function requestPayFor() {
    return {
        type: PAY_FOR_REQUEST,
        isFetching: true
    };
}

function receivePayFor(data) {
    return {
        type: PAY_FOR_SUCCESS,
        isFetching: false,
        data
    };
}

function failPayFor(message, status) {
    return {
        type: PAY_FOR_FAILURE,
        isFetching: false,
        message,
        status
    };
}
