import axios from 'axios';
import ReactGA from 'react-ga';

import {
    USER_HASH_CONFIRM_REQUEST,
    USER_HASH_CONFIRM_SUCCESS,
    USER_HASH_CONFIRM_FAILURE
} from '../../constants/UserHashConfirmConstants';

import {
	WEB_API_OTHER
} from '../../constants/WebApi';

export function getUserHashConfirm(userHash) {
    return dispatch => {
        dispatch(requestGetUserHashConfirm());
        const api = WEB_API_OTHER + '/api/confirm/' + userHash;

        return axios.get(
            api,
            {
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencode',
                    'Access-Control-Allow-Origin': '*'
                    // 'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=-1, private'
                },
                validateStatus: (status) => status >= 200 && status <= 500
            }
        )
        .then(response => {
            if (response.status === 200) {
                dispatch(receiveGetUserHashConfirm(response.status));
                ReactGA.event({
                    category: 'UI',
                    action: 'UI_SUp_confirmed'
                });
            }
            else {
                dispatch(failGetUserHashConfirm(response.data.message));
            }
        }).catch(err => console.log(err));
    };
}

function requestGetUserHashConfirm() {
    return {
        type: USER_HASH_CONFIRM_REQUEST,
        isFetching: true
    };
}

function receiveGetUserHashConfirm(data) {
    return {
        type: USER_HASH_CONFIRM_SUCCESS,
        isFetching: false,
        data
    };
}

function failGetUserHashConfirm(message) {
    return {
        type: USER_HASH_CONFIRM_FAILURE,
        isFetching: false,
        message
    };
}
