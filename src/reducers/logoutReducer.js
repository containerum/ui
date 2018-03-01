/* @flow */

import _ from 'lodash/fp';

import {
  LOGOUT_INVALID,
  LOGOUT_REQUESTING,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from '../constants/logoutConstants';
import type { Action } from '../types';

const initialState = {
  readyStatus: LOGOUT_INVALID,
  isFetching: false,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case LOGOUT_REQUESTING:
      return _.assign(state, {
        readyStatus: LOGOUT_REQUESTING,
        isFetching: action.isFetching,
        err: null
      });
    case LOGOUT_SUCCESS:
      return _.assign(state, {
        readyStatus: LOGOUT_SUCCESS,
        isFetching: action.isFetching,
        err: null
      });
    case LOGOUT_FAILURE:
      return _.assign(state, {
        readyStatus: LOGOUT_FAILURE,
        isFetching: action.isFetching,
        err: action.err
      });
    default:
      return state;
  }
};
