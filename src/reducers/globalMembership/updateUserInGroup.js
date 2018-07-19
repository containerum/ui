/* @flow */

import _ from 'lodash/fp';

import {
  UPDATE_GLOBAL_USER_IN_GROUP_INVALID,
  UPDATE_GLOBAL_USER_IN_GROUP_REQUESTING,
  UPDATE_GLOBAL_USER_IN_GROUP_SUCCESS,
  UPDATE_GLOBAL_USER_IN_GROUP_FAILURE
} from '../../constants/globalMembershipConstants/updateGlobalUserInGroup';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: UPDATE_GLOBAL_USER_IN_GROUP_INVALID,
  isFetching: false,
  status: null,
  members: null,
  labelGroup: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case UPDATE_GLOBAL_USER_IN_GROUP_REQUESTING:
      return _.assign(state, {
        readyStatus: UPDATE_GLOBAL_USER_IN_GROUP_REQUESTING,
        isFetching: action.isFetching,
        status: null,
        members: null,
        method: null,
        labelGroup: null,
        err: null
      });
    case UPDATE_GLOBAL_USER_IN_GROUP_SUCCESS:
      return _.assign(state, {
        readyStatus: UPDATE_GLOBAL_USER_IN_GROUP_SUCCESS,
        isFetching: action.isFetching,
        status: action.status,
        members: action.members,
        labelGroup: action.labelGroup,
        method: action.method,
        err: null
      });
    case UPDATE_GLOBAL_USER_IN_GROUP_FAILURE:
      return _.assign(state, {
        readyStatus: UPDATE_GLOBAL_USER_IN_GROUP_FAILURE,
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
