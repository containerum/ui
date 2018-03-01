/* @flow */

import _ from 'lodash/fp';

import {
  CONFIRM_SIGNUP_INVALID,
  CONFIRM_SIGNUP_REQUESTING,
  CONFIRM_SIGNUP_SUCCESS,
  CONFIRM_SIGNUP_FAILURE
} from '../constants/confirmSignUpConstants';
import type { Action } from '../types';

const initialState = {
  readyStatus: CONFIRM_SIGNUP_INVALID,
  isFetching: false,
  data: {},
  hashParam: '',
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case CONFIRM_SIGNUP_REQUESTING:
      return _.assign(state, {
        readyStatus: CONFIRM_SIGNUP_REQUESTING,
        isFetching: action.isFetching,
        hashParam: action.hashParam,
        data: {},
        err: null
      });
    case CONFIRM_SIGNUP_SUCCESS:
      return _.assign(state, {
        readyStatus: CONFIRM_SIGNUP_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case CONFIRM_SIGNUP_FAILURE:
      return _.assign(state, {
        readyStatus: CONFIRM_SIGNUP_FAILURE,
        isFetching: action.isFetching,
        data: {},
        err: action.err
      });
    default:
      return state;
  }
};
