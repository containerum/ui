/* @flow */

import _ from 'lodash/fp';

import {
  RESET_PASSWORD_OF_USER_INVALID,
  RESET_PASSWORD_OF_USER_REQUESTING,
  RESET_PASSWORD_OF_USER_SUCCESS,
  RESET_PASSWORD_OF_USER_FAILURE
} from '../../constants/userManagement/resetPasswordOfUser';
import type { Action } from '../../types';

const initialState = {
  readyStatus: RESET_PASSWORD_OF_USER_INVALID,
  isFetching: false,
  data: null,
  login: null,
  status: null,
  method: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case RESET_PASSWORD_OF_USER_REQUESTING:
      return _.assign(state, {
        readyStatus: RESET_PASSWORD_OF_USER_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        login: null,
        status: null,
        method: null,
        err: null
      });
    case RESET_PASSWORD_OF_USER_SUCCESS:
      return _.assign(state, {
        readyStatus: RESET_PASSWORD_OF_USER_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        login: action.login,
        status: action.status,
        method: action.method,
        err: null
      });
    case RESET_PASSWORD_OF_USER_FAILURE:
      return _.assign(state, {
        readyStatus: RESET_PASSWORD_OF_USER_FAILURE,
        isFetching: action.isFetching,
        data: null,
        login: null,
        status: action.status,
        method: null,
        err: action.err
      });
    default:
      return state;
  }
};
