import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    VOLUMES_TARIFFS_REQUEST,
    VOLUMES_TARIFFS_SUCCESS,
    VOLUMES_TARIFFS_FAILURE
} from '../../constants/VolumesConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function getVolumesTariffs() {
    return dispatch => {
        dispatch(requestGetVolumesTariffs());
        let token = '';
        let browser = '';
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            token = localStorage.getItem('id_token');
            browser = localStorage.getItem('id_browser');
        }

        return axios.get(
            WEB_API + '/api/volume_tariffs',
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
            response.data.sort(function(a, b) {
                return parseFloat(a.price) - parseFloat(b.price);
            });
            if (response.status === 200 || response.status === 201) {
                dispatch(receiveGetVolumesTariffs(response.data));
            } else if (response.status === 401) {
                if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                    localStorage.removeItem('id_token');
                    browserHistory.push('/Login');
                }
            } else if (response.status === 404) {
                dispatch(receiveGetVolumesTariffs([]));
            } else {
                dispatch(failGetVolumesTariffs(response.data.message));
            }
        }).catch(err => console.log(err));
    };
}

function requestGetVolumesTariffs() {
    return {
        type: VOLUMES_TARIFFS_REQUEST,
        isFetching: true
    };
}

function receiveGetVolumesTariffs(data) {
    return {
        type: VOLUMES_TARIFFS_SUCCESS,
        isFetching: false,
        data
    };
}

function failGetVolumesTariffs(message) {
    return {
        type: VOLUMES_TARIFFS_FAILURE,
        isFetching: false,
        message
    };
}
