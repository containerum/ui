/* @flow */

import _ from 'lodash/fp';

import {
  ACTIVATE_USER_INVALID,
  ACTIVATE_USER_REQUESTING,
  ACTIVATE_USER_SUCCESS,
  ACTIVATE_USER_FAILURE
} from '../../constants/userManagement/activateUser';
import type { Action } from '../../types';

const initialState = {
  readyStatus: ACTIVATE_USER_INVALID,
  isFetching: false,
  login: null,
  status: null,
  method: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case ACTIVATE_USER_REQUESTING:
      return _.assign(state, {
        readyStatus: ACTIVATE_USER_REQUESTING,
        isFetching: action.isFetching,
        login: null,
        status: null,
        method: null,
        err: null
      });
    case ACTIVATE_USER_SUCCESS:
      return _.assign(state, {
        readyStatus: ACTIVATE_USER_SUCCESS,
        isFetching: action.isFetching,
        login: action.login,
        status: action.status,
        method: action.method,
        err: null
      });
    case ACTIVATE_USER_FAILURE:
      return _.assign(state, {
        readyStatus: ACTIVATE_USER_FAILURE,
        isFetching: action.isFetching,
        login: null,
        status: action.status,
        method: null,
        err: action.err
      });
    default:
      return state;
  }
};
