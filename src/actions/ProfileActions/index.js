import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    PROFILE_REQUEST,
    PROFILE_SUCCESS,
    PROFILE_FAILURE
} from '../../constants/ProfileConstants';

export function getProfile() {
    return dispatch => {
        dispatch(requestGetProfile());
        const api = 'http://207.154.197.7:5000/api/profile';

        return axios.get(
            api,
            {
                headers: {
                    'Authorization': localStorage.getItem('id_token'),
                    'Content-Type': 'application/x-www-form-urlencode'
                },
                validateStatus: (status) => status >= 200 && status <= 500
            }
        )
        .then(response => {
            if (response.status === 200 || response.status === 201) {
                dispatch(receiveGetProfile(response.data));
            } else if (response.status === 401) {
                localStorage.removeItem('id_token');
                browserHistory.push('/Login');
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
