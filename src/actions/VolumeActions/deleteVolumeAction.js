import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    DELETE_VOLUME_REQUEST,
    DELETE_VOLUME_SUCCESS,
    DELETE_VOLUME_FAILURE
} from '../../constants/VolumeConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function deleteVolume(idVolume) {
    return dispatch => {
        dispatch(requestDeleteVolume());
        const token = localStorage.getItem('id_token');
        const browser = localStorage.getItem('id_browser');

        return axios.delete(
            WEB_API + '/api/volumes/' + idVolume,
            {
                headers: {
                    'Authorization': token,
                    'User-Client': browser,
                    'Content-Type': 'application/x-www-form-urlencode',
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=-1, private'
                },
                validateStatus: (status) => status >= 200 && status <= 500
            }
        )
        .then(response => {
            if (response.status === 202) {
                dispatch(receiveDeleteVolume(response.status, idVolume));
            } else if (response.status === 401) {
                localStorage.removeItem('id_token');
                browserHistory.push('/Login');
            } else {
                dispatch(failDeleteVolume(response.data.message));
            }
        }).catch(err => {console.log(err); dispatch(failDeleteVolume(err.toString()))});
    };
}

function requestDeleteVolume() {
    return {
        type: DELETE_VOLUME_REQUEST,
        isFetching: true
    };
}

function receiveDeleteVolume(status, idVolume) {
    return {
        type: DELETE_VOLUME_SUCCESS,
        isFetching: false,
        status,
        idVolume
    };
}

function failDeleteVolume(message) {
    return {
        type: DELETE_VOLUME_FAILURE,
        isFetching: false,
        message
    };
}
