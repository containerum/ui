import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILURE
} from '../../constants/ChangePasswordConstaints';

export function changePassword(data) {
    return dispatch => {
        dispatch(requestChangePassword());
        const token = localStorage.getItem('id_token');
        const api = 'http://web.api.containerum.io:5000/api/password_change';

        return axios.post(
            api,
            { data },
            {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/x-www-form-urlencode',
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=-1, private'
                },
                validateStatus: (status) => status >= 200 && status <= 500
            }
        )
        .then(response => {
            if (response.status === 200 || response.status === 201) {
                // console.log(response);
                dispatch(receiveChangePassword(response.data));
            } else if (response.status === 401) {
                localStorage.removeItem('id_token');
                browserHistory.push('/Login');
            } else {
                dispatch(failChangePassword(response.data.message))
            }
        }).catch(err => console.log(err))
    }
}

function requestChangePassword() {
    return {
        type: CHANGE_PASSWORD_REQUEST,
        isFetching: true
    }
}

function receiveChangePassword(data) {
    return {
        type: CHANGE_PASSWORD_SUCCESS,
        isFetching: false,
        data
    }
}

function failChangePassword(message) {
    return {
        type: CHANGE_PASSWORD_FAILURE,
        isFetching: false,
        message
    }
}
