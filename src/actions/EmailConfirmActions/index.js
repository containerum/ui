import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    EMAIL_CONFIRM_REQUEST,
    EMAIL_CONFIRM_SUCCESS,
    EMAIL_CONFIRM_FAILURE,
    CONFIRM_REQUEST
} from '../../constants/ConfirmEmail';

import {
    WEB_API
} from '../../constants/WebApi';

export function ConfirmEmail(creds) {
    return dispatch => {
        dispatch(requestEmailConfirm());
        return axios.post(
            WEB_API + '/api/password_reset',
            { email: creds.email },
            {
                validateStatus: (status) => status >= 200 && status <= 500
            }
        )
        .then(response => {
            if (response.status === 200) {
                dispatch(receiveEmailConfirm(response.data));
                dispatch(receiveConfirm(creds.email));
                if (typeof window !== 'undefined') {
                    browserHistory.push('/ResetPassword');
                }
            } else if (response.status === 400) {
                dispatch(errorEmailComfirm('Email is not valid'));
            } else {
                dispatch(errorEmailComfirm(response.data.message));
            }
        }).catch(err => console.log(err));
    };
}

function receiveConfirm(emailUser) {
    return {
        type: CONFIRM_REQUEST,
        isFetching: false,
        isConfirmed: true,
        emailUser
    };
}

function requestEmailConfirm() {
    return {
        type: EMAIL_CONFIRM_REQUEST,
        isFetching: true,
        isConfirmed: false
    };
}

function receiveEmailConfirm(data) {
    return {
        type: EMAIL_CONFIRM_SUCCESS,
        isFetching: false,
        isConfirmed: true,
        data
    };
}

function errorEmailComfirm(message) {
    return {
        type: EMAIL_CONFIRM_FAILURE,
        isFetching: false,
        isConfirmed: false,
        message
    };
}
