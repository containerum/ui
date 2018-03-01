/* @flow */

import _ from 'lodash/fp';

import {
  DELETE_ACCOUNT_INVALID,
  DELETE_ACCOUNT_REQUESTING,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE
} from '../../constants/profileConstants/deleteAccount';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: DELETE_ACCOUNT_INVALID,
  isFetching: false,
  data: null,
  status: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case DELETE_ACCOUNT_REQUESTING:
      return _.assign(state, {
        readyStatus: DELETE_ACCOUNT_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        err: null
      });
    case DELETE_ACCOUNT_SUCCESS:
      return _.assign(state, {
        readyStatus: DELETE_ACCOUNT_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        err: null
      });
    case DELETE_ACCOUNT_FAILURE:
      return _.assign(state, {
        readyStatus: DELETE_ACCOUNT_FAILURE,
        isFetching: action.isFetching,
        data: null,
        status: action.status,
        err: action.err
      });
    default:
      return state;
  }
};
