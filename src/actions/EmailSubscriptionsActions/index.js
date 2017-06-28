import axios from 'axios';

import {
    EMAIL_SUBSCRIPTIONS_REQUEST,
    EMAIL_SUBSCRIPTIONS_SUCCESS,
    EMAIL_SUBSCRIPTIONS_FAILURE
} from '../../constants/SubscriptionsEmailConstains';

import {
    WEB_API
} from '../../constants/WebApi';

export function subscriptionsEmail(data) {
    return dispatch => {
        dispatch(requestEmailSubscriptions());
        return axios.post(
            WEB_API + '/api/email_subscriptions',
            { new_email: data.new_email },
            {
                validateStatus: (status) =>
                status >= 200 && status <= 505
            }
        )
        .then(response => {
            if (response.status === 200) {
                console.log(response);
                dispatch(receiveEmailSubscriptions());
            } else {
                dispatch(errorEmailSubscriptions(response.data.message))
            }
        }).catch(err => console.log(err))
    }
}

function requestEmailSubscriptions() {
    return {
        type: EMAIL_SUBSCRIPTIONS_REQUEST,
        isFetching: true
    }
}

function receiveEmailSubscriptions(data) {
    return {
        type: EMAIL_SUBSCRIPTIONS_SUCCESS,
        isFetching: false,
        data
    }
}

function errorEmailSubscriptions(message) {
    return {
        type: EMAIL_SUBSCRIPTIONS_FAILURE,
        isFetching: false,
        message
    }
}
