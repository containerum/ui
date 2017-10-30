import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    VOLUMES_REQUEST,
    VOLUMES_SUCCESS,
    VOLUMES_FAILURE
} from '../../constants/VolumesConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function getVolumes() {
    return dispatch => {
        dispatch(requestGetVolumes());
        let token = '';
        let browser = '';
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            token = localStorage.getItem('id_token');
            browser = localStorage.getItem('id_browser');
        }

        return axios.get(
            WEB_API + '/api/volumes',
            {
                headers: {
                    'Authorization': token,
                    'X-User-Fingerprint': browser,
                    'Content-Type': 'application/x-www-form-urlencode',
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=-1, private'
                },
                validateStatus: (status) => status >= 200 && status <= 505
            }
        )
        .then(response => {
            if (response.status === 200 || response.status === 201) {
                dispatch(receiveGetVolumes(response.data));
            } else if (response.status === 401) {
                if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                    localStorage.removeItem('id_token');
                    browserHistory.push('/Login');
                }
            } else if (response.status === 404) {
                dispatch(receiveGetVolumes([]));
            } else if (response.status === 503) {
                dispatch(receiveGetVolumes([]));
            } else {
                dispatch(failGetVolumes(response.data.message));
            }
        }).catch(err => console.log(err));
    };
}

function requestGetVolumes() {
    return {
        type: VOLUMES_REQUEST,
        isFetching: true
    };
}

function receiveGetVolumes(data) {
    return {
        type: VOLUMES_SUCCESS,
        isFetching: false,
        data
    };
}

function failGetVolumes(message) {
    return {
        type: VOLUMES_FAILURE,
        isFetching: false,
        message
    };
}
