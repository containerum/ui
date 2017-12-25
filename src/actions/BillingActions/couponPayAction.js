import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    COUPON_PAY_REQUEST,
    COUPON_PAY_SUCCESS,
    COUPON_PAY_FAILURE
} from '../../constants/BillingConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function couponPay(coupon) {
    return dispatch => {
        dispatch(requestCouponPay());
        let token = '';
        let browser = '';
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            token = localStorage.getItem('id_token');
            browser = localStorage.getItem('id_browser');
        }

        const api = WEB_API + '/api/apply_coupon';
        return axios.post(
            api,
            { code: coupon },
            {
                headers: {
                    'Authorization': token,
                    'User-Client': browser,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=-1, private'
                },
                validateStatus: (status) => status >= 200 && status <= 500
            }
        )
        .then(response => {
            if (response.status === 200) {
                dispatch(receiveCouponPay(response.data, coupon, response.status));
            } else if (response.status === 401) {
                if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                    localStorage.removeItem('id_token');
                    browserHistory.push('/Login');
                }
            } else {
                dispatch(failCouponPay(response.data.message, response.status));
            }
        }).catch(err => {dispatch(failCouponPay(err.toString())); console.log(err)});
    };
}

function requestCouponPay() {
    return {
        type: COUPON_PAY_REQUEST,
        isFetching: true
    };
}

function receiveCouponPay(data, coupon, status) {
    return {
        type: COUPON_PAY_SUCCESS,
        isFetching: false,
        data,
	    coupon,
	    status
    };
}

function failCouponPay(message, status) {
    return {
        type: COUPON_PAY_FAILURE,
        isFetching: false,
        message,
        status
    };
}
