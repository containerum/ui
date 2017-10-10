import axios from 'axios';
// import { browserHistory } from 'react-router';

import {
    CREATE_VOLUME_REQUEST,
    CREATE_VOLUME_SUCCESS,
    CREATE_VOLUME_FAILURE
} from '../../constants/VolumeConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function createVolume(idVolume, tariff) {
    return dispatch => {
        dispatch(requestCreateVolume());
        const token = localStorage.getItem('id_token');
        const browser = localStorage.getItem('id_browser');

        return axios.post(
            WEB_API + '/api/create_volume',
            {
                idVolume,
                tariff
            },
            {
                headers: {
                    'Authorization': token,
                    'X-User-Fingerprint': browser,
                    'Content-Type': 'application/x-www-form-urlencode',
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=-1, private'
                },
                validateStatus: (status) => status >= 200 && status <= 500
            }
        )
        .then(response => {
            console.log(response);
            // if (response.status === 200 || response.status === 201) {
            //     dispatch(receiveCreateVolume(response.data));
            // } else if (response.status === 401) {
            //     localStorage.removeItem('id_token');
            //     browserHistory.push('/Login');
            // } else {
            //     dispatch(failCreateVolume(response.data.message));
            // }
        }).catch(err => console.log(err));
    };
}

function requestCreateVolume() {
    return {
        type: CREATE_VOLUME_REQUEST,
        isFetching: true
    };
}

function receiveCreateVolume(data) {
    return {
        type: CREATE_VOLUME_SUCCESS,
        isFetching: false,
        data
    };
}

function failCreateVolume(message) {
    return {
        type: CREATE_VOLUME_FAILURE,
        isFetching: false,
        message
    };
}
