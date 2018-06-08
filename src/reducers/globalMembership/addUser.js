/* @flow */

import _ from 'lodash/fp';

import {
  ADD_GLOBAL_USER_INVALID,
  ADD_GLOBAL_USER_REQUESTING,
  ADD_GLOBAL_USER_SUCCESS,
  ADD_GLOBAL_USER_FAILURE
} from '../../constants/globalMembershipConstants/addGlobalUser';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: ADD_GLOBAL_USER_INVALID,
  isFetching: false,
  status: null,
  login: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD_GLOBAL_USER_REQUESTING:
      return _.assign(state, {
        readyStatus: ADD_GLOBAL_USER_REQUESTING,
        isFetching: action.isFetching,
        status: null,
        login: null,
        method: null,
        err: null
      });
    case ADD_GLOBAL_USER_SUCCESS:
      return _.assign(state, {
        readyStatus: ADD_GLOBAL_USER_SUCCESS,
        isFetching: action.isFetching,
        status: action.status,
        login: action.login.login,
        method: action.method,
        err: null
      });
    case ADD_GLOBAL_USER_FAILURE:
      return _.assign(state, {
        readyStatus: ADD_GLOBAL_USER_FAILURE,
        isFetching: action.isFetching,
        status: action.status,
        login: action.login,
        method: null,
        err: action.err
      });
    default:
      return state;
  }
};
