import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from '../../constants/LoginConstants';

export function LOGINUser(creds) {
    return dispatch => {
        dispatch(requestLOGIN(creds));
        return axios.post(
            'http://207.154.197.7:5000/api/login',
            {username: creds.username, password: creds.password},
            {
                validateStatus: (status) =>
                status >= 200 && status <= 500
            }
        )
            .then(response => {
                if (response.status === 200) {
                    dispatch(receiveLOGIN(response));
                    localStorage.setItem('id_token', response.data.token);
                    browserHistory.push('/');
                } else if (response.status === 401) {
                    dispatch(LOGINError('Email or Password is not valid'))
                } else {
                    if(typeof response.data.message === 'string') {
                        dispatch(LOGINError(response.data.message))
                    } else {
                        dispatch(LOGINError(response.data.message.password))
                    }
                }
            }).catch(err => console.log(err))
    }
}

function requestLOGIN(creds) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    }
}

function receiveLOGIN(response) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: response.data.token
    }
}

function LOGINError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}
