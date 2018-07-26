/* @flow */

import _ from 'lodash/fp';

import {
  UNSET_USER_AS_ADMIN_INVALID,
  UNSET_USER_AS_ADMIN_REQUESTING,
  UNSET_USER_AS_ADMIN_SUCCESS,
  UNSET_USER_AS_ADMIN_FAILURE
} from '../../constants/userManagement/unSetUserAsAdmin';
import type { Action } from '../../types';

const initialState = {
  readyStatus: UNSET_USER_AS_ADMIN_INVALID,
  isFetching: false,
  login: null,
  status: null,
  method: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case UNSET_USER_AS_ADMIN_REQUESTING:
      return _.assign(state, {
        readyStatus: UNSET_USER_AS_ADMIN_REQUESTING,
        isFetching: action.isFetching,
        login: null,
        status: null,
        method: null,
        err: null
      });
    case UNSET_USER_AS_ADMIN_SUCCESS:
      return _.assign(state, {
        readyStatus: UNSET_USER_AS_ADMIN_SUCCESS,
        isFetching: action.isFetching,
        login: action.login,
        status: action.status,
        method: action.method,
        err: null
      });
    case UNSET_USER_AS_ADMIN_FAILURE:
      return _.assign(state, {
        readyStatus: UNSET_USER_AS_ADMIN_FAILURE,
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
