import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    USERS_REQUEST,
    USERS_SUCCESS,
    USERS_FAILURE
} from '../../constants/UsersConstants';

export function getUsers() {
    return dispatch => {
        dispatch(requestGetUsers());
        const token = localStorage.getItem('id_token');
        const api = 'http://web.api.containerum.io:5000/api/users';

        return axios.get(
            api,
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
                dispatch(receiveGetUsers(response.data));
            } else if (response.status === 401) {
                localStorage.removeItem('id_token');
                browserHistory.push('/Login');
            } else {
                dispatch(failGetUsers(response.data.message))
            }
        }).catch(err => console.log(err))
    }
}

function requestGetUsers() {
    return {
        type: USERS_REQUEST,
        isFetching: true
    }
}

function receiveGetUsers(data) {
    return {
        type: USERS_SUCCESS,
        isFetching: false,
        data
    }
}

function failGetUsers(message) {
    return {
        type: USERS_FAILURE,
        isFetching: false,
        message
    }
}
