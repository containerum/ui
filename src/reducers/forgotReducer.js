/* @flow */

import _ from 'lodash/fp';

import {
  FORGOT_INVALID,
  FORGOT_REQUESTING,
  FORGOT_SUCCESS,
  FORGOT_FAILURE
} from '../constants/forgotConstants';
import type { Action } from '../types';

const initialState = {
  readyStatus: FORGOT_INVALID,
  isFetching: false,
  email: null,
  data: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case FORGOT_REQUESTING:
      return _.assign(state, {
        readyStatus: FORGOT_REQUESTING,
        isFetching: action.isFetching,
        email: action.email,
        data: null,
        err: null
      });
    case FORGOT_SUCCESS:
      return _.assign(state, {
        readyStatus: FORGOT_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case FORGOT_FAILURE:
      return _.assign(state, {
        readyStatus: FORGOT_FAILURE,
        isFetching: action.isFetching,
        email: null,
        data: null,
        err: action.err
      });
    default:
      return state;
  }
};
