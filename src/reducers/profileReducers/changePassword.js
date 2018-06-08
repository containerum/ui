/* @flow */

import _ from 'lodash/fp';

import {
  CHANGE_PASSWORD_INVALID,
  CHANGE_PASSWORD_REQUESTING,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE
} from '../../constants/profileConstants/changePassword';
import type { Action } from '../../types';

const initialState = {
  readyStatus: CHANGE_PASSWORD_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUESTING:
      return _.assign(state, {
        readyStatus: CHANGE_PASSWORD_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        err: null
      });
    case CHANGE_PASSWORD_SUCCESS:
      return _.assign(state, {
        readyStatus: CHANGE_PASSWORD_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        err: null
      });
    case CHANGE_PASSWORD_FAILURE:
      return _.assign(state, {
        readyStatus: CHANGE_PASSWORD_FAILURE,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        err: action.err
      });
    default:
      return state;
  }
};
