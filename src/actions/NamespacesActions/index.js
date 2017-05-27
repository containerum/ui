import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    NAMESPACES_REQUEST,
    NAMESPACES_SUCCESS,
    NAMESPACES_FAILURE
} from '../../constants/NamespacesConstants';

export function getNamespaces() {
    return dispatch => {
        dispatch(requestGetNamespaces());

        return axios.get(
            'http://207.154.197.7:5000/api/namespaces',
            {
                headers: {
                    'Authorization': localStorage.getItem('id_token'),
                    'Content-Type': 'application/x-www-form-urlencode'
                },
                validateStatus: (status) => status >= 200 && status <= 500
            }
        )
        .then(response => {
            if (response.status === 200 || response.status === 201) {
                dispatch(receiveGetNamespaces(response.data));
            } else if (response.status === 401) {
                localStorage.removeItem('id_token');
                browserHistory.push('/Login');
            } else {
                dispatch(failGetNamespaces(response.data.message))
            }
        }).catch(err => console.log(err))
    }
}

function requestGetNamespaces() {
    return {
        type: NAMESPACES_REQUEST,
        isFetching: true
    }
}

function receiveGetNamespaces(data) {
    return {
        type: NAMESPACES_SUCCESS,
        isFetching: false,
        data
    }
}

function failGetNamespaces(message) {
    return {
        type: NAMESPACES_FAILURE,
        isFetching: false,
        message
    }
}
