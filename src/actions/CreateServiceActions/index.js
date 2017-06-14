import axios from 'axios';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('id_token');

import {
    CREATE_SERVICE_REQUEST,
    CREATE_SERVICE_SUCCESS,
    CREATE_SERVICE_FAILURE
} from '../../constants/CreateServiceConstants';

// import {
//     WEB_API
// } from '../../constants/WebApi';

export function getCreateService() {
    return dispatch => {
        dispatch(requestGetCreateService());
        dispatch(receiveGetCreateService());
        dispatch(failGetCreateService())
    }
}

function requestGetCreateService() {
    return {
        type: CREATE_SERVICE_REQUEST,
        isFetching: true
    }
}

function receiveGetCreateService() {
    return {
        type: CREATE_SERVICE_SUCCESS,
        isFetching: false,
    }
}

function failGetCreateService() {
    return {
        type: CREATE_SERVICE_FAILURE,
        isFetching: false
    }
}
