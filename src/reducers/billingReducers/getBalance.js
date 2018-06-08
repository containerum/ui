/* @flow */

import _ from 'lodash/fp';

import {
  GET_BALANCE_INVALID,
  GET_BALANCE_REQUESTING,
  GET_BALANCE_SUCCESS,
  GET_BALANCE_FAILURE
} from '../../constants/billingConstants/getBalance';
import type { Action } from '../../types';

const initialState = {
  readyStatus: GET_BALANCE_INVALID,
  isFetching: false,
  data: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_BALANCE_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_BALANCE_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        err: null
      });
    case GET_BALANCE_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_BALANCE_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case GET_BALANCE_FAILURE:
      return _.assign(state, {
        readyStatus: GET_BALANCE_FAILURE,
        isFetching: action.isFetching,
        data: null,
        err: action.err
      });
    default:
      return state;
  }
};
