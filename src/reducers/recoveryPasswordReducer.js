/* @flow */

import _ from 'lodash/fp';

import {
  RECOVERY_PASSWORD_INVALID,
  RECOVERY_PASSWORD_REQUESTING,
  RECOVERY_PASSWORD_SUCCESS,
  RECOVERY_PASSWORD_FAILURE
} from '../constants/recoveryPasswordConstants';
import type { Action } from '../types';

const initialState = {
  readyStatus: RECOVERY_PASSWORD_INVALID,
  isFetching: false,
  hashParam: null,
  password: null,
  data: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case RECOVERY_PASSWORD_REQUESTING:
      return _.assign(state, {
        readyStatus: RECOVERY_PASSWORD_REQUESTING,
        isFetching: action.isFetching,
        hashParam: action.hashParam,
        password: action.password,
        data: null,
        err: null
      });
    case RECOVERY_PASSWORD_SUCCESS:
      return _.assign(state, {
        readyStatus: RECOVERY_PASSWORD_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case RECOVERY_PASSWORD_FAILURE:
      return _.assign(state, {
        readyStatus: RECOVERY_PASSWORD_FAILURE,
        isFetching: action.isFetching,
        hashParam: null,
        password: null,
        data: null,
        err: action.err
      });
    default:
      return state;
  }
};
