import axios from 'axios';
import { browserHistory } from 'react-router';
import identicons from 'identicons';

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from '../../constants/LoginConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function loginUser(creds) {
    return dispatch => {
        dispatch(requestLOGIN(creds));
        // const password = md5(creds.username + creds.password).toString(16);
        const password = creds.password;
        return axios.post(
            WEB_API + '/api/login',
            { username: creds.username, password },
            {
                validateStatus: (status) => status >= 200 && status <= 505
            }
        )
            .then(response => {
                // console.log(response);
                if (response.status === 200) {
                    dispatch(receiveLOGIN(response));
                    localStorage.setItem('id_token', response.data.token);
                    localStorage.setItem('icon_profile',
                        identicons.generateSVGDataURIString(creds.username, { width: 28, size: 4 }));
                    localStorage.setItem('icon_profile_big',
                        identicons.generateSVGDataURIString(creds.username, { width: 63, size: 4 }));
                    browserHistory.push('/');
                } else if (response.status === 401) {
                    dispatch(LOGINError('Email or Password is not valid'));
                } else {
                    if (typeof response.data.message === 'string') {
                        dispatch(LOGINError(response.data.message));
                    } else {
                        dispatch(LOGINError(response.data.message.password));
                    }
                }
            }).catch(err => console.log(err));
    };
}

function requestLOGIN(creds) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    };
}

function receiveLOGIN(response) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: response.data.token
    };
}

function LOGINError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    };
}
