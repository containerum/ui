import axios from 'axios';

import {
    POD_REQUEST,
    POD_SUCCESS,
    POD_FAILURE
} from '../../constants/PodConstants';

export function getPod(namespaceName, podName) {
    return dispatch => {
        dispatch(requestGetPod());
        const api = 'http://207.154.197.7:5000/api/namespaces/' + namespaceName + '/pods/' + podName;

        return axios.get(
            api,
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
                console.log(response);
                dispatch(receiveGetPod(response.data));
            } else {
                dispatch(failGetPod(response.data.message))
            }
        }).catch(err => console.log(err))
    }
}

function requestGetPod() {
    return {
        type: POD_REQUEST,
        isFetching: true
    }
}

function receiveGetPod(data) {
    return {
        type: POD_SUCCESS,
        isFetching: false,
        data
    }
}

function failGetPod(message) {
    return {
        type: POD_FAILURE,
        isFetching: false,
        message
    }
}
