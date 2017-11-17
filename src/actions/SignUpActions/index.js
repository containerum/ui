import axios from 'axios';
import { browserHistory } from 'react-router';
// import md5 from 'md5';
import ReactGA from 'react-ga';

import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE
} from '../../constants/SignUpConstants';

import {
    VALIDATE_EMAIL
} from '../../constants/ValudateEmailConstaints';

import {
    WEB_API
} from '../../constants/WebApi';

export function SignUpUser(creds) {
    return dispatch => {
        dispatch(requestSignUp(creds));
        // const password = md5(creds.username + creds.password).toString(16);
        const username = creds.username;
        const password = creds.password;
        const country_code = creds.country_code;
        const recaptcha = creds.recaptcha;

        return axios.post(
            WEB_API + '/api/users',
            creds.with_trial ? {
                username,
                password,
                country_code,
                recaptcha,
                with_trial: creds.with_trial
            } : {
                username,
                password,
                country_code,
                recaptcha,
            },
            {
                validateStatus: (status) => status >= 200 && status <= 505
            }
        )
            .then(response => {
                if (response.status === 200 || response.status === 201) {
                    dispatch(receiveSignUp());
                    dispatch(confirmEmail(creds.username));
                    ReactGA.event({
                        category: 'UI',
                        action: 'UI_SUp_request'
                    });
                    if (typeof window !== 'undefined') {
                        browserHistory.push('/ConfirmEmail');
                    }
                } else {
                    dispatch(SignUpError(response.data.message));
                }
            }).catch(err => console.log(err));
    };
}

export function confirmEmail(emailUser) {
    return {
        type: VALIDATE_EMAIL,
        isValidEmail: true,
        emailUser
    };
}

function requestSignUp(creds) {
    return {
        type: SIGNUP_REQUEST,
        isFetching: true,
        creds
    };
}

function receiveSignUp() {
    return {
        type: SIGNUP_SUCCESS,
        isFetching: false
    };
}

function SignUpError(message) {
    return {
        type: SIGNUP_FAILURE,
        isFetching: false,
        message
    };
}

