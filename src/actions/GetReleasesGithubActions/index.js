import axios from 'axios';

import {
    GET_RELEASES_REQUEST,
    GET_RELEASES_SUCCESS,
    GET_RELEASES_FAILURE
} from '../../constants/GetReleasesGithubConstans';

export function GetReleasesGithub() {
    return dispatch => {
        dispatch(requestGetReleases());

        return axios.get(
            'https://api.github.com/repos/containerum/chkit/releases/latest',
            {
                validateStatus: (status) => status >= 200 && status <= 505
            }
        )
        .then(response => {
            if (response.status === 200) {
                dispatch(receiveGetReleases(response.data));
            } else {
                dispatch(failGetReleases(response.data.message));
            }
        }).catch(err => {
            console.log(err);
            dispatch(failGetReleases(err));
        });
    };
}

function requestGetReleases() {
    return {
        type: GET_RELEASES_REQUEST,
        isFetching: true
    };
}

function receiveGetReleases(data) {
    return {
        type: GET_RELEASES_SUCCESS,
        isFetching: false,
        data
    };
}

function failGetReleases(errorMessage) {
    return {
        type: GET_RELEASES_FAILURE,
        isFetching: false,
        errorMessage
    };
}

