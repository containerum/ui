import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    GET_VOLUMES_BY_NS_REQUEST,
    GET_VOLUMES_BY_NS_SUCCESS,
    GET_VOLUMES_BY_NS_FAILURE
} from '../../constants/VolumesConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function getVolumesByNSAction(name) {
    return dispatch => {
        dispatch(requestGetVolumesByNS());
        let token = '';
        let browser = '';
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            token = localStorage.getItem('id_token');
            browser = localStorage.getItem('id_browser');
        }

        return axios.get(
            WEB_API + `/api/namespaces/${name}/volumes`,
            {
                headers: {
                    'Authorization': token,
                    'User-Client': browser,
                    'Content-Type': 'application/x-www-form-urlencode',
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=-1, private'
                },
                validateStatus: (status) => status >= 200 && status <= 505
            }
        )
        .then(response => {
            if (response.status === 200) {
                // console.log(response.data);
                dispatch(receiveGetVolumesByNS(response.data));
            } else if (response.status === 401) {
                if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                    localStorage.removeItem('id_token');
                    browserHistory.push('/Login');
                }
            } else if (response.status === 404) {
                dispatch(receiveGetVolumesByNS([]));
            } else if (response.status === 503) {
                dispatch(receiveGetVolumesByNS([]));
            } else {
                dispatch(failGetVolumesByNS(response.data.message));
            }
        }).catch(err => console.log(err));
    };
}

function requestGetVolumesByNS() {
    return {
        type: GET_VOLUMES_BY_NS_REQUEST,
        isFetching: true
    };
}

function receiveGetVolumesByNS(data) {
    return {
        type: GET_VOLUMES_BY_NS_SUCCESS,
        isFetching: false,
        data
    };
}

function failGetVolumesByNS(message) {
    return {
        type: GET_VOLUMES_BY_NS_FAILURE,
        isFetching: false,
        message
    };
}
