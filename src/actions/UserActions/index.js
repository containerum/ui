import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    USER_REQUEST,
    // USER_SUCCESS,
    USER_FAILURE
} from '../../constants/UserConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function getUser(data) {
    return dispatch => {
        dispatch(requestGetUser());
        const token = localStorage.getItem('id_token');
        const api = WEB_API + '/api/profile';

        return axios.put(
            api,
            { data },
            {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/x-www-form-urlencode',
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=-1, private'
                },
                validateStatus: (status) => status >= 200 && status <= 500
            }
        )
        .then(response => {
            if (response.status === 200 || response.status === 201) {
                // console.log(response);
                // dispatch(receiveGetUser(response.data));
            } else if (response.status === 401) {
                localStorage.removeItem('id_token');
                browserHistory.push('/Login');
            } else {
                dispatch(failGetUser(response.data.message));
            }
        }).catch(err => console.log(err));
    };
}

function requestGetUser() {
    return {
        type: USER_REQUEST,
        isFetching: true
    };
}

// function receiveGetUser(data) {
//     return {
//         type: USER_SUCCESS,
//         isFetching: false,
//         data
//     }
// }

function failGetUser(message) {
    return {
        type: USER_FAILURE,
        isFetching: false,
        message
    };
}
