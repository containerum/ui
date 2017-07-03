// import axios from 'axios';

import {
    SUPPORT_REQUEST,
    SUPPORT_SUCCESS,
    SUPPORT_FAILURE
} from '../../constants/SupportConstants';

// import {
//     WEB_API
// } from '../../constants/WebApi';

export function sendSupport(sendObj) {
    return dispatch => {
        dispatch(requestGetCreateDeployment(sendObj));
        dispatch(receiveGetCreateDeployment());
        dispatch(failGetCreateDeployment());
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
