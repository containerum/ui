import axios from 'axios';

import {
    EMAIL_UPDATE_REQUEST,
    EMAIL_UPDATE_SUCCESS,
    EMAIL_UPDATE_FAILURE
} from '../../constants/UpdateEmailConstains';

import {
    WEB_API
} from '../../constants/WebApi';

export function updateEmail(data) {
    return dispatch => {
        dispatch(requestEmailUpdate());
        return axios.post(
            WEB_API + '/api/email_update',
            { new_email: data.new_email },
            {
                validateStatus: (status) =>
                status >= 200 && status <= 505
            }
        )
        .then(response => {
            if (response.status === 200) {
                console.log(response);
                dispatch(receiveEmailUpdate());
            } else {
                dispatch(errorEmailUpdate(response.data.message))
            }
        }).catch(err => console.log(err))
    }
}

function requestEmailUpdate() {
    return {
        type: EMAIL_UPDATE_REQUEST,
        isFetching: true
    }
}

function receiveEmailUpdate(data) {
    return {
        type: EMAIL_UPDATE_SUCCESS,
        isFetching: false,
        data
    }
}

function errorEmailUpdate(message) {
    return {
        type: EMAIL_UPDATE_FAILURE,
        isFetching: false,
        message
    }
}
