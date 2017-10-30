import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    GET_IMAGE_TOKENS_REQUEST,
    GET_IMAGE_TOKENS_SUCCESS,
    GET_IMAGE_TOKENS_FAILURE
} from '../../constants/TokensConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function getImageTokens() {
    return dispatch => {
        dispatch(requestGetImageTokens());
        let token = '';
        let browser = '';
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            token = localStorage.getItem('id_token');
            browser = localStorage.getItem('id_browser');
        }

        const api = WEB_API + '/api/set_image_tokens';

        return axios.get(
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
                if (response.status === 200) {
                    dispatch(receiveGetImageTokens(response.data));
                } else if (response.status === 401) {
                    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                        localStorage.removeItem('id_token');
                        browserHistory.push('/Login');
                    }
                } else if (response.status === 404) {
                    dispatch(receiveGetImageTokens({}));
                } else {
                    dispatch(failGetImageTokens(response.data.message));
                }
            }).catch(err => console.log(err));
    };
}

function requestGetImageTokens() {
    return {
        type: GET_IMAGE_TOKENS_REQUEST,
        isFetching: true
    };
}

function receiveGetImageTokens(data) {
    return {
        type: GET_IMAGE_TOKENS_SUCCESS,
        isFetching: false,
        data
    };
}

function failGetImageTokens(message) {
    return {
        type: GET_IMAGE_TOKENS_FAILURE,
        isFetching: false,
        message
    };
}
