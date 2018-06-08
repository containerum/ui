/* @flow */

import _ from 'lodash/fp';

import {
  PAY_FOR_INVALID,
  PAY_FOR_REQUESTING,
  PAY_FOR_SUCCESS,
  PAY_FOR_FAILURE
} from '../../constants/billingConstants/payFor';
import type { Action } from '../../types';

const initialState = {
  readyStatus: PAY_FOR_INVALID,
  isFetching: false,
  data: null,
  status: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case PAY_FOR_REQUESTING:
      return _.assign(state, {
        readyStatus: PAY_FOR_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        err: null
      });
    case PAY_FOR_SUCCESS:
      return _.assign(state, {
        readyStatus: PAY_FOR_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        err: null
      });
    case PAY_FOR_FAILURE:
      return _.assign(state, {
        readyStatus: PAY_FOR_FAILURE,
        isFetching: action.isFetching,
        data: null,
        status: null,
        err: action.err
      });
    default:
      return state;
  }
};
