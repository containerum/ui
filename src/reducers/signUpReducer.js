/* @flow */

import _ from 'lodash/fp';

import {
  SIGNUP_INVALID,
  SIGNUP_REQUESTING,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
} from '../constants/signUpConstants';
import type { Action } from '../types';

const initialState = {
  readyStatus: SIGNUP_INVALID,
  isFetching: false,
  data: {},
  email: '',
  password: '',
  recaptcha: '',
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case SIGNUP_REQUESTING:
      return _.assign(state, {
        readyStatus: SIGNUP_REQUESTING,
        isFetching: action.isFetching,
        email: action.email,
        data: {},
        password: action.password,
        recaptcha: action.recaptcha,
        err: null
      });
    case SIGNUP_SUCCESS:
      return _.assign(state, {
        readyStatus: SIGNUP_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case SIGNUP_FAILURE:
      return _.assign(state, {
        readyStatus: SIGNUP_FAILURE,
        isFetching: action.isFetching,
        data: {},
        err: action.err
      });
    default:
      return state;
  }
};
