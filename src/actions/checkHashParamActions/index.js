import axios from 'axios';

import {
    CHECK_HASH_REQUEST,
    CHECK_HASH_SUCCESS,
    CHECK_HASH_FAILURE
} from '../../constants/checkHashParamConstants';

export function checkHashParamActions(hashParam) {
    return dispatch => {
        dispatch(requestCheckHash());
        return axios.post(
            'http://139.59.146.89/api/login/check_hash',
            {hashParam: hashParam},
            {validateStatus: (status) =>
                status >= 200 && status <= 500
            }
        )
        .then(response => {
            if (response.status === 200) {
                console.log(hashParam);
                dispatch(receiveCheckHash(response.data));
            } else {
                dispatch(failCheckHash(response.data.message))
            }
        }).catch(err => console.log(err))
    }
}

function requestCheckHash() {
    return {
        type: CHECK_HASH_REQUEST,
        isFetching: true
    }
}

function receiveCheckHash(response_hash) {
    return {
        type: CHECK_HASH_SUCCESS,
        isFetching: false,
        response_hash
    }
}

function failCheckHash(message) {
    return {
        type: CHECK_HASH_FAILURE,
        isFetching: false,
        message
    }
}
