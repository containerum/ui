/* @flow */

import _ from 'lodash/fp';

import {
  ADD_GLOBAL_USER_IN_GROUP_INVALID,
  ADD_GLOBAL_USER_IN_GROUP_REQUESTING,
  ADD_GLOBAL_USER_IN_GROUP_SUCCESS,
  ADD_GLOBAL_USER_IN_GROUP_FAILURE
} from '../../constants/globalMembershipConstants/addGlobalUserInGroup';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: ADD_GLOBAL_USER_IN_GROUP_INVALID,
  isFetching: false,
  status: null,
  members: null,
  labelGroup: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD_GLOBAL_USER_IN_GROUP_REQUESTING:
      return _.assign(state, {
        readyStatus: ADD_GLOBAL_USER_IN_GROUP_REQUESTING,
        isFetching: action.isFetching,
        status: null,
        members: null,
        method: null,
        labelGroup: null,
        err: null
      });
    case ADD_GLOBAL_USER_IN_GROUP_SUCCESS:
      return _.assign(state, {
        readyStatus: ADD_GLOBAL_USER_IN_GROUP_SUCCESS,
        isFetching: action.isFetching,
        status: action.status,
        members: action.members,
        labelGroup: action.labelGroup,
        method: action.method,
        err: null
      });
    case ADD_GLOBAL_USER_IN_GROUP_FAILURE:
      return _.assign(state, {
        readyStatus: ADD_GLOBAL_USER_IN_GROUP_FAILURE,
        isFetching: action.isFetching,
        status: action.status,
        members: action.members,
        method: null,
        labelGroup: action.labelGroup,
        err: action.err
      });
    default:
      return state;
  }
};
