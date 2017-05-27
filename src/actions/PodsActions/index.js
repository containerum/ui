import axios from 'axios';
import { browserHistory } from 'react-router';
// import sha256 from 'sha256';

import {
    PODS_REQUEST,
    PODS_SUCCESS,
    PODS_FAILURE
} from '../../constants/PodsConstants';

export function getPods(namespaceName, idDeployment) {
    return dispatch => {
        dispatch(requestGetPods());
        const api = 'http://207.154.197.7:5000/api/namespaces/' + namespaceName + '/pods';
        // const shaDeployment256 = sha256(idDeployment).substring(0, 32);
        // console.log(shaDeployment256);

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
                // const filterDepData = response.data.filter(function(item){
                //     return item.namespace === shaDeployment256;
                // });
                dispatch(receiveGetPods(response.data));
            } else if (response.status === 401) {
                localStorage.removeItem('id_token');
                browserHistory.push('/Login');
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
