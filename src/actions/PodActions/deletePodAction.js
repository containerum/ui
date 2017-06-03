import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    DELETE_POD_REQUEST,
    DELETE_POD_SUCCESS,
    DELETE_POD_FAILURE
} from '../../constants/PodConstants';

export function deletePod(namespaceName, podName) {
    return dispatch => {
        dispatch(requestDeletePod());
        const token = localStorage.getItem('id_token');
        const api = 'http://207.154.197.7:5000/api/namespaces/' + namespaceName + '/pods/' + podName;

        return axios.delete(
            api,
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
                if (response.status === 200) {
                    dispatch(receiveDeletePod(podName, response.data));
                } else if (response.status === 401) {
                    localStorage.removeItem('id_token');
                    browserHistory.push('/Login');
                } else {
                    dispatch(failDeletePod(response.data.message))
                }
            }).catch(err => console.log(err))
    }
}

function requestDeletePod() {
    return {
        type: DELETE_POD_REQUEST,
        isFetching: true
    }
}

function receiveDeletePod(podName, status) {
    return {
        type: DELETE_POD_SUCCESS,
        isFetching: false,
        podName,
        status
    }
}

function failDeletePod(message) {
    return {
        type: DELETE_POD_FAILURE,
        isFetching: false,
        message
    }
}
