/* @flow */

import _ from 'lodash/fp';

import {
  GET_USER_LIST_INVALID,
  GET_USER_LIST_REQUESTING,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_FAILURE
} from '../../constants/globalMembershipConstants/getUserList';
import type { Action } from '../../types';

const initialState = {
  readyStatus: GET_USER_LIST_INVALID,
  isFetching: false,
  data: [],
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_USER_LIST_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_USER_LIST_REQUESTING,
        isFetching: action.isFetching,
        data: [],
        err: null
      });
    case GET_USER_LIST_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_USER_LIST_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case GET_USER_LIST_FAILURE:
      return _.assign(state, {
        readyStatus: GET_USER_LIST_FAILURE,
        isFetching: action.isFetching,
        data: [],
        err: action.err
      });
    default:
      return state;
  }
};
