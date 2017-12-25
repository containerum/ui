import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    TOKENS_REQUEST,
    TOKENS_SUCCESS,
    TOKENS_FAILURE
} from '../../constants/TokensConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function getTokens() {
    return dispatch => {
        dispatch(requestGetToken());
        let token = '';
        let browser = '';
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            token = localStorage.getItem('id_token');
            browser = localStorage.getItem('id_browser');
        }

        const api = WEB_API + '/api/tokens';

        return axios.get(
            api,
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
                if (response.status === 200) {
                    dispatch(receiveGetToken(response.data));
                } else if (response.status === 401) {
                    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                        localStorage.removeItem('id_token');
                        browserHistory.push('/Login');
                    }
                } else {
                    dispatch(failGetToken(response.data.message));
                }
            }).catch(err => console.log(err));
    };
}

function requestGetToken() {
    return {
        type: TOKENS_REQUEST,
        isFetching: true
    };
}

function receiveGetToken(data) {
    return {
        type: TOKENS_SUCCESS,
        isFetching: false,
        data
    };
}

function failGetToken(message) {
    return {
        type: TOKENS_FAILURE,
        isFetching: false,
        message
    };
}
