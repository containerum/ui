/* @flow */

import _ from 'lodash/fp';

import {
  CHANGE_PROFILE_INFO_INVALID,
  CHANGE_PROFILE_INFO_REQUESTING,
  CHANGE_PROFILE_INFO_SUCCESS,
  CHANGE_PROFILE_INFO_FAILURE
} from '../../constants/profileConstants/changeProfileInfo';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: CHANGE_PROFILE_INFO_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case CHANGE_PROFILE_INFO_REQUESTING:
      return _.assign(state, {
        readyStatus: CHANGE_PROFILE_INFO_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        err: null
      });
    case CHANGE_PROFILE_INFO_SUCCESS:
      return _.assign(state, {
        readyStatus: CHANGE_PROFILE_INFO_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        err: null
      });
    case CHANGE_PROFILE_INFO_FAILURE:
      return _.assign(state, {
        readyStatus: CHANGE_PROFILE_INFO_FAILURE,
        isFetching: action.isFetching,
        data: null,
        status: action.status,
        method: action.method,
        err: action.err
      });
    default:
      return state;
  }
};
