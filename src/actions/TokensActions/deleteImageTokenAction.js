import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    DELETE_IMAGE_TOKENS_REQUEST,
    DELETE_IMAGE_TOKENS_SUCCESS,
    DELETE_IMAGE_TOKENS_FAILURE
} from '../../constants/TokensConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function deleteImageToken() {
    return dispatch => {
        const WebHook = "WebHook";
        dispatch(requestDeleteImageTokens());
        let token = '';
        let browser = '';
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            token = localStorage.getItem('id_token');
            browser = localStorage.getItem('id_browser');
        }

        const api = WEB_API + '/api/set_image_tokens';

        return axios.delete(
            api,
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
                if (response.status === 202) {
                    dispatch(receiveDeleteImageTokens(response.status, WebHook));
                } else if (response.status === 401) {
                    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                        localStorage.removeItem('id_token');
                        browserHistory.push('/Login');
                    }
                } else {
                    dispatch(failDeleteImageTokens(response.data.message, response.status));
                }
            }).catch(err => {console.log(err); dispatch(failDeleteImageTokens(err.toString(), 503))});
    };
}

function requestDeleteImageTokens() {
    return {
        type: DELETE_IMAGE_TOKENS_REQUEST,
        isFetching: true
    };
}

function receiveDeleteImageTokens(status, WebHook) {
    return {
        type: DELETE_IMAGE_TOKENS_SUCCESS,
        isFetching: false,
        status,
        WebHook
    };
}

function failDeleteImageTokens(message) {
    return {
        type: DELETE_IMAGE_TOKENS_FAILURE,
        isFetching: false,
        message
    };
}
