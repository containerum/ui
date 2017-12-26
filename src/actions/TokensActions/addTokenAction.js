import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    TOKEN_REQUEST,
    TOKEN_SUCCESS,
    TOKEN_FAILURE
} from '../../constants/TokensConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function addToken(addingToken) {
    return dispatch => {
        dispatch(requestAddToken());
        let token = '';
        let browser = '';
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            token = localStorage.getItem('id_token');
            browser = localStorage.getItem('id_browser');
        }

        const api = WEB_API + '/api/tokens/' + addingToken;

        return axios.put(
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
                    dispatch(receiveAddToken(response.data));
                } else if (response.status === 401) {
                    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                        localStorage.removeItem('id_token');
                        browserHistory.push('/Login');
                    }
                } else {
                    dispatch(failAddToken(response.data.message));
                }
            }).catch(err => console.log(err));
    };
}

function requestAddToken() {
    return {
        type: TOKEN_REQUEST,
        isFetching: true
    };
}

function receiveAddToken(data) {
    return {
        type: TOKEN_SUCCESS,
        isFetching: false,
        data
    };
}

function failAddToken(message) {
    return {
        type: TOKEN_FAILURE,
        isFetching: false,
        message
    };
}
