/* @flow */

import _ from 'lodash/fp';

import {
  DELETE_STORAGE_INVALID,
  DELETE_STORAGE_REQUESTING,
  DELETE_STORAGE_SUCCESS,
  DELETE_STORAGE_FAILURE
} from '../../constants/storageConstants/deleteStorage';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: DELETE_STORAGE_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  name: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case DELETE_STORAGE_REQUESTING:
      return _.assign(state, {
        readyStatus: DELETE_STORAGE_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        name: null,
        err: null
      });
    case DELETE_STORAGE_SUCCESS:
      return _.assign(state, {
        readyStatus: DELETE_STORAGE_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        name: action.name,
        err: null
      });
    case DELETE_STORAGE_FAILURE:
      return _.assign(state, {
        readyStatus: DELETE_STORAGE_FAILURE,
        isFetching: action.isFetching,
        data: null,
        status: action.status,
        method: null,
        name: null,
        err: action.err
      });
    default:
      return state;
  }
};
