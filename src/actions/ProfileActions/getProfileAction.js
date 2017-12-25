import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    PROFILE_GET_REQUEST,
    PROFILE_GET_SUCCESS,
    PROFILE_GET_FAILURE
} from '../../constants/ProfileConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function getProfile() {
    return dispatch => {
        dispatch(requestGetProfile());
        let token = '';
        let browser = '';
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            token = localStorage.getItem('id_token');
            browser = localStorage.getItem('id_browser');
        }

        const api = WEB_API + '/api/profile';

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
            if (response.status === 200 || response.status === 201) {
                dispatch(receiveGetProfile(response.data));
            } else if (response.status === 401) {
                if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                    localStorage.removeItem('id_token');
                    browserHistory.push('/Login');
                }
            } else {
                dispatch(failGetProfile(response.data.message));
            }
        }).catch(err => console.log(err));
    };
}

function requestGetProfile() {
    return {
        type: PROFILE_GET_REQUEST,
        isFetching: true
    };
}

function receiveGetProfile(data) {
    return {
        type: PROFILE_GET_SUCCESS,
        isFetching: false,
        data
    };
}

function failGetProfile(message) {
    return {
        type: PROFILE_GET_FAILURE,
        isFetching: false,
        message
    };
}
