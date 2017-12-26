import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    GET_VOLUME_REQUEST,
    GET_VOLUME_SUCCESS,
    GET_VOLUME_FAILURE
} from '../../constants/VolumeConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function getVolume(idVolume) {
    return dispatch => {
        dispatch(requestGetVolume());
        const token = localStorage.getItem('id_token');
        const browser = localStorage.getItem('id_browser');

        return axios.get(
            WEB_API + '/api/volumes/' + idVolume,
            {
                headers: {
                    'Authorization': token,
                    'User-Client': browser,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=-1, private'
                },
                validateStatus: (status) => status >= 200 && status <= 500
            }
        )
        .then(response => {
            if (response.status === 200) {
                dispatch(receiveGetVolume(response.data, response.status, idVolume));
            } else if (response.status === 401) {
                localStorage.removeItem('id_token');
                browserHistory.push('/Login');
            } else if (response.status === 400) {
                browserHistory.push('/Volumes');
            } else {
                dispatch(failGetVolume(response.data.message, response.status, idVolume));
            }
        }).catch(err => {dispatch(failGetVolume(err.toString(), 503)); console.log(err)})
    };
}

function requestGetVolume() {
    return {
        type: GET_VOLUME_REQUEST,
        isFetching: true
    };
}

function receiveGetVolume(data, status, idVolume) {
    return {
        type: GET_VOLUME_SUCCESS,
        isFetching: false,
        data,
        status,
        idVolume
    };
}

function failGetVolume(message, status, idVolume) {
    return {
        type: GET_VOLUME_FAILURE,
        isFetching: false,
        message,
        status,
        idVolume
    };
}
