/* @flow */

import _ from 'lodash/fp';

import {
  SET_USER_AS_ADMIN_INVALID,
  SET_USER_AS_ADMIN_REQUESTING,
  SET_USER_AS_ADMIN_SUCCESS,
  SET_USER_AS_ADMIN_FAILURE
} from '../../constants/userManagement/setUserAsAdmin';
import type { Action } from '../../types';

const initialState = {
  readyStatus: SET_USER_AS_ADMIN_INVALID,
  isFetching: false,
  login: null,
  status: null,
  method: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_USER_AS_ADMIN_REQUESTING:
      return _.assign(state, {
        readyStatus: SET_USER_AS_ADMIN_REQUESTING,
        isFetching: action.isFetching,
        login: null,
        status: null,
        method: null,
        err: null
      });
    case SET_USER_AS_ADMIN_SUCCESS:
      return _.assign(state, {
        readyStatus: SET_USER_AS_ADMIN_SUCCESS,
        isFetching: action.isFetching,
        login: action.login,
        status: action.status,
        method: action.method,
        err: null
      });
    case SET_USER_AS_ADMIN_FAILURE:
      return _.assign(state, {
        readyStatus: SET_USER_AS_ADMIN_FAILURE,
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
