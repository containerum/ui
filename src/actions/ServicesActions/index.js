import axios from 'axios';

import {
    SERVICES_REQUEST,
    SERVICES_SUCCESS,
    SERVICES_FAILURE
} from '../../constants/ServicesConstants';

export function getServices(namespaceName) {
    return dispatch => {
        dispatch(requestGetServices());
        const api = 'http://207.154.197.7:5000/api/namespaces/' + namespaceName + '/services';

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
                dispatch(receiveGetServices(response.data));
            } else {
                dispatch(failGetServices(response.data.message))
            }
        }).catch(err => console.log(err))
    }
}

function requestGetServices() {
    return {
        type: SERVICES_REQUEST,
        isFetching: true
    }
}

function receiveGetServices(data) {
    return {
        type: SERVICES_SUCCESS,
        isFetching: false,
        data
    }
}

function failGetServices(message) {
    return {
        type: SERVICES_FAILURE,
        isFetching: false,
        message
    }
}
