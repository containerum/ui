import axios from 'axios';
import { browserHistory } from 'react-router';
import ReactGA from 'react-ga';

import {
    CREATE_VOLUME_REQUEST,
    CREATE_VOLUME_SUCCESS,
    CREATE_VOLUME_FAILURE
} from '../../constants/VolumeConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function createVolume(idVolume, tariff, price) {
    return dispatch => {
        dispatch(requestCreateVolume());
        let token = '';
        let browser = '';
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            token = localStorage.getItem('id_token');
            browser = localStorage.getItem('id_browser');
        }

        return axios.post(
            WEB_API + '/api/volumes',
            {
                label: idVolume,
                tariff_label: tariff
            },
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
            // console.log(response);
            if (response.status === 201) {
                dispatch(receiveCreateVolume(response.data, response.status, idVolume));
                ReactGA.event({
                    category: 'UI',
                    action: `UI_create_volume_${price}`
                });
                if (typeof window !== 'undefined') {
                    browserHistory.push('/Volumes');
                }
            } else if (response.status === 401) {
                if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                    localStorage.removeItem('id_token');
                    browserHistory.push('/Login');
                }
            } else {
                dispatch(failCreateVolume(response.data.message, response.status, idVolume));
            }
        }).catch(err => {dispatch(failCreateVolume(err.toString(), 503, idVolume)); console.log(err)});
    };
}

function requestCreateVolume() {
    return {
        type: CREATE_VOLUME_REQUEST,
        isFetching: true
    };
}

function receiveCreateVolume(data, status, idVolume) {
    return {
        type: CREATE_VOLUME_SUCCESS,
        isFetching: false,
        data,
        status,
        idVolume
    };
}

function failCreateVolume(message, status, idVolume) {
    return {
        type: CREATE_VOLUME_FAILURE,
        isFetching: false,
        message,
        status,
        idVolume
    };
}
