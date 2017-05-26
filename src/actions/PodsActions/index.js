import axios from 'axios';

import {
    PODS_REQUEST,
    PODS_SUCCESS,
    PODS_FAILURE
} from '../../constants/PodsConstants';

export function getPods(namespaceName, idDeployment) {
    return dispatch => {
        dispatch(requestGetPods());
        const api = 'http://207.154.197.7:5000/api/namespaces/' + namespaceName + '/pods';

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
                // TODO: filterDepData
                // var filterDepData = response.data.filter(function(item){
                //     return item.namespace === idDeployment;
                // })
                dispatch(receiveGetPods(response.data));
            } else {
                dispatch(failGetPods(response.data.message))
            }
        }).catch(err => console.log(err))
    }
}

function requestGetPods() {
    return {
        type: PODS_REQUEST,
        isFetching: true
    }
}

function receiveGetPods(data) {
    return {
        type: PODS_SUCCESS,
        isFetching: false,
        data
    }
}

function failGetPods(message) {
    return {
        type: PODS_FAILURE,
        isFetching: false,
        message
    }
}
