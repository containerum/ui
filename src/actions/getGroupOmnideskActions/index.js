import axios from 'axios';

import {
    GET_GROUP_OMNIDESK_REQUEST,
    GET_GROUP_OMNIDESK_SUCCESS,
    GET_GROUP_OMNIDESK_FAILURE
} from '../../constants/SupportConstants';

export function getGroupOmnidesk() {
    return dispatch => {
        dispatch(requestGetGroupOmnidesk());
        return axios.get(
            'https://web.containerum.io/group_omnidesk',
            {
                headers: {
                    'Accept': '*/*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'X-Requested-With'
                },
                validateStatus: (status) => status >= 200 && status <= 505
            }
        )
        .then(response => {
            if (response.status === 200) {
                dispatch(receiveGetGroupOmnidesk(response.data));
            } else {
                dispatch(failGetGroupOmnidesk(response.data.message));
            }
        }).catch(err => console.log(err));
    };
}

function requestGetGroupOmnidesk() {
    return {
        type: GET_GROUP_OMNIDESK_REQUEST,
        isFetching: true
    };
}

function receiveGetGroupOmnidesk(data) {
    return {
        type: GET_GROUP_OMNIDESK_SUCCESS,
        isFetching: false,
        data
    };
}

function failGetGroupOmnidesk(error) {
    return {
        type: GET_GROUP_OMNIDESK_FAILURE,
        isFetching: false,
        error
    };
}
