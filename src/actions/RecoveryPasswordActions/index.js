import axios from 'axios';

import {
    RECOVERY_PASSWORD_REQUEST,
    RECOVERY_PASSWORD_SUCCESS,
    RECOVERY_PASSWORD_FAILURE
} from '../../constants/RecoveryPasswordConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function recoveryPassword(userHash, password) {
    return dispatch => {
        dispatch(requestEmailConfirm());
        return axios.post(
            WEB_API + '/api/reseted_password_change/' + userHash,
            { password },
            {
                validateStatus: (status) => status >= 200 && status <= 500
            }
        )
        .then(response => {
            if (response.status === 200) {
                dispatch(receiveEmailConfirm(response.status));
            } else {
                dispatch(errorEmailComfirm(response.status));
            }
        }).catch(err => console.log(err));
    };
}

function requestEmailConfirm() {
    return {
        type: RECOVERY_PASSWORD_REQUEST,
        isFetching: true
    };
}

function receiveEmailConfirm(status) {
    return {
        type: RECOVERY_PASSWORD_SUCCESS,
        isFetching: false,
        status
    };
}

function errorEmailComfirm(status) {
    return {
        type: RECOVERY_PASSWORD_FAILURE,
        isFetching: false,
        status
    };
}
