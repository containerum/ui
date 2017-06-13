import axios from 'axios';
// import { browserHistory } from 'react-router';

import {
    USER_HASH_CONFIRM_REQUEST,
    USER_HASH_CONFIRM_SUCCESS,
    USER_HASH_CONFIRM_FAILURE
} from '../../constants/UserHashConfirmConstants';

export function getUserHashConfirm(userHash) {
    return dispatch => {
        dispatch(requestGetUserHashConfirm());
        const api = 'http://web.api.containerum.io/api/confirm/' + userHash;
        console.log(api);

        return axios.get(
            api,
            {
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencode',
                    'Access-Control-Allow-Origin': '*',
                    // 'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=-1, private'
                },
                validateStatus: (status) => status >= 200 && status <= 500
            }
        )
        .then(response => {
            if (response.status === 200 || response.status === 201) {
                console.log(response);
                dispatch(receiveGetUserHashConfirm(response.data));
            }
            // else if (response.status === 401) {
            //     localStorage.removeItem('id_token');
            //     browserHistory.push('/Login');
            // }
            else {
                console.log(response);
                dispatch(failGetUserHashConfirm(response.data.message))
            }
        }).catch(err => console.log(err))
    }
}

function requestGetUserHashConfirm() {
    return {
        type: USER_HASH_CONFIRM_REQUEST,
        isFetching: true
    }
}

function receiveGetUserHashConfirm(data) {
    return {
        type: USER_HASH_CONFIRM_SUCCESS,
        isFetching: false,
        data
    }
}

function failGetUserHashConfirm(message) {
    return {
        type: USER_HASH_CONFIRM_FAILURE,
        isFetching: false,
        message
    }
}
