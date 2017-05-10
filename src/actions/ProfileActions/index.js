import axios from 'axios';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('id_token');

import {
    PROFILE_REQUEST,
    PROFILE_SUCCESS,
    PROFILE_FAILURE
} from '../../constants/ProfileConstants';

export function getProfile() {
    return dispatch => {
        dispatch(requestGetProfile());
        const api = 'http://139.59.146.89/api/profile';

        return axios.get(
            api,
            {
                validateStatus: (status) => status >= 200 && status <= 500
            }
        )
        .then(response => {
            if (response.status === 200 || response.status === 201) {
                console.log(response);
                dispatch(receiveGetProfile(response.data));
            } else {
                dispatch(failGetProfile(response.data.message))
            }
        }).catch(err => console.log(err))
    }
}

function requestGetProfile() {
    return {
        type: PROFILE_REQUEST,
        isFetching: true
    }
}

function receiveGetProfile(data) {
    return {
        type: PROFILE_SUCCESS,
        isFetching: false,
        data
    }
}

function failGetProfile(message) {
    return {
        type: PROFILE_FAILURE,
        isFetching: false,
        message
    }
}
