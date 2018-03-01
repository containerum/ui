/* @flow */

import _ from 'lodash/fp';

import {
  LOGIN_INVALID,
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from '../constants/loginConstants';
import type { Action } from '../types';

const initialState = {
  readyStatus: LOGIN_INVALID,
  isFetching: false,
  token: null,
  email: '',
  password: '',
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case LOGIN_REQUESTING:
      return _.assign(state, {
        readyStatus: LOGIN_REQUESTING,
        isFetching: action.isFetching,
        token: null,
        email: action.email,
        password: action.password,
        err: null
      });
    case LOGIN_SUCCESS:
      return _.assign(state, {
        readyStatus: LOGIN_SUCCESS,
        isFetching: action.isFetching,
        token: action.token,
        err: null
      });
    case LOGIN_FAILURE:
      return _.assign(state, {
        readyStatus: LOGIN_FAILURE,
        isFetching: action.isFetching,
        token: null,
        err: action.err
      });
    default:
      return state;
  }
};
