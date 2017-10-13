import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    PROFILE_DELETE_REQUEST,
    PROFILE_DELETE_SUCCESS,
    PROFILE_DELETE_FAILURE
} from '../../constants/ProfileConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function deleteProfile() {
    return dispatch => {
        dispatch(requestDeleteProfile());
        const token = localStorage.getItem('id_token');
        const browser = localStorage.getItem('id_browser');

        const api = WEB_API + '/api/profile';

        return axios.delete(
            api,
            {
                headers: {
                    'Authorization': token,
                    'X-User-Fingerprint': browser,
                    'Access-Control-Allow-Origin': '*'
                },
                validateStatus: (status) => status >= 200 && status <= 500
            }
        )
        .then(response => {
            if (response.status === 200) {
                dispatch(receiveDeleteProfile(response.data));
                localStorage.removeItem('id_token');
                setTimeout(() => {
                    window.location.replace('https://containerum.com/');
                }, 200);
            } else if (response.status === 401) {
                localStorage.removeItem('id_token');
                browserHistory.push('/Login');
            } else {
                dispatch(failDeleteProfile(response.data.message));
            }
        }).catch(err => console.log(err));
    };
}

function requestDeleteProfile() {
    return {
        type: PROFILE_DELETE_REQUEST,
        isFetching: true
    };
}

function receiveDeleteProfile(data) {
    return {
        type: PROFILE_DELETE_SUCCESS,
        isFetching: false,
        data
    };
}

function failDeleteProfile(message) {
    return {
        type: PROFILE_DELETE_FAILURE,
        isFetching: false,
        message
    };
}