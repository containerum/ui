/* @flow */

import _ from 'lodash/fp';

import {
  GET_SUPPORT_GROUPS_INVALID,
  GET_SUPPORT_GROUPS_REQUESTING,
  GET_SUPPORT_GROUPS_SUCCESS,
  GET_SUPPORT_GROUPS_FAILURE
} from '../../constants/supportConstants/getSupportGroupsConstants';
import type { Action } from '../../types';

const initialState = {
  readyStatus: GET_SUPPORT_GROUPS_INVALID,
  isFetching: false,
  data: [],
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_SUPPORT_GROUPS_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_SUPPORT_GROUPS_REQUESTING,
        isFetching: action.isFetching,
        data: [],
        err: null
      });
    case GET_SUPPORT_GROUPS_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_SUPPORT_GROUPS_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case GET_SUPPORT_GROUPS_FAILURE:
      return _.assign(state, {
        readyStatus: GET_SUPPORT_GROUPS_FAILURE,
        isFetching: action.isFetching,
        data: [],
        err: action.err
      });
    default:
      return state;
  }
};
