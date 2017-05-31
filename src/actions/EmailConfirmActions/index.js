import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    EMAIL_CONFIRM_REQUEST,
    EMAIL_CONFIRM_SUCCESS,
    EMAIL_CONFIRM_FAILURE
} from '../../constants/ConfirmEmail';

export function ConfirmEmail(creds) {
    return dispatch => {
        dispatch(requestEmailConfirm(creds));
        return axios.post(
            'http://207.154.197.7:5000/api/password_reset',
            {email: creds.email},
            {validateStatus: (status) =>
                status >= 200 && status <= 500
            }
        )
        .then(response => {
            if (response.status === 200) {
                dispatch(receiveEmailComfirm());
                browserHistory.push('/ConfirmEmail');
            } else if (response.status === 400) {
                dispatch(errorEmailComfirm('Email is not valid'))
            } else {
                dispatch(errorEmailComfirm(response.data.message))
            }
        }).catch(err => console.log(err))
    }
}

function requestEmailConfirm(creds) {
    return {
        type: EMAIL_CONFIRM_REQUEST,
        isFetching: true,
        isConfirmed: false,
        creds
    }
}

function receiveEmailComfirm() {
    return {
        type: EMAIL_CONFIRM_SUCCESS,
        isFetching: false,
        isConfirmed: true
    }
}

function errorEmailComfirm(message) {
    return {
        type: EMAIL_CONFIRM_FAILURE,
        isFetching: false,
        isConfirmed: false,
        message
    }
}
