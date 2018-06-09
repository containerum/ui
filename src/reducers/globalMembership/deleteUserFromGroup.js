/* @flow */

import _ from 'lodash/fp';

import {
  DELETE_USER_FROM_GROUP_INVALID,
  DELETE_USER_FROM_GROUP_REQUESTING,
  DELETE_USER_FROM_GROUP_SUCCESS,
  DELETE_USER_FROM_GROUP_FAILURE
} from '../../constants/globalMembershipConstants/deleteUserFromGroup';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: DELETE_USER_FROM_GROUP_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  username: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case DELETE_USER_FROM_GROUP_REQUESTING:
      return _.assign(state, {
        readyStatus: DELETE_USER_FROM_GROUP_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        username: null,
        err: null
      });
    case DELETE_USER_FROM_GROUP_SUCCESS:
      return _.assign(state, {
        readyStatus: DELETE_USER_FROM_GROUP_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        username: action.username,
        err: null
      });
    case DELETE_USER_FROM_GROUP_FAILURE:
      return _.assign(state, {
        readyStatus: DELETE_USER_FROM_GROUP_FAILURE,
        isFetching: action.isFetching,
        data: null,
        status: action.status,
        method: null,
        username: action.username,
        err: action.err
      });
    default:
      return state;
  }
};
