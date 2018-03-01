/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  COUPON_PAY_REQUESTING,
  COUPON_PAY_SUCCESS,
  COUPON_PAY_FAILURE
} from '../../constants/billingConstants/couponPay';
import { webApi } from '../../config/index';

const couponPayRequest = () => ({
  type: COUPON_PAY_REQUESTING,
  isFetching: true
});

const couponPaySuccess = (data, status, method, code) => ({
  type: COUPON_PAY_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  code
});

const couponPayFailure = (err, status, method, code) => ({
  type: COUPON_PAY_FAILURE,
  isFetching: false,
  err,
  status,
  method,
  code
});

export const fetchCouponPay = (
  code: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;

  dispatch(couponPayRequest());

  const response = await axios.post(
    `${URL}/api/apply_coupon`,
    { code },
    {
      headers: {
        Authorization: token,
        'User-Client': browser,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control':
          'no-cache, no-store, must-revalidate, max-age=-1, private'
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { status, data, config } = response;
  switch (status) {
    case 200: {
      dispatch(couponPaySuccess(data, status, config.method, code));
      break;
    }
    case 401: {
      dispatch(couponPayFailure(data.message, status, config.method, code));
      dispatch(push('/login'));
      break;
    }
    default: {
      dispatch(couponPayFailure(data.message, status, config.method, code));
    }
  }
};

export const fetchCouponPayIfNeeded = (code: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchCouponPay(code, axios));
