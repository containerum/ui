import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    CREATE_IMAGE_TOKENS_REQUEST,
    CREATE_IMAGE_TOKENS_SUCCESS,
    CREATE_IMAGE_TOKENS_FAILURE
} from '../../constants/TokensConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function createImageTokens() {
    return dispatch => {
        const WebHook = "WebHook";
        dispatch(requestCreateImageTokens());
        let token = '';
        let browser = '';
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            token = localStorage.getItem('id_token');
            browser = localStorage.getItem('id_browser');
        }

        const api = WEB_API + '/api/set_image_tokens';

        return axios.post(
            api,
            {},
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
                if (response.status === 201) {
                    dispatch(receiveCreateImageTokens(response.data, response.status, WebHook));
                } else if (response.status === 401) {
                    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                        localStorage.removeItem('id_token');
                        browserHistory.push('/Login');
                    }
                } else {
                    dispatch(failCreateImageTokens(response.data.message, response.status, WebHook));
                }
            }).catch(err => {dispatch(failCreateImageTokens(err.toString(), 503, WebHook)); console.log(err)});
    };
}

function requestCreateImageTokens() {
    return {
        type: CREATE_IMAGE_TOKENS_REQUEST,
        isFetching: true
    };
}

function receiveCreateImageTokens(data, status, WebHook) {
    return {
        type: CREATE_IMAGE_TOKENS_SUCCESS,
        isFetching: false,
        data,
        status,
        WebHook
    };
}

function failCreateImageTokens(message, status, WebHook) {
    return {
        type: CREATE_IMAGE_TOKENS_FAILURE,
        isFetching: false,
        message,
        status,
        WebHook
    };
}
