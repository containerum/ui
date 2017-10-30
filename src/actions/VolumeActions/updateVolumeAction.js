import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    UPDATE_VOLUME_REQUEST,
    UPDATE_VOLUME_SUCCESS,
    UPDATE_VOLUME_FAILURE
} from '../../constants/VolumeConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function updateVolume(idVolume, tariff) {
    return dispatch => {
        dispatch(requestUpdateVolume());
        const token = localStorage.getItem('id_token');
        const browser = localStorage.getItem('id_browser');

        return axios.put(
            WEB_API + '/api/volumes/' + idVolume,
            {
                "tariff_label": tariff
            },
            {
                headers: {
                    'Authorization': token,
                    'X-User-Fingerprint': browser,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=-1, private'
                },
                validateStatus: (status) => status >= 200 && status <= 500
            }
        )
        .then(response => {
            if (response.status === 202) {
                dispatch(receiveUpdateVolume(response.data, response.status, response.config.method, idVolume));
                browserHistory.push('/Volumes');
            } else if (response.status === 401) {
                localStorage.removeItem('id_token');
                browserHistory.push('/Login');
            } else {
                dispatch(failUpdateVolume(response.data.message, response.status, idVolume));
            }
        }).catch(err => {dispatch(failUpdateVolume(err.toString(), 503)); console.log(err)})
    };
}

function requestUpdateVolume() {
    return {
        type: UPDATE_VOLUME_REQUEST,
        isFetching: true
    };
}

function receiveUpdateVolume(data, status, method, idVolume) {
    return {
        type: UPDATE_VOLUME_SUCCESS,
        isFetching: false,
        data,
        status,
        method,
        idVolume
    };
}

function failUpdateVolume(message, status, idVolume) {
    return {
        type: UPDATE_VOLUME_FAILURE,
        isFetching: false,
        message,
        status,
        idVolume
    };
}
