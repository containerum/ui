import axios from 'axios';
import { browserHistory } from 'react-router';
// import md5 from 'md5';

import {
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILURE
} from '../../constants/ChangePasswordConstaints';

import {
    WEB_API
} from '../../constants/WebApi';

export function changePassword(data) {
    return dispatch => {
        dispatch(requestChangePassword());
        let token = '';
        let browser = '';
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            token = localStorage.getItem('id_token');
            browser = localStorage.getItem('id_browser');
        }
        const password = 'Password';
        const api = WEB_API + '/api/password_change';
        // const password = md5(data.password).toString(16);
        // const new_password = md5(data.new_password).toString(16);

        return axios.post(
            api,
            { password: data.password, new_password: data.new_password },
            {
                headers: {
                    'Authorization': token,
                    'User-Client': browser,
                    'Access-Control-Allow-Origin': '*'
                },
                validateStatus: (status) => status >= 200 && status <= 505
            }
        )
        .then(response => {
            if (response.status === 202) {
                dispatch(receiveChangePassword(response.data, response.status, 'put', password));
                if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                    localStorage.setItem('id_token', response.data.token);
                }
            } else if (response.status === 401) {
                if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                    localStorage.removeItem('id_token');
                    browserHistory.push('/Login');
                }
            } else {
                dispatch(failChangePassword(response.data.message, response.status, password));
            }
        }).catch(err => { dispatch(failChangePassword(err.toString(), 503, password)); console.log(err); });
    };
}

function requestChangePassword() {
    return {
        type: CHANGE_PASSWORD_REQUEST,
        isFetching: true
    };
}

function receiveChangePassword(data, status, method, password) {
    return {
        type: CHANGE_PASSWORD_SUCCESS,
        isFetching: false,
        data,
        status,
        method,
        password
    };
}

function failChangePassword(message, status, password) {
    return {
        type: CHANGE_PASSWORD_FAILURE,
        isFetching: false,
        message,
        status,
        password
    };
}
