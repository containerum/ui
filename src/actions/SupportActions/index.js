import axios from 'axios';

import {
    SUPPORT_REQUEST,
    SUPPORT_SUCCESS,
    SUPPORT_FAILURE
} from '../../constants/SupportConstants';

export function sendSupport(sendObj) {
    return dispatch => {
        dispatch(requestGetCreateDeployment(sendObj));
        const api = 'https://exonlab.omnidesk.ru/api/cases.json';

        return axios.post(
            api,
            {
                case: sendObj
            },
            {
                auth: {
                    username: 'margo.tuleninova@gmail.com',
                    password: '53fd6bfc30a7c6fdf235bf14e'
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                validateStatus: (status) => status >= 200 && status <= 505
            }
        )
        .then(response => {
            if (response.status === 200) {
                console.log(response);
                dispatch(receiveGetCreateDeployment(response));
            } else {
                console.log(response);
                dispatch(failGetCreateDeployment(response));
            }
        }).catch(err => console.log(err));
    };
}

function requestGetCreateDeployment(data) {
    return {
        type: SUPPORT_REQUEST,
        isFetching: true,
        data
    };
}

function receiveGetCreateDeployment() {
    return {
        type: SUPPORT_SUCCESS,
        isFetching: false
    };
}

function failGetCreateDeployment() {
    return {
        type: SUPPORT_FAILURE,
        isFetching: false
    };
}
