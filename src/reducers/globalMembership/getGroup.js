/* @flow */

import _ from 'lodash/fp';

import {
  GET_GROUP_INVALID,
  GET_GROUP_REQUESTING,
  GET_GROUP_SUCCESS,
  GET_GROUP_FAILURE
} from '../../constants/globalMembershipConstants/getGroup';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: GET_GROUP_INVALID,
  isFetching: false,
  data: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_GROUP_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_GROUP_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        err: null
      });
    case GET_GROUP_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_GROUP_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case GET_GROUP_FAILURE:
      return _.assign(state, {
        readyStatus: GET_GROUP_FAILURE,
        isFetching: action.isFetching,
        data: null,
        err: action.err
      });
    default:
      return state;
  }
};
