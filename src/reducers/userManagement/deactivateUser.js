/* @flow */

import _ from 'lodash/fp';

import {
  DEACTIVATE_USER_INVALID,
  DEACTIVATE_USER_REQUESTING,
  DEACTIVATE_USER_SUCCESS,
  DEACTIVATE_USER_FAILURE
} from '../../constants/userManagement/deactivateUser';
import type { Action } from '../../types';

const initialState = {
  readyStatus: DEACTIVATE_USER_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case DEACTIVATE_USER_REQUESTING:
      return _.assign(state, {
        readyStatus: DEACTIVATE_USER_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        err: null
      });
    case DEACTIVATE_USER_SUCCESS:
      return _.assign(state, {
        readyStatus: DEACTIVATE_USER_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        err: null
      });
    case DEACTIVATE_USER_FAILURE:
      return _.assign(state, {
        readyStatus: DEACTIVATE_USER_FAILURE,
        isFetching: action.isFetching,
        data: null,
        status: action.status,
        method: null,
        err: action.err
      });
    default:
      return state;
  }
};
