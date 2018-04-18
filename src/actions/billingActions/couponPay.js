/* @flow */

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

const couponPayInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchCouponPay = (
  code: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  const accessToken = cookie.load('accessToken')
    ? cookie.load('accessToken')
    : null;

  dispatch(couponPayRequest());

  const response = await axios.post(
    `${URL}/coupon/create`,
    { code },
    {
      headers: {
        'User-Client': browser,
        'User-Token': accessToken
        // 'Content-Type': 'application/json'
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { status, data, config } = response;
  // console.log(data);
  switch (status) {
    case 200: {
      dispatch(couponPaySuccess(data, status, config.method, code));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(couponPayInvalidToken());
      } else dispatch(couponPayFailure(data.message));
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
