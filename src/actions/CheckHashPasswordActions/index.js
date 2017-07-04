import axios from 'axios';

import {
    HASH_PASSWORD_REQUEST,
    HASH_PASSWORD_SUCCESS,
    HASH_PASSWORD_FAILURE
} from '../../constants/CheckHashPasswordConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function checkHashPassword(hashParam) {
    return dispatch => {
        dispatch(requestCheckHashPassword());
        return axios.get(
            WEB_API + '/api/reseted_password_change/' + hashParam,
            {
                validateStatus: (status) => status >= 200 && status <= 500
            }
        )
        .then(response => {
            if (response.status === 200) {
                dispatch(receiveCheckHashPassword(response.status, hashParam));
            } else {
                dispatch(errorCheckHashPassword(response.status, hashParam));
            }
        }).catch(err => console.log(err));
    };
}

function requestCheckHashPassword() {
    return {
        type: HASH_PASSWORD_REQUEST,
        isFetching: true
    };
}

function receiveCheckHashPassword(status, hashParam) {
    return {
        type: HASH_PASSWORD_SUCCESS,
        isFetching: false,
        status,
        hashParam
    };
}

function errorCheckHashPassword(status, hashParam) {
    return {
        type: HASH_PASSWORD_FAILURE,
        isFetching: false,
        status,
        hashParam
    };
}
