/* @flow */

import _ from 'lodash/fp';

import {
  COUPON_PAY_INVALID,
  COUPON_PAY_REQUESTING,
  COUPON_PAY_SUCCESS,
  COUPON_PAY_FAILURE
} from '../../constants/billingConstants/couponPay';
import type { Action } from '../../types';

const initialState = {
  readyStatus: COUPON_PAY_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  code: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case COUPON_PAY_REQUESTING:
      return _.assign(state, {
        readyStatus: COUPON_PAY_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        code: null,
        err: null
      });
    case COUPON_PAY_SUCCESS:
      return _.assign(state, {
        readyStatus: COUPON_PAY_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        code: action.code,
        err: null
      });
    case COUPON_PAY_FAILURE:
      return _.assign(state, {
        readyStatus: COUPON_PAY_FAILURE,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        code: null,
        err: action.err
      });
    default:
      return state;
  }
};
