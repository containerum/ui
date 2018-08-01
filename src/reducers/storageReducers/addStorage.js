/* @flow */

import _ from 'lodash/fp';

import {
  ADD_STORAGE_INVALID,
  ADD_STORAGE_REQUESTING,
  ADD_STORAGE_SUCCESS,
  ADD_STORAGE_FAILURE
} from '../../constants/storageConstants/addStorage';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: ADD_STORAGE_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  name: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD_STORAGE_REQUESTING:
      return _.assign(state, {
        readyStatus: ADD_STORAGE_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        name: null,
        err: null
      });
    case ADD_STORAGE_SUCCESS:
      return _.assign(state, {
        readyStatus: ADD_STORAGE_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        name: action.name,
        err: null
      });
    case ADD_STORAGE_FAILURE:
      return _.assign(state, {
        readyStatus: ADD_STORAGE_FAILURE,
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
