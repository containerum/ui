/* @flow */

import _ from 'lodash/fp';

import {
  CHECK_HASH_PASSWORD_INVALID,
  CHECK_HASH_PASSWORD_REQUESTING,
  CHECK_HASH_PASSWORD_SUCCESS,
  CHECK_HASH_PASSWORD_FAILURE
} from '../constants/checkHashPasswordConstants';
import type { Action } from '../types';

const initialState = {
  readyStatus: CHECK_HASH_PASSWORD_INVALID,
  isFetching: false,
  data: null,
  hashParam: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case CHECK_HASH_PASSWORD_REQUESTING:
      return _.assign(state, {
        readyStatus: CHECK_HASH_PASSWORD_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        hashParam: null,
        err: null
      });
    case CHECK_HASH_PASSWORD_SUCCESS:
      return _.assign(state, {
        readyStatus: CHECK_HASH_PASSWORD_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case CHECK_HASH_PASSWORD_FAILURE:
      return _.assign(state, {
        readyStatus: CHECK_HASH_PASSWORD_FAILURE,
        isFetching: action.isFetching,
        data: null,
        hashParam: null,
        err: action.err
      });
    default:
      return state;
  }
};
